import { connectDB } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = await params;
    console.log("Slug ที่รับมาคือ:", slug);
    const club = await Club.findOne({ slug: slug });

    if (!club) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(club);
  } catch (error) {
    console.error("GET by Slug Error:", error);
    return NextResponse.json(
      { error: "Error to fetch data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const body = await req.json();

    const updatedClub = await Club.findOneAndUpdate(
      { slug },
      body,
      { new: true }
    );

    if (!updatedClub) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Update club success", data: updatedClub },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT by Slug Error:", error);
    return NextResponse.json(
      { error: error.message ?? "Error to update club" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = await params;

    const deleted = await Club.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json(
        { error: "Club not found" },
        { status: 404 }
      );
    }

    // Delete related records in MySQL (Manual Cascade)
    await prisma.user_Clubs.deleteMany({
      where: { club_id: slug }
    });

    await prisma.club_Apply.deleteMany({
      where: { club_id: slug }
    });

    return NextResponse.json(
      { message: "Delete club success and cleaned up related records" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE by Slug Error:", error);
    return NextResponse.json(
      { error: error.message ?? "Error to delete club" },
      { status: 500 }
    );
  }
}

