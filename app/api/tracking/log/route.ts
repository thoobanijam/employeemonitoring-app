 import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function POST(req: Request) {
  try {
    const { employeeId, appName, url, screenshot } = await req.json()

    if (!employeeId) {
      return NextResponse.json(
        { error: "employeeId is required" },
        { status: 400 }
      )
    }

    const log = await prisma.activityLog.create({
      data: {
        employeeId,
        appName,
        url,
        screenshot
      }
    })

    return NextResponse.json({
      success: true,
      data: log
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Tracking failed" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  })

  return NextResponse.json(logs)
}
