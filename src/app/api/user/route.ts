// import { connectMongoDB } from "@/lib/mongodb";
import {UserDetails} from "@/models/userDetails";
import { connectDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
  const { name, email } = await request.json();
  await connectDB();
  await UserDetails.create({ name, email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
