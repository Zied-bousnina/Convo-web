import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#000000" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const { id } = useParams();
   const factureId = id
   const [isLOad, setisLOad] = useState(false)

    const handleSubmit = async (e) => {
        // console.log("hello", factureId)
        setisLOad(true)
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

// console.log("gggg",error)
    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/facture/PayerEnligneDriver/${factureId}`, {

                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
                setisLOad(false)
            }

        } catch (error) {
            console.log("Error", error)
            setisLOad(false)

        }
    } else {
        console.log(error.message)
        setisLOad(false)
    }
}

    return (
        <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <Button className="
                btn btn-primary btn-block btn-lg shadow-lg mt-5
            " color="default" type="submit"
            disabled={!stripe || isLOad}

                >
                  {isLOad ? (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden"></span>
    </div>
  )
                  :
                  "Payer"
                  }

                </Button>
        </form>
        :

       <div>
           <h2>Paiement réussi.</h2>
       </div>
        }

        </>
    )
}