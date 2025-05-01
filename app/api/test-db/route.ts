import { NextResponse } from "next/server"
import { testConnection } from "@/lib/mongodb"

export async function GET() {
  try {
    const result = await testConnection()

    if (result.success) {
      return NextResponse.json({
        message: result.message,
        success: true,
      })
    } else {
      return NextResponse.json(
        {
          message: result.message,
          error: result.error,
          success: false,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to test database connection",
        error: error.message || "Unknown error occurred",
        success: false,
      },
      { status: 500 },
    )
  }
}
