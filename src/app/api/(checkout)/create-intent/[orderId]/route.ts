import { Order } from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  //console.log("id = ", orderId);
  
  const order = await Order.findById(orderId);

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price?.toFixed(2) * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await Order.updateOne(
      { _id: orderId },
      { $set: { intent_id: paymentIntent.id } }
    );

    //console.log("from server secret = ",paymentIntent.client_secret);
    
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
    status: 404,
  });
}
