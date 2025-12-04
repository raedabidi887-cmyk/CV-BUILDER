import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useCVStore from '../store/useCVStore'

export default function Dashboard() {
  const [cvs, setCvs] = useState([])
  const [loading, setLoading] = useState(true)
  const { loadCV } = useCVStore()

  useEffect(() => {
    // Fetch CVs from backend
    fetch('http://localhost:8000/api/cvs')
      .then((r) => r.json())
      .then((data) => {
        setCvs(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load CVs:', err)
        setLoading(false)
      })
  }, [])

  const handleDeleteCV = async (id) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      try {
        await fetch(`http://localhost:8000/api/cv/${id}`, {
          method: 'DELETE',
        })
        setCvs(cvs.filter((cv) => cv.id !== id))
      } catch (error) {
        console.error('Failed to delete CV:', error)
      }
    }
  }

  const handleLoadCV = (cv) => {
    loadCV(cv)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My CVs</h1>
          <p className="text-gray-600 mt-1">Manage and edit your saved CVs</p>
        </div>
        <Link
          to="/editor"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          + Create New CV
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading your CVs...</p>
        </div>
      ) : cvs.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <h2 className="text-xl font-semibold mb-2">No CVs yet</h2>
          <p className="text-gray-600 mb-6">Start creating your first CV to get started</p>
          <Link
            to="/editor"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Create Your First CV
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition bg-white"
            >
              <h3 className="text-lg font-bold mb-2">{cv.title || 'Untitled CV'}</h3>
              <p className="text-gray-600 text-sm mb-4">
                Updated: {new Date(cv.updated_at || cv.created_at).toLocaleDateString()}
              </p>

              <div className="flex gap-3">
                <Link
                  to="/editor"
                  onClick={() => handleLoadCV(cv)}
                  className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
                >
                  Edit
                </Link>
                <a
                  href={`http://localhost:8000/api/cv/${cv.id}/pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold transition"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => handleDeleteCV(cv.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
