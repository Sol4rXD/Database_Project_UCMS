import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      club_id,
      user_id
    } = await req.json()

    const user = await prisma.club_Apply.create({
      data: {
        club_id,
        user_id
      }
    })
    return Response.json(user, { status: 201 });
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500
    })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const club_id = searchParams.get("club_id");
  const status = searchParams.get("status");

  const where: any = {};
  if (user_id) where.user_id = parseInt(user_id);
  if (club_id) where.club_id = club_id;
  if (status) where.status = status;

  if (user_id && club_id) {
    const application = await prisma.club_Apply.findFirst({
      where,
      include: { user: true }
    });
    return Response.json(application);
  }

  const applications = await prisma.club_Apply.findMany({
    where,
    include: { user: true },
    orderBy: { create_at: 'desc' }
  });

  return Response.json(applications);
}



