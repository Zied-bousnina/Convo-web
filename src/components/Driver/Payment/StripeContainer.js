import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'

const stripeTestPromise = loadStripe(
    `${process.env.STRIPE_PUBLISHABLE_KEY}`
)

function StripeContainer() {
  return (
    <Elements
        stripe={stripeTestPromise}

    >
    <PaymentForm/>

    </Elements>
  )
}

export default StripeContainer