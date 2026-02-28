import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      club_id,
      user_id
    } = await req.json()

    const user = await prisma.user_Clubs.create({
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

  if (user_id && club_id) {
    const member = await prisma.user_Clubs.findFirst({
      where: {
        user_id: parseInt(user_id),
        club_id: club_id,
      },
    });
    return Response.json(member);
  }

  return Response.json(await prisma.user_Clubs.findMany());
}


