import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const employeeId = url.searchParams.get("employeeId")

  const where = employeeId ? { assignedTo: employeeId } : {}

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const data = await req.json()
  const { title, description, assignedTo, department, team, priority, deadline } = data

  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 })

  const task = await prisma.task.create({
    data: { title, description, assignedTo, department, team, priority, deadline: deadline ? new Date(deadline) : undefined }
  })

  return NextResponse.json({ success: true, task })
}
