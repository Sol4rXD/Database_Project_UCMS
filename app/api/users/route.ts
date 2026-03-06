import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

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

    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        password: hashedPassword,
        fullname,
        surname,
        student_id,
        faculty,
        department
      }
    })
    return Response.json(user, { status: 201 });
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500
    })
  }
}

export async function GET() {
  return Response.json(await prisma.users.findMany())
}

