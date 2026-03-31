import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        // 1. Update the application status
        const updatedApplication = await prisma.club_Apply.update({
            where: { id: parseInt(id) },
            data: { status },
        });

        // 2. If status is APPROVE, add to User_Clubs
        if (status === "APPROVE") {
            // Check if already a member to avoid duplicates
            const existingMember = await prisma.user_Clubs.findFirst({
                where: {
                    user_id: updatedApplication.user_id,
                    club_id: updatedApplication.club_id,
                },
            });

            if (!existingMember) {
                await prisma.user_Clubs.create({
                    data: {
                        user_id: updatedApplication.user_id,
                        club_id: updatedApplication.club_id,
                    },
                });
            }
        }

        return NextResponse.json({
            message: "Status updated successfully",
            data: updatedApplication,
        });
    } catch (error: any) {
        console.error("Update application error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update status" },
            { status: 500 }
        );
    }
}
