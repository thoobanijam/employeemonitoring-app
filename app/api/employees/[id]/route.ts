import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({ where: { id: params.id } })
  if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(employee)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const employee = await prisma.employee.update({
    where: { id: params.id },
    data
  })
  return NextResponse.json({ success: true, employee })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.employee.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
