import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { Link } from "react-router";

export default function Checkout() {
    const stripePromise = loadStripe("pk_test_51T2GDtEHiwwrlgHEyGOU2wE2dtATMTydnroWgzssb749sgQ81qwZ2Ak4fRYwqupYBBGAmc6d4bUHkg0ZCItI1eLM00emlVlgG9");

    const COOKIE_KEY = "shopping_cart";
    const cart = Cookies.get(COOKIE_KEY);

    const fetchClientSecret = useCallback(async () => {
        const res = await fetch("http://localhost:8080/Checkout/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: cart
        });

        const data = await res.json();
        return data.clientSecret;
    }, [cart]);

    const options = { fetchClientSecret };

    if (!cart) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your cart is empty</h2>
                <p>Please add items before proceeding to checkout.</p>

                <Link to="/" className="btn btn-primary mt-3">
                    Back to Store
                </Link>
            </div>
        );
    }

    return (
        <>
            <h1>Checkout</h1>

            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </>
    );
}
