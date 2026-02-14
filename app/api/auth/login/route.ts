import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { generateOTP, otpExpiry } from "@/app/lib/otp"
import bcrypt from "bcryptjs"


export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // OTP only for employees
  if (user.role === "EMPLOYEE") {
    const code = generateOTP()

    await prisma.oTP.create({
      data: {
        code,
        userId: user.id,
        expiresAt: otpExpiry()
      }
    })

    console.log("OTP (send via email/SMS):", code)

    return NextResponse.json({ otpRequired: true })
  }

  // Admin direct login
  return NextResponse.json({
    success: true,
    role: user.role,
    userId: user.id
  })
}
