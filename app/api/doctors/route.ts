import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const gender = searchParams.get("gender")
    const experience = searchParams.get("experience")
    const availability = searchParams.get("availability")
    const sortBy = searchParams.get("sortBy") || "relevance"
    const locality = searchParams.get("locality")
    const searchTerm = searchParams.get("search")

    // Build query - start with an empty query to match all documents
    const query: any = {}

    // Add search functionality
    if (searchTerm && searchTerm.trim() !== "") {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { qualification: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ]
    }

    if (gender && gender !== "") {
      query.gender = gender
    }

    if (experience && experience !== "") {
      if (experience === "0-5") {
        query.experience = { $lte: 5 }
      } else if (experience === "5-10") {
        query.experience = { $gt: 5, $lte: 10 }
      } else if (experience === "10+") {
        query.experience = { $gt: 10 }
      }
    }

    if (availability && availability !== "") {
      query.availability = availability
    }

    if (locality && locality !== "") {
      query.location = { $regex: locality, $options: "i" }
    }

    // Build sort
    const sort: any = {}
    if (sortBy === "experience") {
      sort.experience = -1
    } else if (sortBy === "rating") {
      sort.rating = -1
    } else if (sortBy === "fee_low") {
      sort.consultationFee = 1
    } else if (sortBy === "fee_high") {
      sort.consultationFee = -1
    } else {
      // Default relevance sorting
      sort.rating = -1
      sort.experience = -1
    }

    console.log("Query:", JSON.stringify(query)) // Debug log

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count for pagination
    const totalDoctors = await db.collection("doctors").countDocuments(query)
    console.log("Total doctors found:", totalDoctors) // Debug log

    // Get doctors
    const doctors = await db.collection("doctors").find(query).sort(sort).skip(skip).limit(limit).toArray()
    console.log("Doctors returned:", doctors.length) // Debug log

    return NextResponse.json({
      doctors,
      currentPage: page,
      totalPages: Math.ceil(totalDoctors / limit) || 1,
      totalDoctors,
      success: true,
    })
  } catch (error: any) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch doctors",
        message: error.message || "Unknown error occurred",
        success: false,
        mockData: true,
        doctors: getMockDoctors(), // Provide mock data when database fails
        currentPage: 1,
        totalPages: 1,
        totalDoctors: 10,
      },
      { status: 200 }, // Return 200 with mock data instead of 500
    )
  }
}

// Mock data function to provide fallback data when database is not available
function getMockDoctors() {
  return [
    {
      _id: "mock1",
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
      _id: "mock2",
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
    // Other mock doctors...
  ]
}
