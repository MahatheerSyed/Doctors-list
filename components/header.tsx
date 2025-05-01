import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Phone, ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-1" />
            <span>24/7 Support: 1800-123-4567</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link href="#" className="hover:underline">
              Download App
            </Link>
            <Link href="#" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <span className="text-blue-600 font-bold text-xl">Apollo247</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="group relative">
              <Link href="#" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                Doctors
                <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-4 w-48 mt-1">
                <Link href="#" className="block py-2 text-gray-700 hover:text-blue-600">
                  Find a Doctor
                </Link>
                <Link href="#" className="block py-2 text-gray-700 hover:text-blue-600">
                  Book Appointment
                </Link>
                <Link href="#" className="block py-2 text-gray-700 hover:text-blue-600">
                  Video Consultation
                </Link>
              </div>
            </div>
            <div className="group relative">
              <Link href="#" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                Pharmacy
                <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-4 w-48 mt-1">
                <Link href="#" className="block py-2 text-gray-700 hover:text-blue-600">
                  Order Medicines
                </Link>
                <Link href="#" className="block py-2 text-gray-700 hover:text-blue-600">
                  Healthcare Products
                </Link>
              </div>
            </div>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Lab Tests
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Health Records
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search doctors, medicines..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="p-2 text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hidden md:flex items-center space-x-1 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Login / Signup</span>
            </button>
            <button className="md:hidden p-2 text-gray-700">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
