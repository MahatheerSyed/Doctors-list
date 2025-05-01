import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

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
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    nextAvailable: {
      date: "Today",
      time: "10:30 AM",
    },
    availability: ["today", "tomorrow", "weekend"],
    languages: ["English", "Hindi", "Telugu"],
    about:
      "Dr. Arun Kumar is a highly experienced Internal Medicine specialist with over 15 years of practice. He specializes in treating complex medical conditions and provides comprehensive care for adults.",
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
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    nextAvailable: {
      date: "Today",
      time: "2:15 PM",
    },
    availability: ["today", "tomorrow"],
    languages: ["English", "Hindi"],
    about:
      "Dr. Priya Sharma is a dedicated Family Medicine practitioner who focuses on preventive care and managing chronic conditions. She is known for her patient-centered approach.",
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
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    nextAvailable: {
      date: "Tomorrow",
      time: "11:00 AM",
    },
    availability: ["tomorrow", "weekend"],
    languages: ["English", "Hindi", "Telugu", "Marathi"],
    about:
      "Dr. Rajesh Verma is a renowned General Medicine specialist with expertise in managing complex medical cases. He has received multiple awards for his contributions to healthcare.",
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
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    nextAvailable: {
      date: "Today",
      time: "4:30 PM",
    },
    availability: ["today", "weekend"],
    languages: ["English", "Telugu", "Tamil"],
    about:
      "Dr. Sneha Reddy specializes in Internal Medicine with a focus on women's health issues. She is passionate about patient education and preventive healthcare.",
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
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    nextAvailable: {
      date: "Tomorrow",
      time: "9:15 AM",
    },
    availability: ["tomorrow"],
    languages: ["English", "Hindi", "Punjabi"],
    about:
      "Dr. Vikram Singh is a specialist in Infectious Diseases with extensive experience in treating complex infections. He has been at the forefront of managing epidemics and emerging infectious diseases.",
  },
]

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()
    const collection = db.collection("doctors")

    // Clear existing data
    await collection.deleteMany({})
    console.log("Existing doctor data cleared for reseeding")

    // Insert sample data
    const result = await collection.insertMany(doctors)

    return NextResponse.json({
      message: `${result.insertedCount} doctors successfully added to the database`,
      success: true,
      count: result.insertedCount,
    })
  } catch (error: any) {
    console.error("Error force seeding database:", error)
    return NextResponse.json(
      {
        error: "Failed to force seed database",
        message: error.message || "Unknown error occurred",
        success: false,
      },
      { status: 500 },
    )
  }
}
