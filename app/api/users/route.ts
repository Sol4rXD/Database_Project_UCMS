import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      password,
      fullname,
      surname,
      student_id,
      faculty,
      department
    } = await req.json()

    const existingUser = await prisma.users.findUnique({ where: { student_id } });
    if (existingUser) {
      return Response.json({ message: "student_id already exists" }, { status: 400 });
    }

    const user = await prisma.users.create({
      data: {
        password,    
        fullname,
        surname,
        student_id,
        faculty,
        department
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
  return Response.json(await prisma.users.findMany())
}

