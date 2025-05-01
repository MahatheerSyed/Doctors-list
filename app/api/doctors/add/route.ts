import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const doctorData = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "specialization",
      "qualification",
      "experience",
      "gender",
      "location",
      "consultationFee",
    ]

    for (const field of requiredFields) {
      if (!doctorData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Add default values if not provided
    if (!doctorData.rating) doctorData.rating = 0
    if (!doctorData.reviewCount) doctorData.reviewCount = 0
    if (!doctorData.recommendationPercentage) doctorData.recommendationPercentage = 0
    if (!doctorData.nextAvailable) {
      doctorData.nextAvailable = {
        date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        time: "10:00 AM",
      }
    }
    if (!doctorData.availability) doctorData.availability = ["today", "tomorrow", "weekend"]

    // Insert doctor into database
    const result = await db.collection("doctors").insertOne(doctorData)

    return NextResponse.json(
      {
        success: true,
        doctorId: result.insertedId,
        message: "Doctor added successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding doctor:", error)
    return NextResponse.json({ error: "Failed to add doctor" }, { status: 500 })
  }
}
