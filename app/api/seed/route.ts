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
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    nextAvailable: {
      date: "Today",
      time: "6:00 PM",
    },
    availability: ["today", "tomorrow", "weekend"],
    languages: ["English", "Hindi", "Gujarati"],
    about:
      "Dr. Meera Patel is known for her holistic approach to healthcare. She specializes in managing chronic diseases and believes in the importance of lifestyle modifications in treatment.",
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
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    nextAvailable: {
      date: "Tomorrow",
      time: "10:00 AM",
    },
    availability: ["tomorrow", "weekend"],
    languages: ["English", "Hindi"],
    about:
      "Dr. Sanjay Gupta is a senior consultant with over two decades of experience in Internal Medicine. He is a Fellow of the College of Chest Physicians and specializes in respiratory disorders.",
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
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    nextAvailable: {
      date: "Today",
      time: "3:45 PM",
    },
    availability: ["today"],
    languages: ["English", "Hindi", "Marathi"],
    about:
      "Dr. Ananya Desai focuses on family medicine and preventive healthcare. She is particularly interested in geriatric care and managing lifestyle diseases.",
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
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    nextAvailable: {
      date: "Tomorrow",
      time: "12:30 PM",
    },
    availability: ["tomorrow", "weekend"],
    languages: ["English", "Telugu", "Kannada"],
    about:
      "Dr. Karthik Rao is a General Medicine specialist with expertise in managing diabetes, hypertension, and other chronic conditions. He emphasizes on evidence-based medicine in his practice.",
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
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    nextAvailable: {
      date: "Today",
      time: "5:15 PM",
    },
    availability: ["today", "tomorrow"],
    languages: ["English", "Tamil", "Telugu"],
    about:
      "Dr. Lakshmi Narayanan is an experienced Internal Medicine specialist with a focus on women's health and hormonal disorders. She is known for her compassionate approach to patient care.",
  },
]

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()
    const collection = db.collection("doctors")

    // Check if collection already has data
    const count = await collection.countDocuments()

    // Force parameter to reseed the database
    const forceReseed = true

    if (count > 0 && !forceReseed) {
      return NextResponse.json({
        message: `Database already has ${count} doctors. Skipping seed.`,
        success: false,
        count,
      })
    }

    // If force reseed is true and there's existing data, drop the collection first
    if (count > 0 && forceReseed) {
      await collection.deleteMany({})
      console.log("Existing doctor data cleared for reseeding")
    }

    // Insert sample data
    const result = await collection.insertMany(doctors)

    return NextResponse.json({
      message: `${result.insertedCount} doctors successfully added to the database`,
      success: true,
      count: result.insertedCount,
    })
  } catch (error: any) {
    console.error("Error seeding database:", error)

    // Return a success response with mock data information
    return NextResponse.json({
      message: "Failed to seed database, but mock data is available in the application",
      error: error.message || "Unknown error occurred",
      success: false,
      mockDataAvailable: true,
    })
  }
}
