import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
        <Link to="/" className="font-bold text-2xl text-blue-600">
          CV Builder
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/templates" className="text-gray-700 hover:text-blue-600 transition">
            Templates
          </Link>
          <Link to="/examples" className="text-gray-700 hover:text-blue-600 transition">
            Examples
          </Link>
          <Link to="/letter" className="text-gray-700 hover:text-blue-600 transition">
            Cover Letter
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition">
            Pricing
          </Link>
          <Link to="/help" className="text-gray-700 hover:text-blue-600 transition">
            Help
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link to="/editor" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
            Create CV
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 text-xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-gray-50 p-4 space-y-2">
          <Link to="/templates" className="block text-gray-700 py-2 hover:text-blue-600">
            Templates
          </Link>
          <Link to="/examples" className="block text-gray-700 py-2 hover:text-blue-600">
            Examples
          </Link>
          <Link to="/letter" className="block text-gray-700 py-2 hover:text-blue-600">
            Cover Letter
          </Link>
          <Link to="/pricing" className="block text-gray-700 py-2 hover:text-blue-600">
            Pricing
          </Link>
          <Link to="/help" className="block text-gray-700 py-2 hover:text-blue-600">
            Help
          </Link>
          <Link to="/dashboard" className="block text-gray-700 py-2 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/editor" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold text-center">
            Create CV
          </Link>
        </div>
      )}
    </header>
  )
}
