import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const senderId = url.searchParams.get("senderId")
  const receiverId = url.searchParams.get("receiverId")

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: "senderId and receiverId required" }, { status: 400 })
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    },
    orderBy: { createdAt: "asc" }
  })

  return NextResponse.json(messages)
}

export async function POST(req: Request) {
  const { senderId, receiverId, content } = await req.json()

  if (!senderId || !receiverId || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const message = await prisma.message.create({
    data: { senderId, receiverId, content }
  })

  return NextResponse.json({ success: true, message })
}
