import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  return Response.json(await prisma.users.findUnique({
    where: { id: Number(id) }
  }))
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const {password} = await req.json()
    return Response.json(await prisma.users.update({
      where: { id: Number(id)},
      data: { password }
    }))
  } catch (error) {
        return new Response(error as BodyInit, {
        status: 500,
      })
    }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    await prisma.users.delete({
      where: { id: Number(id)}
    })
    return Response.json({ message: `delete id ${id}`})
  } catch (error) {
        return new Response(error as BodyInit, {
        status: 500,
      })
  }
}


