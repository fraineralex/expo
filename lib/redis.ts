import { Redis } from "@upstash/redis"

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

type MemoryStore = {
  command: PresentationCommand | null
  commandExpiresAt: number
  state: PresentationState | null
  stateExpiresAt: number
}

declare global {
  var __presentationMemoryStore: MemoryStore | undefined
}

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

const isRedisConfigured = !!(redisUrl && redisToken)

const redis = isRedisConfigured
  ? new Redis({
      url: redisUrl!,
      token: redisToken!,
    })
  : null

const memoryStore = globalThis.__presentationMemoryStore ?? {
  command: null,
  commandExpiresAt: 0,
  state: null,
  stateExpiresAt: 0,
}

globalThis.__presentationMemoryStore = memoryStore

export const storageMode = isRedisConfigured ? "redis" : "memory"

export { isRedisConfigured }

export const PRESENTATION_COMMAND_KEY = "presentation:command"
export const PRESENTATION_STATE_KEY = "presentation:state"

export async function setPresentationCommand(command: PresentationCommand) {
  if (redis) {
    await redis.set(PRESENTATION_COMMAND_KEY, JSON.stringify(command), { ex: 30 })
    return
  }

  memoryStore.command = command
  memoryStore.commandExpiresAt = Date.now() + 30000
}

export async function getPresentationCommand() {
  if (redis) {
    const data = await redis.get(PRESENTATION_COMMAND_KEY)
    if (!data) return null
    return typeof data === "string" ? JSON.parse(data) as PresentationCommand : data as PresentationCommand
  }

  if (!memoryStore.command || memoryStore.commandExpiresAt <= Date.now()) {
    memoryStore.command = null
    return null
  }

  return memoryStore.command
}

export async function setPresentationState(state: PresentationState) {
  if (redis) {
    await redis.set(PRESENTATION_STATE_KEY, JSON.stringify(state), { ex: 300 })
    return
  }

  memoryStore.state = state
  memoryStore.stateExpiresAt = Date.now() + 300000
}

export async function getPresentationState() {
  if (redis) {
    const data = await redis.get(PRESENTATION_STATE_KEY)
    if (!data) return null
    return typeof data === "string" ? JSON.parse(data) as PresentationState : data as PresentationState
  }

  if (!memoryStore.state || memoryStore.stateExpiresAt <= Date.now()) {
    memoryStore.state = null
    return null
  }

  return memoryStore.state
}
