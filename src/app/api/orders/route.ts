import { connectDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { Order } from "@/models/order";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    connectDB();
    try {
      if (session.user.isAdmin) {
        const orders = await Order.find();
        const responseData = {
          isAdmin: session.user.isAdmin, // Include the isAdmin status
          orders: orders, // Include the orders data
        };
        return new NextResponse(JSON.stringify(responseData), { status: 200 });
      }
      const orders = await Order.find({
        userEmail: session.user.email!,
      });
      const responseData = {
        isAdmin: session.user.isAdmin, // Include the isAdmin status
        orders: orders, // Include the orders data
      };
      return new NextResponse(JSON.stringify(responseData), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    await connectDB();
    try {
      const body = await req.json();
      // console.log("data : ",body);
      
      const order = new Order(body);
      await order.save();
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
