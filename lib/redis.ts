import { Redis } from "@upstash/redis"

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

const isRedisConfigured = !!(redisUrl && redisToken)

export const redis = isRedisConfigured 
  ? new Redis({
      url: redisUrl!,
      token: redisToken!,
    })
  : null

export { isRedisConfigured }

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
