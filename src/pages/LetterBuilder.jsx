import React, { useState } from 'react'

export default function LetterBuilder() {
  const [letterData, setLetterData] = useState({
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    yourLocation: '',
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    companyAddress: '',
    letterDate: new Date().toISOString().split('T')[0],
    jobPosition: '',
    motivation: '',
    skills: '',
    experience: '',
    closure: '',
  })

  const [letterPreview, setLetterPreview] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLetterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExportPDF = () => {
    window.print()
  }

  const handleDownloadText = () => {
    const text = generateLetterText()
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'cover_letter.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generateLetterText = () => {
    return `${letterData.yourName}
${letterData.yourEmail}
${letterData.yourPhone}
${letterData.yourLocation}

${letterData.letterDate}

${letterData.recipientName}
${letterData.recipientTitle}
${letterData.companyName}
${letterData.companyAddress}

Dear ${letterData.recipientName},

I am writing to express my strong interest in the ${letterData.jobPosition} position at ${letterData.companyName}.

${letterData.motivation}

With my background in ${letterData.experience} and skills in ${letterData.skills}, I am confident that I can make a significant contribution to your team.

${letterData.closure}

Sincerely,

${letterData.yourName}`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Cover Letter Builder</h1>
      <p className="text-gray-600 mb-8">Create a professional cover letter to complement your CV</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Your Information</h2>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  name="yourName"
                  value={letterData.yourName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="yourEmail"
                  value={letterData.yourEmail}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input
                  type="tel"
                  name="yourPhone"
                  value={letterData.yourPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Location</label>
                <input
                  type="text"
                  name="yourLocation"
                  value={letterData.yourLocation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6">Recipient Information</h2>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Recipient Name</label>
                <input
                  type="text"
                  name="recipientName"
                  value={letterData.recipientName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="recipientTitle"
                  value={letterData.recipientTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={letterData.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={letterData.companyAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Job Position</label>
              <input
                type="text"
                name="jobPosition"
                value={letterData.jobPosition}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6">Letter Content</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Why are you interested?</label>
              <textarea
                name="motivation"
                value={letterData.motivation}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Explain your motivation and interest in the position..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Relevant Experience</label>
              <textarea
                name="experience"
                value={letterData.experience}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Highlight your relevant experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Key Skills</label>
              <textarea
                name="skills"
                value={letterData.skills}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="List your key skills..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Closing Statement</label>
              <textarea
                name="closure"
                value={letterData.closure}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Final statement (e.g., 'I look forward to discussing...')"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setLetterPreview(!letterPreview)}
              className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 font-semibold transition"
            >
              {letterPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleExportPDF}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold transition"
            >
              Export PDF
            </button>
            <button
              onClick={handleDownloadText}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
            >
              Download Text
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-bold mb-6">Letter Preview</h2>
          <div className="prose max-w-none text-sm space-y-3 whitespace-pre-wrap">
            <div>{letterData.yourName}</div>
            <div>{letterData.yourEmail}</div>
            <div>{letterData.yourPhone}</div>
            <div>{letterData.yourLocation}</div>

            <div className="border-b-2 border-gray-300 pb-3 my-4" />

            <div>{letterData.letterDate}</div>

            <div>
              <div>{letterData.recipientName}</div>
              <div>{letterData.recipientTitle}</div>
              <div>{letterData.companyName}</div>
              <div>{letterData.companyAddress}</div>
            </div>

            <div className="pt-4">
              <div>Dear {letterData.recipientName || '[Recipient Name]'},</div>

              <div className="mt-4">
                I am writing to express my strong interest in the {letterData.jobPosition || '[Position]'} position at{' '}
                {letterData.companyName || '[Company Name]'}.
              </div>

              <div className="mt-4">{letterData.motivation || '[Your motivation statement]'}</div>

              <div className="mt-4">
                With my background in {letterData.experience || '[your experience]'} and skills in {letterData.skills || '[your skills]'}, I am confident that I can make a significant
                contribution to your team.
              </div>

              <div className="mt-4">{letterData.closure || '[Your closing statement]'}</div>

              <div className="mt-6">
                <div>Sincerely,</div>
                <div className="mt-6">{letterData.yourName || '[Your Name]'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
