import { NextResponse } from "next/server"
import { redis, isRedisConfigured, PRESENTATION_COMMAND_KEY, type PresentationCommand } from "@/lib/redis"

// POST - Send a command from remote
export async function POST(request: Request) {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json({ success: false, error: "Redis not configured", command: null })
  }
  
  try {
    const body = await request.json()
    const command: PresentationCommand = {
      action: body.action,
      slideIndex: body.slideIndex,
      timestamp: Date.now(),
    }
    
    // Store command with 30 second expiration
    await redis.set(PRESENTATION_COMMAND_KEY, JSON.stringify(command), { ex: 30 })
    
    return NextResponse.json({ success: true, command })
  } catch (error) {
    console.error("Error sending command:", error)
    return NextResponse.json({ error: "Failed to send command" }, { status: 500 })
  }
}

// GET - Poll for commands from presentation
export async function GET(request: Request) {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json({ command: null, warning: "Redis not configured" })
  }
  
  try {
    const url = new URL(request.url)
    const lastTimestamp = parseInt(url.searchParams.get("since") || "0")
    
    const data = await redis.get(PRESENTATION_COMMAND_KEY)
    
    if (!data) {
      return NextResponse.json({ command: null })
    }
    
    const command = typeof data === "string" ? JSON.parse(data) : data as PresentationCommand
    
    // Only return if it's a new command
    if (command.timestamp > lastTimestamp) {
      return NextResponse.json({ command })
    }
    
    return NextResponse.json({ command: null })
  } catch (error) {
    console.error("Error getting command:", error)
    return NextResponse.json({ error: "Failed to get command" }, { status: 500 })
  }
}
