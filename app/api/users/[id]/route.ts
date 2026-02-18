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
