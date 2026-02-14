import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get("userId") // fetch mails for this user
  const inbox = url.searchParams.get("inbox") === "true"

  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 })

  const mails = await prisma.hRMail.findMany({
    where: inbox
      ? { receiverId: userId, archived: false }
      : { senderId: userId },
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(mails)
}

export async function POST(req: Request) {
  const { senderId, receiverId, subject, content } = await req.json()

  if (!senderId || !receiverId || !subject || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const mail = await prisma.hRMail.create({
    data: { senderId, receiverId, subject, content }
  })

  return NextResponse.json({ success: true, mail })
}
