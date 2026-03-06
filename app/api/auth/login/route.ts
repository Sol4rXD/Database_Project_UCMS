import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { student_id, password } = body;

    if (!student_id || !password) {
      return NextResponse.json(
        { message: "Please fill in all the required information." },
        { status: 400 }
      )
    }
    // Logic
    const user = await prisma.users.findUnique({
      where: { student_id: student_id },
    })
    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Password incorrect." },
        { status: 401 }
      )
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password incorrect." },
        { status: 401 }
      )
    }

    // Generate token
    const { encrypt } = await import("@/lib/auth");
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({
      id: user.id,
      student_id: user.student_id,
      role: user.role,
      expires
    });

    const response = NextResponse.json({
      message: "Login Success",
      user: {
        id: user.id,
        student_id: user.student_id,
        fullname: user.fullname,
        role: user.role
      }
    }, { status: 200 });

    // Set cookie
    response.cookies.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error: ", error);
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    )
  }
}

