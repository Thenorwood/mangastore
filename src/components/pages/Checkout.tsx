import {loadStripe} from "@stripe/stripe-js";
import {useCallback} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";

import Cookies from "js-cookie"

export default function Checkout(){

    const stripePromise = loadStripe("pk_test_51T2GDtEHiwwrlgHEyGOU2wE2dtATMTydnroWgzssb749sgQ81qwZ2Ak4fRYwqupYBBGAmc6d4bUHkg0ZCItI1eLM00emlVlgG9")
    const COOKIE_KEY = "shopping_cart"

    const fetchClientSecret = useCallback(async () => {
        //get cart from cookie
        const cart = Cookies.get(COOKIE_KEY)

        // Create a Checkout Session
        const res = await fetch("http://localhost:8080/Checkout/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body:cart
        });
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options = {fetchClientSecret};



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
    )
}




