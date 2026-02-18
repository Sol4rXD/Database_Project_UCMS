import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      username,
      password,
      fullname,
      surname,
      student_id,
      faculty,
      department
    } = await req.json()

    const user = await prisma.users.create({
      data: {
        username,    
        password,    
        fullname,
        surname,
        student_id,
        faculty,
        department
      }
    })
    return Response.json(user)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500
    })
  }
}

