import { Redis } from "@upstash/redis"

// Redis client for presentation sync
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Keys for presentation sync
export const PRESENTATION_COMMAND_KEY = "presentation:command"
export const PRESENTATION_STATE_KEY = "presentation:state"

export interface PresentationCommand {
  action: "next" | "prev" | "goto" | "play" | "pause" | "step" | "reset"
  slideIndex?: number
  timestamp: number
}

export interface PresentationState {
  currentSlide: number
  totalSlides: number
  hasSimulation: boolean
  isPlaying: boolean
  timestamp: number
}
