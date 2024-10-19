import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";

const Payment = (props) => {
  const stripePromise = loadStripe(
    "pk_test_51Q1RstP9IGsP6B9fONIUdFeRre2hYgz8mKJqOcnYnN2D99LTTubkxfG1pXYhEwi7Eb0QSAdepdARRLvMXpC3JvrN000tVj7E7Y"
  );
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
