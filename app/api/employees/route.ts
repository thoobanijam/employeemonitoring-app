import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const search = url.searchParams.get("search")

  const employees = await prisma.employee.findMany({
    where: search ? {
      OR: [
        { email: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { phone: { contains: search } },
      ]
    } : {},
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(employees)
}

export async function POST(req: Request) {
  const data = await req.json()
  const { firstName, lastName, email, phone, department, team, role } = data

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const employee = await prisma.employee.create({
    data: { firstName, lastName, email, phone, department, team, role }
  })

  return NextResponse.json({ success: true, employee })
}
