// services/paymentService.js
import stripePromise from './stripe';
import { toast } from "react-toastify";

const handlePayment = async (paymentData:any, item:any) => {
    try {
        const response = await fetch('https://localhost:7132/StripePayment/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            const errorDetail = await response.json();
            console.error('Error from server:', errorDetail);
            return;
        }

        const { data: sessionId } = await response.json();
        const stripe = await stripePromise;

        if (stripe && sessionId) {
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result.error) {
                toast.error('Payment failed!');
            } else {
                toast.success('Payment successful!');
            }
        } else {
            console.error('Stripe or sessionId is missing.');
        }
    } catch (error) {
        console.error('Payment error:', error);
    }
};

export default {
    handlePayment
};
