import { NextResponse } from "next/server"
import { redis, isRedisConfigured, PRESENTATION_STATE_KEY, type PresentationState } from "@/lib/redis"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
}

const defaultState: PresentationState = { 
  currentSlide: 0, 
  totalSlides: 8, 
  hasSimulation: false, 
  isPlaying: false,
  timestamp: Date.now()
}

// POST - Update state from presentation
export async function POST(request: Request) {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json(
      { success: true, state: defaultState, warning: "Redis not configured" },
      { headers: noStoreHeaders }
    )
  }
  
  try {
    const body = await request.json()
    const state: PresentationState = {
      currentSlide: body.currentSlide,
      totalSlides: body.totalSlides,
      hasSimulation: body.hasSimulation,
      isPlaying: body.isPlaying,
      timestamp: Date.now(),
    }
    
    // Store state with 5 minute expiration
    await redis.set(PRESENTATION_STATE_KEY, JSON.stringify(state), { ex: 300 })
    
    return NextResponse.json({ success: true, state }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Error updating state:", error)
    return NextResponse.json({ error: "Failed to update state" }, { status: 500, headers: noStoreHeaders })
  }
}

// GET - Get current state for remote
export async function GET() {
  if (!isRedisConfigured || !redis) {
    return NextResponse.json({ state: defaultState, warning: "Redis not configured" }, { headers: noStoreHeaders })
  }
  
  try {
    const data = await redis.get(PRESENTATION_STATE_KEY)
    
    if (!data) {
      return NextResponse.json({ state: defaultState }, { headers: noStoreHeaders })
    }
    
    const state = typeof data === "string" ? JSON.parse(data) : data as PresentationState
    return NextResponse.json({ state }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Error getting state:", error)
    return NextResponse.json({ error: "Failed to get state" }, { status: 500, headers: noStoreHeaders })
  }
}
