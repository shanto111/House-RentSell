import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState, useRef } from "react";
import UseAxoisSecure from "../../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import UseAxoisPublic from "../../../Hooks/UseAxoisPublic/UseAxoisPublic";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axoisSecure = UseAxoisSecure();
  const axoisPublic = UseAxoisPublic();
  const { user } = useContext(AuthContext);
  const price = 12000;
  const stripe = useStripe();
  const elements = useElements();
  const cardElementRef = useRef(null);
  const queryParams = new URLSearchParams(location.search);
  const houseId = queryParams.get("houseId");

  const { refetch, data: property } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axoisSecure.get("/propertys");
      return res.data;
    },
  });

  useEffect(() => {
    axoisSecure.post("/create-payment-intent", { price: price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    cardElementRef.current = card;
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payments = {
          email: user?.email,
          price: price,
          transaction: paymentIntent.id,
          date: new Date(),
          HouseId: houseId, // Send HouseId here
          status: "Pending",
        };

        const res = await axoisSecure.post("/payment", payments);
        if (res.data.insertedId) {
          const res = await axoisSecure.post("/confirm-payment", {
            paymentIntentId: paymentIntent.id,
            email: user?.email,
            amount: price,
            houseId: houseId, // Send HouseId here
          });
          console.log("form send email", res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment Successful!",
            text: "Thank you for your payment.",
            showConfirmButton: true,
            confirmButtonText: "Okay",
          });
          cardElementRef.current.clear();
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-8">Secure Payment</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full"
      >
        <div className="mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#333",
                  "::placeholder": {
                    color: "#888",
                  },
                },
                invalid: {
                  color: "#d9534f",
                },
              },
            }}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300"
          type="submit"
          disabled={!stripe || !clientSecret || !houseId} // Disable if HouseId is not selected
        >
          Confirm Payment
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {transactionId && (
          <p className="text-green-700 mt-4">Transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
