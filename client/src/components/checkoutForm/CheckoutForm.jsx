import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email.includes("@") || !email.includes(".")) {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }

    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error) {
      const errorMessage =
        error.type === "card_error" || error.type === "validation_error"
          ? error.message
          : "An unexpected error occurred.";
      setMessage(errorMessage);
    } else {
      setMessage("Payment confirmed!");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      aria-labelledby="payment-form-title"
    >
      <h2 id="payment-form-title">Checkout</h2>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!isEmailValid} // Accessibility improvement
        aria-describedby="email-error" // Link to error message if invalid
      />
      {!isEmailValid && (
        <div id="email-error" className="error-message">
          Please enter a valid email address.
        </div>
      )}

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          className={isLoading ? "loading-message" : "success-message"}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
