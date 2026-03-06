import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getSession();

        if (!session || !session.id) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Fetch fresh user data from database to ensure it's up to date
        const user = await prisma.users.findUnique({
            where: { id: session.id },
            select: {
                id: true,
                student_id: true,
                fullname: true,
                role: true,
            },
        });

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Session API error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
