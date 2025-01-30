import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(req: NextRequest) {
  try {
    const { paymentIntentId } = await req.json();

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json(paymentIntent);
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
