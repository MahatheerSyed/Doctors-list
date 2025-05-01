import { MongoClient } from "mongodb"

// Get environment variables with fallbacks for development
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/apollo-clone"
const MONGODB_DB = process.env.MONGODB_DB || "apollo-clone"

// Connection options
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

// Global variables to cache the connection
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    // Check if environment variables are available
    if (!MONGODB_URI) {
      console.error("MONGODB_URI is not defined. Using fallback connection string.")
    }

    if (!MONGODB_DB) {
      console.error("MONGODB_DB is not defined. Using fallback database name.")
    }

    // Create a new MongoClient
    const client = new MongoClient(MONGODB_URI, options)

    // Connect to the MongoDB server
    await client.connect()
    console.log("Connected to MongoDB successfully")

    // Get the database
    const db = client.db(MONGODB_DB)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Could not connect to database. Please check your MongoDB connection.")
  }
}

// Function to test the database connection
export async function testConnection() {
  try {
    const { client, db } = await connectToDatabase()
    // Ping the database
    await db.command({ ping: 1 })
    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return {
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
