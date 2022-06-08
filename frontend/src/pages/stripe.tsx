import React, { FC } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51L7EJ7LDnyHEKsAaFJTkzCdtx0SgYVJ3Q0hltqA9PXsvsl1PGLz3NanUhvG5KPFCVS2Kwzkeluv0npEILGUQPUxH00nqoVjS15');

const Stripe: FC = () => {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'sk_test_51L7EJ7LDnyHEKsAasNgm6j7OUJeIKIEMxhutkZRTIRNimq0F8oWeScVUPCGpqFNWlyuIF8HYVXLbmwpndvX7Lzhd00lgZdsv9H',
    };
    //
    // const stripe = Stripe('{{ $stripe_key }}', { locale: 'en' }); // Create a Stripe client.
    // const elements = stripe.elements(); // Create an instance of Elements.
    // const cardElement = elements.create('card', { style: style }); // Create an instance of the card Element.
    // const cardButton = document.getElementById('card-button');
    // const clientSecret = cardButton.dataset.secret;
    return (
            // <div>
            //     <div className="container" >
            //         <div className="row justify-content-center">
            //             <div className="col-md-12">
            //                 <div className="">
            //                     <p>You will be charged rs 100</p>
            //                 </div>
            //                 <div className="card">
            //                     <form action="{{route('checkout.credit-card')}}" method="post" id="payment-form">
            //                         <div className="form-group">
            //                             <div className="card-header">
            //                                 <label htmlFor="card-element">
            //                                     Enter your credit card information
            //                                 </label>
            //                             </div>
            //                             <div className="card-body">
            //                                 <div id="card-element">
            //
            //                                 </div>
            //
            //                                 <div id="card-errors" role="alert"></div>
            //                                 <input  name="plan" value=""/>
            //                             </div>
            //                         </div>
            //                         <div className="card-footer">
            //                             <button
            //                                     id="card-button"
            //                                     className="btn btn-dark"
            //                                     type="submit"
            //                                     data-secret="{{ $intent }}"
            //                             > Pay
            //                             </button>
            //                         </div>
            //                     </form>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
    );
};

export default Stripe;