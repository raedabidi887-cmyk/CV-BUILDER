import React from 'react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'Forever free',
      description: 'Perfect for getting started',
      features: [
        'Create 1 CV',
        '4 Professional templates',
        'Basic sections only',
        'Export to PDF',
        'Download as JSON',
      ],
      cta: 'Start Free',
      ctaLink: '/editor',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$4.99',
      period: 'per month',
      description: 'Best for job seekers',
      features: [
        'Unlimited CVs',
        '10+ Professional templates',
        'All CV sections',
        'Export to PDF & Word',
        'AI-powered suggestions',
        'Priority support',
        'Custom domains',
      ],
      cta: 'Get Pro',
      ctaLink: '/editor',
      highlighted: true,
    },
    {
      name: 'Teams',
      price: '$29.99',
      period: 'per month',
      description: 'For organizations',
      features: [
        'Unlimited team members',
        'Unlimited CVs',
        'All Pro features',
        'Team management',
        'Analytics & insights',
        'Custom branding',
        'Dedicated support',
      ],
      cta: 'Contact Sales',
      ctaLink: 'mailto:sales@cvbuilder.com',
      highlighted: false,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden transition transform hover:scale-105 ${
              plan.highlighted
                ? 'border-2 border-blue-600 shadow-xl relative'
                : 'border border-gray-200 shadow-lg'
            }`}
          >
            {plan.highlighted && (
              <div className="bg-blue-600 text-white py-2 text-center font-semibold">
                Most Popular
              </div>
            )}
            <div className={`p-8 ${plan.highlighted ? 'bg-blue-50' : 'bg-white'}`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-2">/ {plan.period}</span>
              </div>

              <a
                href={plan.ctaLink}
                className={`w-full block text-center py-3 rounded-lg font-semibold transition mb-8 ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
            <p className="text-gray-600">Yes! Cancel your subscription anytime. No questions asked, no penalties.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
            <p className="text-gray-600">We offer 30-day money-back guarantee on all paid plans.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Can I upgrade/downgrade?</h4>
            <p className="text-gray-600">Absolutely. Change your plan at any time and we'll prorate the difference.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers.</p>
          </div>
        </div>
      </div>

      <div className="text-center bg-blue-600 text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6">Create your first CV for free. No credit card required.</p>
        <Link
          to="/editor"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Start Building Your CV
        </Link>
      </div>
    </div>
  )
}
