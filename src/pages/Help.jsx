import React, { useState } from 'react'

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I create a new CV?',
      answer: 'Click the "Create New CV" button on the Dashboard or start from the Editor page. Choose a template and fill in your information.',
    },
    {
      question: 'Can I download my CV as a PDF?',
      answer: 'Yes! Once you have created or edited your CV, you can download it as a PDF from the Editor or Dashboard pages.',
    },
    {
      question: 'How many templates are available?',
      answer: 'We offer 4 professional templates: Modern, Classic, Creative, and Minimal. Each can be customized to match your style.',
    },
    {
      question: 'Can I save multiple CVs?',
      answer: 'Yes! You can create and save as many CVs as you need. Visit the Dashboard to manage all your saved CVs.',
    },
    {
      question: 'Is my data saved automatically?',
      answer: 'Your CV data is automatically saved as you type in the Editor. You can also manually save it to the server.',
    },
    {
      question: 'What sections can I include in my CV?',
      answer: 'Our CV builder supports: Personal Information, Professional Summary, Work Experience, Education, Skills, Languages, Projects, and Interests.',
    },
    {
      question: 'Can I change the template after starting?',
      answer: 'Yes! You can switch templates at any time in the Editor. Your data will be preserved when you change templates.',
    },
    {
      question: 'How do I export my CV as JSON?',
      answer: 'You can export your CV data as JSON from the Editor page, which allows you to backup or import your CV elsewhere.',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Help & FAQ</h1>
      <p className="text-gray-600 mb-8">Find answers to common questions about CV Builder</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition"
            >
              <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
              <span className={`text-2xl transition ${openIndex === index ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
        <p className="text-gray-700 mb-6">
          Can't find the answer you're looking for? Contact our support team:
        </p>
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:support@cvbuilder.com" className="text-blue-600 hover:underline">
              support@cvbuilder.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{' '}
            <a href="tel:+1234567890" className="text-blue-600 hover:underline">
              +1 (234) 567-890
            </a>
          </p>
          <p>
            <span className="font-semibold">Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </div>
  )
}
