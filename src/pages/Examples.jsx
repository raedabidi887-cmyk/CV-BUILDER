import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import exampleCvs from '../data/exampleCvs.json'
import useCVStore from '../store/useCVStore'

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState(null)
  const { loadCV } = useCVStore()

  const handleLoadExample = (example) => {
    loadCV(example)
    setSelectedExample(example.id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Example CVs</h1>
      <p className="text-gray-600 mb-8">Browse real-world examples of CVs built with CV Builder</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {exampleCvs.map((example) => (
          <div
            key={example.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 h-64 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold">{example.personalInfo.fullName}</h3>
                <p className="text-blue-600 font-semibold">{example.personalInfo.title}</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>📧 {example.personalInfo.email}</p>
                <p>📱 {example.personalInfo.phone}</p>
                <p>📍 {example.personalInfo.location}</p>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 line-clamp-3">{example.summary}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-700">Experience</p>
                  <p className="text-gray-600">{example.experiences.length} positions</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Education</p>
                  <p className="text-gray-600">{example.education.length} entries</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Skills</p>
                  <p className="text-gray-600">{example.skills.length} skills</p>
                </div>
              </div>

              <Link
                to="/editor"
                onClick={() => handleLoadExample(example)}
                className="w-full block mt-4 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
              >
                Use This Example
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Learn from Examples</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-3">✓</span>
            <span>See how professional CVs are structured and formatted</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-3">✓</span>
            <span>Get ideas for what information to include in each section</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-3">✓</span>
            <span>Understand best practices for CV writing</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 font-bold mr-3">✓</span>
            <span>Customize any example to create your own CV</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
