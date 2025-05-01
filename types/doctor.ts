export interface Doctor {
  _id: string
  name: string
  specialization: string
  qualification: string
  experience: number
  gender: "male" | "female"
  location: string
  consultationFee: number
  rating: number
  reviewCount: number
  recommendationPercentage: number
  image?: string
  nextAvailable: {
    date: string
    time: string
  }
  availability: string[]
  languages?: string[]
  about?: string
}
