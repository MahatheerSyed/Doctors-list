import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()

    // Get collection names
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    // Get count of doctors
    const doctorCount = await db.collection("doctors").countDocuments()

    // Get a sample doctor
    const sampleDoctor = await db.collection("doctors").findOne()

    return NextResponse.json({
      success: true,
      database: process.env.MONGODB_DB,
      collections: collectionNames,
      doctorCount,
      sampleDoctor,
    })
  } catch (error: any) {
    console.error("Debug API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
