import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      // eslint-disable-next-line camelcase
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(`Internal server error: ${error}`);

    return NextResponse.json(
      {
        error: `Internal server error: ${error}`,
      },
      { status: 500 }
    );
  }
}
