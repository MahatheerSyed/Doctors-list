"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, ThumbsUp, MapPin, Calendar, Clock, Search, AlertCircle, Filter, Info } from "lucide-react"
import DoctorFilters from "./doctor-filters"
import type { Doctor } from "@/types/doctor"

export default function DoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMockData, setIsMockData] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    availability: "",
    sortBy: "relevance",
    locality: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchDoctors()
  }, [page, filters])

  const fetchDoctors = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      })

      // Only add non-empty filters to the query
      if (filters.gender) queryParams.append("gender", filters.gender)
      if (filters.experience) queryParams.append("experience", filters.experience)
      if (filters.availability) queryParams.append("availability", filters.availability)
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy)
      if (filters.locality) queryParams.append("locality", filters.locality)
      if (searchTerm) queryParams.append("search", searchTerm)

      console.log("Fetching doctors with params:", queryParams.toString())

      const response = await fetch(`/api/doctors?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log("API response:", data)

      if (!data.success && !data.mockData) {
        throw new Error(data.message || "Failed to fetch doctors")
      }

      setDoctors(data.doctors || [])
      setTotalPages(data.totalPages || 1)
      setTotalDoctors(data.totalDoctors || 0)
      setIsMockData(data.mockData || false)
    } catch (error: any) {
      console.error("Error fetching doctors:", error)
      setError(error.message || "Failed to fetch doctors. Please try again later.")
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
    setPage(1) // Reset to first page when filters change
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page when searching
    fetchDoctors()
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isMockData && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-6 flex items-start">
          <Info className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Using demo data</p>
            <p className="text-sm">
              The application is currently using demo data as the database connection could not be established. This is
              a preview mode with limited functionality.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-20">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Find Doctors</h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </form>
            </div>

            <DoctorFilters onFilterChange={handleFilterChange} filters={filters} />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm text-gray-500 mb-4">
              <ol className="flex items-center space-x-1">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li>
                  <span className="mx-1">/</span>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Specialties
                  </a>
                </li>
                <li>
                  <span className="mx-1">/</span>
                </li>
                <li className="text-blue-600 font-medium">General Physician & Internal Medicine</li>
              </ol>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">General Physician & Internal Medicine</h1>
            <p className="text-gray-600">Find and book appointment with top General Physicians in your area</p>
          </div>

          {/* Search bar - Mobile & Tablet */}
          <div className="lg:hidden mb-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by doctor name, qualification, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex-shrink-0"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={toggleFilters}
                  className="lg:hidden bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  Filters
                </button>
              </div>
            </form>
          </div>

          {/* Filters - Mobile & Tablet (collapsible) */}
          {showFilters && (
            <div className="lg:hidden mb-6">
              <DoctorFilters onFilterChange={handleFilterChange} filters={filters} />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error loading doctors</p>
                <p className="text-sm">{error}</p>
                <button onClick={fetchDoctors} className="text-sm text-blue-600 hover:underline mt-1">
                  Try again
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-700 mb-2 sm:mb-0">{loading ? "Loading..." : `${totalDoctors} doctors found`}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  className="text-sm border rounded-md p-1.5"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                >
                  <option value="relevance">Relevance</option>
                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                  <option value="fee_low">Fee: Low to High</option>
                  <option value="fee_high">Fee: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {doctors && doctors.length > 0 ? (
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row">
                          {/* Doctor image and basic info */}
                          <div className="md:w-1/4 flex flex-col items-center mb-4 md:mb-0">
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-gray-100">
                              <Image
                                src={doctor.image || "/placeholder.svg?height=128&width=128"}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex items-center text-sm bg-yellow-50 px-2 py-1 rounded-full">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="font-medium">{doctor.rating}</span>
                              <span className="text-gray-500 ml-1">({doctor.reviewCount})</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <ThumbsUp className="w-4 h-4 mr-1 text-green-600" />
                              <span>{doctor.recommendationPercentage}% recommend</span>
                            </div>
                          </div>

                          {/* Doctor details */}
                          <div className="md:w-2/4 md:pl-4">
                            <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                            <p className="text-blue-600 mb-2">{doctor.specialization}</p>
                            <p className="text-sm text-gray-500 mb-1">{doctor.qualification}</p>
                            <p className="text-sm text-gray-700 mb-2">
                              <span className="font-medium">{doctor.experience} years</span> experience overall
                            </p>

                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                              <span>{doctor.location}</span>
                            </div>

                            {doctor.languages && (
                              <div className="mb-2">
                                <span className="text-sm text-gray-500">Speaks: </span>
                                <span className="text-sm text-gray-700">{doctor.languages.join(", ")}</span>
                              </div>
                            )}

                            <div className="text-sm">
                              <span className="text-blue-600 font-medium">₹{doctor.consultationFee}</span>
                              <span className="text-gray-500"> consultation fee</span>
                            </div>
                          </div>

                          {/* Appointment booking */}
                          <div className="md:w-1/4 mt-4 md:mt-0">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <p className="text-sm font-medium text-gray-700 mb-2">Next Available</p>
                              <div className="flex items-center mb-2">
                                <Calendar className="w-4 h-4 text-blue-600 mr-1" />
                                <span className="text-sm">{doctor.nextAvailable.date}</span>
                              </div>
                              <div className="flex items-center mb-3">
                                <Clock className="w-4 h-4 text-blue-600 mr-1" />
                                <span className="text-sm">{doctor.nextAvailable.time}</span>
                              </div>
                              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                                Book Appointment
                              </button>
                              <button className="w-full mt-2 border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition">
                                Video Consult
                              </button>
                            </div>
                          </div>
                        </div>

                        {doctor.about && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">{doctor.about}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                      <nav className="flex items-center space-x-1">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-3 py-1 rounded-md border text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                          Previous
                        </button>
                        {totalPages <= 7 ? (
                          // Show all pages if 7 or fewer
                          [...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPage(i + 1)}
                              className={`px-3 py-1 rounded-md text-sm ${
                                page === i + 1 ? "bg-blue-600 text-white" : "border hover:bg-gray-50"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))
                        ) : (
                          // Show limited pages with ellipsis for many pages
                          <>
                            <button
                              onClick={() => setPage(1)}
                              className={`px-3 py-1 rounded-md text-sm ${
                                page === 1 ? "bg-blue-600 text-white" : "border hover:bg-gray-50"
                              }`}
                            >
                              1
                            </button>

                            {page > 3 && <span className="px-2">...</span>}

                            {page > 2 && (
                              <button
                                onClick={() => setPage(page - 1)}
                                className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50"
                              >
                                {page - 1}
                              </button>
                            )}

                            {page !== 1 && page !== totalPages && (
                              <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">{page}</button>
                            )}

                            {page < totalPages - 1 && (
                              <button
                                onClick={() => setPage(page + 1)}
                                className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50"
                              >
                                {page + 1}
                              </button>
                            )}

                            {page < totalPages - 2 && <span className="px-2">...</span>}

                            <button
                              onClick={() => setPage(totalPages)}
                              className={`px-3 py-1 rounded-md text-sm ${
                                page === totalPages ? "bg-blue-600 text-white" : "border hover:bg-gray-50"
                              }`}
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="px-3 py-1 rounded-md border text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">No doctors found matching your criteria.</p>
                    <button
                      onClick={() => {
                        setFilters({
                          gender: "",
                          experience: "",
                          availability: "",
                          sortBy: "relevance",
                          locality: "",
                        })
                        setSearchTerm("")
                        fetchDoctors()
                      }}
                      className="mt-4 text-blue-600 hover:underline"
                    >
                      Clear all filters and try again
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
