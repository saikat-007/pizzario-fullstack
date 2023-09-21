import { Order } from "@/models/order";
import { connectDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function PUT (request: NextRequest ,{ params }: { params: { intentId: string } }) 
{
  connectDB();
  const { intentId } = params;
  //console.log("inside server p--i",intentId);
  try {
    await Order.updateOne(
      { intent_id: intentId },
      { $set: { status: "Being prepared!" } }
    );
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};