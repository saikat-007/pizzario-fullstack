//import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { connectDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  console.log("id", id);
  connectDB();

  if (req.method === "GET") {
    try {
      const product = await Product.findOne({ _id: id });

      return new NextResponse(
        JSON.stringify(product),
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
