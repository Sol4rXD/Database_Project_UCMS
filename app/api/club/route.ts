import { connectDB } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const clubs = await Club.find({}); 
    return NextResponse.json(clubs);
  } catch (error) {
    return NextResponse.json({ error: "Error to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB(); 
    const body = await req.json();
    const newClub = await Club.create(body);

    return NextResponse.json({ message: "Create club success", data: newClub }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message}, { status: 500 });
  }
}
