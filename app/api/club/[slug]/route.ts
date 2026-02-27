import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import mongoose from "mongoose"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        await connectDB() // 👈 แค่ connect ไม่ต้องรับค่า

        // ใช้ mongoose connection โดยตรง
        const club = await mongoose.connection
            .collection("clubs")
            .findOne({ slug })

        if (!club) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        return NextResponse.json(club)

    } catch (error) {
        console.error("REAL ERROR:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}