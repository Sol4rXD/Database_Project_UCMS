import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { student_id , password } = body;

    if (!student_id || !password) {
      return NextResponse.json(
        { message: "Please fill in all the required information."},
        { status: 400 }
      )
    }
    // Logic
    const user = await prisma.users.findUnique({
      where: { student_id: student_id},
    })
    if(!user) {
      return NextResponse.json(
        { message: "User not found."},
        { status: 404}
      )
    }
    if(user.password !== password) {
      return NextResponse.json(
        { message: "Password incorrect."},
        { status: 401}
      )
    }
    return NextResponse.json({
      message: "Login Success",
      user: {
        id: user.id,
        student_id: user.student_id,
        fullname: user.fullname
      }
    }, { status: 200}
    )
  } catch (error) {
    console.error("Login error: ", error);
    return NextResponse.json(
      { message: "Server error."},
      { status: 500}
    )
  }
} 

