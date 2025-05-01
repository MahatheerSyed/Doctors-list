"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"

interface FiltersProps {
  onFilterChange: (filters: any) => void
  filters: {
    gender: string
    experience: string
    availability: string
    sortBy: string
    locality: string
  }
}

export default function DoctorFilters({ onFilterChange, filters }: FiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    experience: true,
    availability: true,
    locality: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const localities = [
    "Banjara Hills",
    "Jubilee Hills",
    "Hitech City",
    "Gachibowli",
    "Kukatpally",
    "Secunderabad",
    "Madhapur",
    "Ameerpet",
  ]

  // Check if any filters are active
  const hasActiveFilters =
    filters.gender !== "" || filters.experience !== "" || filters.availability !== "" || filters.locality !== ""

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onFilterChange({
                gender: "",
                experience: "",
                availability: "",
                sortBy: "relevance",
                locality: "",
              })
            }
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            <X className="w-3 h-3 mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Gender Filter */}
      <div className="mb-4 border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600"
          onClick={() => toggleSection("gender")}
        >
          <h3 className="font-medium">Gender</h3>
          {expandedSections.gender ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.gender && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value=""
                checked={filters.gender === ""}
                onChange={() => onFilterChange({ gender: "" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">All</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={filters.gender === "male"}
                onChange={() => onFilterChange({ gender: "male" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={filters.gender === "female"}
                onChange={() => onFilterChange({ gender: "female" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">Female</span>
            </label>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="mb-4 border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600"
          onClick={() => toggleSection("experience")}
        >
          <h3 className="font-medium">Experience</h3>
          {expandedSections.experience ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.experience && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value=""
                checked={filters.experience === ""}
                onChange={() => onFilterChange({ experience: "" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">All</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="0-5"
                checked={filters.experience === "0-5"}
                onChange={() => onFilterChange({ experience: "0-5" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">0-5 years</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="5-10"
                checked={filters.experience === "5-10"}
                onChange={() => onFilterChange({ experience: "5-10" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">5-10 years</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="10+"
                checked={filters.experience === "10+"}
                onChange={() => onFilterChange({ experience: "10+" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">10+ years</span>
            </label>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="mb-4 border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600"
          onClick={() => toggleSection("availability")}
        >
          <h3 className="font-medium">Availability</h3>
          {expandedSections.availability ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.availability && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value=""
                checked={filters.availability === ""}
                onChange={() => onFilterChange({ availability: "" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">Any time</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="today"
                checked={filters.availability === "today"}
                onChange={() => onFilterChange({ availability: "today" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">Today</span>
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Available</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="tomorrow"
                checked={filters.availability === "tomorrow"}
                onChange={() => onFilterChange({ availability: "tomorrow" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">Tomorrow</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="weekend"
                checked={filters.availability === "weekend"}
                onChange={() => onFilterChange({ availability: "weekend" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">This weekend</span>
            </label>
          </div>
        )}
      </div>

      {/* Locality Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600"
          onClick={() => toggleSection("locality")}
        >
          <h3 className="font-medium">Locality</h3>
          {expandedSections.locality ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.locality && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <label className="flex items-center">
              <input
                type="radio"
                name="locality"
                value=""
                checked={filters.locality === ""}
                onChange={() => onFilterChange({ locality: "" })}
                className="mr-2 accent-blue-600"
              />
              <span className="text-sm">All locations</span>
            </label>

            {localities.map((locality) => (
              <label key={locality} className="flex items-center">
                <input
                  type="radio"
                  name="locality"
                  value={locality}
                  checked={filters.locality === locality}
                  onChange={() => onFilterChange({ locality })}
                  className="mr-2 accent-blue-600"
                />
                <span className="text-sm">{locality}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply filters button - Mobile only */}
      <button
        onClick={() => document.body.dispatchEvent(new CustomEvent("closeFilters"))}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition md:hidden"
      >
        Apply Filters
      </button>
    </div>
  )
}
