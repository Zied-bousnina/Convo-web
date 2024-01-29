import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'

const apiKey = `pk_test_51OdwexAFbclQdyveAdsJIQfP5zVc2EzTvA7r682Jd4PCio1sBuxWAd6pNBG11ODCeodAiwNxdrMOoQhINWmOljfD005S4ERcg0`;
const stripeTestPromise = loadStripe(
  apiKey
)
console.log("stripeTestPromise",stripeTestPromise, apiKey)
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