import { NextResponse } from "next/server"
import {
  getPresentationState,
  setPresentationState,
  type PresentationState,
} from "@/lib/redis"

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
  try {
    const body = await request.json()
    const state: PresentationState = {
      currentSlide: body.currentSlide,
      totalSlides: body.totalSlides,
      hasSimulation: body.hasSimulation,
      isPlaying: body.isPlaying,
      timestamp: Date.now(),
    }

    await setPresentationState(state)

    return NextResponse.json({ success: true, state }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Error updating state:", error)
    return NextResponse.json({ error: "Failed to update state" }, { status: 500, headers: noStoreHeaders })
  }
}

// GET - Get current state for remote
export async function GET() {
  try {
    const state = await getPresentationState()

    if (!state) {
      return NextResponse.json({ state: defaultState }, { headers: noStoreHeaders })
    }

    return NextResponse.json({ state }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Error getting state:", error)
    return NextResponse.json({ error: "Failed to get state" }, { status: 500, headers: noStoreHeaders })
  }
}
