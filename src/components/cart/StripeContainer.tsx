import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51OCpwXKSKB1YkBfrQgmz1RFtuuwHKjFDulGBNuZbebQ5aVVJjzMiqlGlIxx5bQmmsnb2VtbPBRHJX6OdUt9bsSeM00zQihE86U"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}