import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useContext } from "react";
import { CardBody, Card, Button, Row, Col, Spinner, CardHeader } from "reactstrap";
import { API } from "../../api/product";
import { StateContext } from "../../App";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const state = useContext(StateContext);
  const [loading, setLoading]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await API.post("products/payment", {
          amount: state.total * 100,
          id,
        });

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
    setLoading(false);
  };

  return (
    <>
        <Card style={{ width: "40vw" }} className="p-4">
          {!success ? (
          <CardBody>
            <Row className="m-3">
              <h1>Check out</h1>
            </Row>
            <Row className="m-3">
              <p>Please enter your card details</p>
              <CardElement options={CARD_OPTIONS} className="border p-3" />
            </Row>
            <Row className="m-3">
              <Col>
                <p>
                  <b>Total: {state.total}.00 EUR</b>
                </p>
              </Col>
              <Col class="col-auto" lg="3">
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  style={{ width: "150px" }}
                >
                  {!loading ? 'Finish Payment' : 'In Progress'}
                  {loading && <Spinner
                    style={{ width: "1rem", height: "1rem" }}
                    type="border"
                    color="light"
                  />}
                </Button>
              </Col>
            </Row>
            </CardBody>)
            :
            (
              <>
              <CardHeader>
              <h2>Payment confirmed!</h2>
              </CardHeader>
              <CardBody>
              <p>Thank you for shopping with us! You will receive an email with the shipping details.</p>
              <a href="/products">Go Home</a>
              </CardBody>
              </>
            )}
            
        </Card>
    </>
  );
}
