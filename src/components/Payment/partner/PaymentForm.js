import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import './PaymentForm.css';
import { getUserInformationById } from 'Redux/actions/Demandes.Actions';
import { useDispatch } from 'react-redux';
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
};

export default function PaymentForm({ data}) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const factureId = id;


  const dispatch = useDispatch()
  const [userInformation, setuserInformation] = useState({})
      const [isloadBillingInformation, setisloadBillingInformation] = useState(false)
      const getUserInformation = () => {
        setisloadBillingInformation(true)
        dispatch(getUserInformationById(id))
        .then(data => {
          // Handle the successful response here
          console.log("data",data);
         setuserInformation(data
         )
         setisloadBillingInformation(false)

        })
        .catch(error => {
          // Handle the error here
          setisloadBillingInformation(false)
        });
      }
      useEffect(() => {
        getUserInformation()
      }, [])
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)
        });

        if (!error) {
          try {
            const { id } = paymentMethod;
            const data =  {
              referenceNumber: e.target.referenceNumber.value,
              freeComment: e.target.freeComment.value,
              partnerId: userInformation.user._id,
              missionId: userInformation._id,
              totalAmmount: totalTTC,
              id: id
            }
            console.log("data", data)
            const response = await axios.post(`https://convoyage.onrender.com/api/users/facture/PayerEnLignePartner`, data );

            if (response.data.success) {
              console.log("Successful payment");
              setSuccess(true);
            }
          } catch (error) {
            console.log("Error", error);
          }
        } else {
          console.log(error.message);
        }
        setIsLoading(false);
      };

  console.log(data, "id", id, "data", userInformation)
  const subtotal =userInformation.price; // Replace with actual subtotal calculation
  const taxRate = 0.20; // 20% tax rate for this example
  const totalTTC = subtotal / (1 + taxRate); // Calculate total including tax


  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          {/* Other Form Fields */}
          <FormGroup>
            <Label for="referenceNumber">Référence (pour votre comptabilité)</Label>
            <Input type="text" name="referenceNumber" id="referenceNumber" placeholder="Champs libre" />
          </FormGroup>

          {/* Free-form Comment Field */}
          <FormGroup>
            <Label for="freeComment">Commentaire ou instruction spécifique</Label>
            <Input type="textarea" name="freeComment" id="freeComment" placeholder="Instruction pour le transporteur" />
          </FormGroup>
          {/* <FormGroup>
            <Label for="email">Adresse e-mail</Label>
            <Input type="email" name="email" id="email" placeholder="E-mail" />
          </FormGroup> */}
          {/* ... Add other non-Stripe form fields here ... */}

          {/* Stripe Card Element */}
          <FormGroup>
            <Label for="card-element">Carte bancaire</Label>
            <CardElement id="card-element" options={CARD_OPTIONS} />
          </FormGroup>

          {/* Submit Button */}
          <Button type="submit" color="primary" block size="lg" disabled={!stripe || isLoading}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Payer"
            )}
          </Button>

          {/* Payment Summary */}
       {/* Payment Summary */}
{isloadBillingInformation ? (
  <div className="text-center">
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  </div>
) : (
  <div className="payment-summary">
    <p className="subtotal">Total: {Number(totalTTC)?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
    <p className="total-ttc">Total TTC (TVA France 20%): {subtotal?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
  </div>
)}

        </form>
      ) : (
        <div>
          <h2>Paiement réussi.</h2>
        </div>
      )}
    </>
  );
}
