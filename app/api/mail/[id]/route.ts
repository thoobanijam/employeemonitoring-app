import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const mail = await prisma.hRMail.findUnique({ where: { id: params.id } })
  if (!mail) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(mail)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const mail = await prisma.hRMail.update({
    where: { id: params.id },
    data
  })
  return NextResponse.json({ success: true, mail })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.hRMail.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
