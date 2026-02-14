import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"


export async function POST(req: Request) {
  const { email, otp } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const record = await prisma.oTP.findFirst({
    where: {
      userId: user.id,
      code: otp,
      expiresAt: { gt: new Date() }
    }
  })

  if (!record) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 })
  }

  await prisma.oTP.deleteMany({ where: { userId: user.id } })

  return NextResponse.json({
    success: true,
    role: user.role,
    userId: user.id
  })
}
