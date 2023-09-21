import { Order } from "@/models/order";
import { connectDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  //console.log("id", id);
  connectDB();

  if (req.method === "PUT") {
    try {
      const body = await req.json();
      //console.log("body",body);

      await Order.updateOne({ _id: id }, { $set: { status: body } });

      return new NextResponse(
        JSON.stringify({ message: "Order has been updated!" }),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
      );
    }
  }
};
