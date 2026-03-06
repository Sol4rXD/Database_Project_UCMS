import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const response = NextResponse.json(
        { message: "Logout success" },
        { status: 200 }
    );

    (await cookies()).set("session", "", {
        expires: new Date(0),
        path: "/",
    });

    return response;
}
