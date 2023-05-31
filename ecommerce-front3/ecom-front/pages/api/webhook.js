import { mongooseConnect } from "../../lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from "micro"
// import {Order} from "../models/Order";
const endpointSecret="whsec_9ae4c7e1a1f90ed252e565d3c2d6e3a6a80c5af991de13b9fcf27ee96bc71695"
export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded

    // case 'checkout.session.completed':
      // const data = event.data.object;
      // const orderId = data.metadata.orderId;
      // const paid = data.payment_status === 'paid';
      // if (orderId && paid) {
      //   await Order.findByIdAndUpdate(orderId,{
      //     paid:true,
      //   })
      // }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

export const config = {
  api: {bodyParser:false,}
};
