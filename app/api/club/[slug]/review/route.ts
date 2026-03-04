import { connectDB } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const { slug } = await params;
        const { user_id, name, text, star, position, year } = await req.json();

        if (!user_id || !star || !text) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find the club
        const club = await Club.findOne({ slug });
        if (!club) {
            return NextResponse.json({ error: "Club not found" }, { status: 404 });
        }

        // Check if user is a member
        const isMember = await prisma.user_Clubs.findFirst({
            where: {
                user_id: parseInt(user_id),
                club_id: club._id.toString(),
            },
        });

        if (!isMember) {
            return NextResponse.json({ error: "Only members can review" }, { status: 403 });
        }

        // Check if user has already reviewed
        const existingReview = club.reviews.find((r: any) => r.user_id === user_id.toString());
        if (existingReview) {
            return NextResponse.json({ error: "You have already reviewed this club" }, { status: 400 });
        }

        // Add review
        const newReview = {
            user_id: user_id.toString(),
            name,
            text,
            star,
            position: position || "Member",
            year: parseInt(year) || new Date().getFullYear(),
            create_at: new Date(),
        };

        club.reviews.push(newReview);
        await club.save();

        return NextResponse.json({ message: "Review added successfully", review: newReview }, { status: 201 });
    } catch (error: any) {
        console.error("POST Review Error:", error);
        return NextResponse.json({ error: error.message || "Failed to add review" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const { slug } = await params;
        const { user_id, text, star, year, name } = await req.json();

        if (!user_id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const club = await Club.findOne({ slug });
        if (!club) {
            return NextResponse.json({ error: "Club not found" }, { status: 404 });
        }

        const reviewIndex = club.reviews.findIndex((r: any) => r.user_id === user_id.toString());
        if (reviewIndex === -1) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // Update fields
        if (text !== undefined) club.reviews[reviewIndex].text = text;
        if (star !== undefined) club.reviews[reviewIndex].star = star;
        if (year !== undefined) club.reviews[reviewIndex].year = parseInt(year);
        if (name !== undefined) club.reviews[reviewIndex].name = name;

        await club.save();

        return NextResponse.json({ message: "Review updated successfully", review: club.reviews[reviewIndex] });
    } catch (error: any) {
        console.error("PUT Review Error:", error);
        return NextResponse.json({ error: error.message || "Failed to update review" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const { slug } = await params;
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        if (!user_id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const club = await Club.findOne({ slug });
        if (!club) {
            return NextResponse.json({ error: "Club not found" }, { status: 404 });
        }

        const initialLength = club.reviews.length;
        club.reviews = club.reviews.filter((r: any) => r.user_id !== user_id.toString());

        if (club.reviews.length === initialLength) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        await club.save();

        return NextResponse.json({ message: "Review deleted successfully" });
    } catch (error: any) {
        console.error("DELETE Review Error:", error);
        return NextResponse.json({ error: error.message || "Failed to delete review" }, { status: 500 });
    }
}
