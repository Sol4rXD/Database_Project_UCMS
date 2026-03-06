import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { connectDB } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import mongoose from "mongoose";
import { getSession } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.id;

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const [memberships, applications] = await Promise.all([
            prisma.user_Clubs.findMany({ where: { user_id: userId } }),
            prisma.club_Apply.findMany({ where: { user_id: userId } })
        ]);

        const allRawIds = [
            ...memberships.map(m => m.club_id),
            ...applications.map(a => a.club_id)
        ];
        const allUniqueIds = Array.from(new Set(allRawIds));

        await connectDB();

        const objectIds = allUniqueIds
            .filter(id => id.match(/^[0-9a-fA-F]{24}$/))
            .map(id => new mongoose.Types.ObjectId(id));

        const slugs = allUniqueIds.filter(id => !id.match(/^[0-9a-fA-F]{24}$/));

        const clubsData = await Club.find({
            $or: [
                { _id: { $in: objectIds } },
                { slug: { $in: slugs } }
            ]
        });

        const normalize = (id: string) => id.toString().toLowerCase().trim();

        const membershipList = clubsData.filter(c => {
            const clubIdStr = normalize(c._id.toString());
            const clubSlug = normalize(c.slug || "");
            return memberships.some(m => normalize(m.club_id) === clubIdStr || normalize(m.club_id) === clubSlug);
        }).map(c => ({
            _id: c._id.toString(),
            club_name: c.club_name,
            location: c.location,
            logo_url: c.logo_url || "/testpic/dongtaan.png",
            is_open: c.is_open,
            description: c.description,
            slug: c.slug,
            role: "Member"
        }));

        const applicationList = clubsData.filter(c => {
            const clubIdStr = normalize(c._id.toString());
            const clubSlug = normalize(c.slug || "");
            const isMember = memberships.some(m => normalize(m.club_id) === clubIdStr || normalize(m.club_id) === clubSlug);
            return !isMember && applications.some(a => normalize(a.club_id) === clubIdStr || normalize(a.club_id) === clubSlug);
        }).map(c => {
            const clubIdStr = normalize(c._id.toString());
            const clubSlug = normalize(c.slug || "");
            const app = applications.find(a => normalize(a.club_id) === clubIdStr || normalize(a.club_id) === clubSlug);

            return {
                _id: c._id.toString(),
                club_name: c.club_name,
                location: c.location,
                logo_url: c.logo_url || "/testpic/dongtaan.png",
                is_open: c.is_open,
                description: c.description,
                slug: c.slug,
                role: app?.status === "PENDING" ? "Pending" : app?.status === "REJECT" ? "Rejected" : "Approved",
                appliedAt: app?.create_at
            };
        });

        return NextResponse.json({
            user: {
                ...user,
                joinDate: "N/A"
            },
            memberships: membershipList,
            applications: applicationList
        });

    } catch (error) {
        console.error("Profile fetch error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
