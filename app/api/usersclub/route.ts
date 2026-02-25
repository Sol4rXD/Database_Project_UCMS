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
    return Response.json(user, { status: 201});
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500
    })
  }
}

export async function GET() {
  return Response.json(await prisma.user_Clubs.findMany())
}


