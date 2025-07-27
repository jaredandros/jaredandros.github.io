// CheckoutForm.jsx
import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (error) {
      console.error('[Stripe Error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      // 👉 Send this to your backend for charge/session creation
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Pay Now
      </button>
    </form>
  )
}

export default CheckoutForm
