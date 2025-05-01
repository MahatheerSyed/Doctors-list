import { MongoClient } from "mongodb"

// Sample doctor data
const doctors = [
  {
    name: "Dr. Arun Kumar",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 15,
    gender: "male",
    location: "Banjara Hills, Hyderabad",
    consultationFee: 800,
    rating: 4.8,
    reviewCount: 245,
    recommendationPercentage: 98,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Today",
      time: "10:30 AM",
    },
    availability: ["today", "tomorrow", "weekend"],
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, DNB (Family Medicine)",
    experience: 8,
    gender: "female",
    location: "Jubilee Hills, Hyderabad",
    consultationFee: 700,
    rating: 4.7,
    reviewCount: 178,
    recommendationPercentage: 95,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Today",
      time: "2:15 PM",
    },
    availability: ["today", "tomorrow"],
  },
  {
    name: "Dr. Rajesh Verma",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 12,
    gender: "male",
    location: "Hitech City, Hyderabad",
    consultationFee: 900,
    rating: 4.9,
    reviewCount: 320,
    recommendationPercentage: 99,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Tomorrow",
      time: "11:00 AM",
    },
    availability: ["tomorrow", "weekend"],
  },
  {
    name: "Dr. Sneha Reddy",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, DNB (Internal Medicine)",
    experience: 6,
    gender: "female",
    location: "Gachibowli, Hyderabad",
    consultationFee: 650,
    rating: 4.5,
    reviewCount: 120,
    recommendationPercentage: 92,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Today",
      time: "4:30 PM",
    },
    availability: ["today", "weekend"],
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), DM (Infectious Diseases)",
    experience: 18,
    gender: "male",
    location: "Kukatpally, Hyderabad",
    consultationFee: 1000,
    rating: 4.9,
    reviewCount: 410,
    recommendationPercentage: 98,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Tomorrow",
      time: "9:15 AM",
    },
    availability: ["tomorrow"],
  },
  {
    name: "Dr. Meera Patel",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 9,
    gender: "female",
    location: "Secunderabad, Hyderabad",
    consultationFee: 750,
    rating: 4.6,
    reviewCount: 185,
    recommendationPercentage: 94,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Today",
      time: "6:00 PM",
    },
    availability: ["today", "tomorrow", "weekend"],
  },
  {
    name: "Dr. Sanjay Gupta",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), FCCP",
    experience: 22,
    gender: "male",
    location: "Banjara Hills, Hyderabad",
    consultationFee: 1200,
    rating: 4.9,
    reviewCount: 520,
    recommendationPercentage: 99,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Tomorrow",
      time: "10:00 AM",
    },
    availability: ["tomorrow", "weekend"],
  },
  {
    name: "Dr. Ananya Desai",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, DNB (Family Medicine)",
    experience: 7,
    gender: "female",
    location: "Madhapur, Hyderabad",
    consultationFee: 700,
    rating: 4.7,
    reviewCount: 150,
    recommendationPercentage: 95,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Today",
      time: "3:45 PM",
    },
    availability: ["today"],
  },
  {
    name: "Dr. Karthik Rao",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 10,
    gender: "male",
    location: "Ameerpet, Hyderabad",
    consultationFee: 800,
    rating: 4.6,
    reviewCount: 210,
    recommendationPercentage: 93,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Tomorrow",
      time: "12:30 PM",
    },
    availability: ["tomorrow", "weekend"],
  },
  {
    name: "Dr. Lakshmi Narayanan",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 14,
    gender: "female",
    location: "Jubilee Hills, Hyderabad",
    consultationFee: 950,
    rating: 4.8,
    reviewCount: 280,
    recommendationPercentage: 97,
    image: "/placeholder.svg?height=128&width=128",
    nextAvailable: {
      date: "Today",
      time: "5:15 PM",
    },
    availability: ["today", "tomorrow"],
  },
]

async function seedDatabase() {
  // Connect to MongoDB
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
  const dbName = process.env.MONGODB_DB || "apollo-clone"

  console.log("Connecting to MongoDB...")
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)
    const collection = db.collection("doctors")

    // Check if collection already has data
    const count = await collection.countDocuments()
    if (count > 0) {
      console.log(`Database already has ${count} doctors. Skipping seed.`)
      return
    }

    // Insert sample data
    console.log("Inserting sample doctor data...")
    const result = await collection.insertMany(doctors)

    console.log(`${result.insertedCount} doctors successfully added to the database`)
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

// Run the seed function
seedDatabase()
  .then(() => console.log("Seed completed"))
  .catch((error) => console.error("Seed failed:", error))
