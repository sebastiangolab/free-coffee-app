import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

type GetParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: GetParams) {
  const paymentIntentId = (await params).id;

  if (!paymentIntentId) {
    return NextResponse.json(
      {
        error: `Not found payment intend id`,
      },
      { status: 404 }
    );
  }

  try {
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
