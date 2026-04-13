import { NextResponse } from "next/server"
import { getPresentationCommand, setPresentationCommand, type PresentationCommand } from "@/lib/redis"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const command: PresentationCommand = {
      action: body.action,
      slideIndex: body.slideIndex,
      timestamp: Date.now(),
    }

    await setPresentationCommand(command)

    return NextResponse.json({ success: true, command }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Error sending command:", error)
    return NextResponse.json({ error: "Failed to send command" }, { status: 500, headers: noStoreHeaders })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lastTimestamp = parseInt(url.searchParams.get("since") || "0")

    const command = await getPresentationCommand()

    if (!command) {
      return NextResponse.json({ command: null }, { headers: noStoreHeaders })
    }

    if (command.timestamp > lastTimestamp) {
      return NextResponse.json({ command }, { headers: noStoreHeaders })
    }

    return NextResponse.json({ command: null }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Error getting command:", error)
    return NextResponse.json({ error: "Failed to get command" }, { status: 500, headers: noStoreHeaders })
  }
}
