// CheckoutPage.jsx
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

// Load your publishable Stripe key (test or live)
const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY)

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-baby-blue-600 mb-6 text-center">Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}

export default CheckoutPage
