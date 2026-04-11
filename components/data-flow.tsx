import { cn } from "@/lib/utils"

interface DataFlowProps {
  from: "left" | "right" | "right-top" | "right-bottom" | "center" | "center-top" | "center-bottom"
  to: "left" | "right" | "right-top" | "right-bottom" | "center"
  label: string
  color?: "primary" | "accent"
  delay?: boolean
  compact?: boolean
}

export default function DataFlow({ from, to, label, color = "primary", delay, compact }: DataFlowProps) {
  const getPositionClass = (position: string, isFrom: boolean) => {
    const positions = {
      left: "left-[15%]",
      right: "right-[15%]",
      "right-top": "right-[28%] top-[28%]",
      "right-bottom": "right-[28%] bottom-[28%]",
      center: "left-1/2 -translate-x-1/2",
      "center-top": "left-1/2 -translate-x-1/2 top-[28%]",
      "center-bottom": "left-1/2 -translate-x-1/2 bottom-[28%]",
    }
    return positions[position as keyof typeof positions] || ""
  }

  const getAnimationClass = () => {
    if (from === "right" && to === "left") return "animate-slide-left"
    if (from === "left" && to === "right") return "animate-slide-right"
    if (from === "right-top" && to === "left") return "animate-slide-left"
    if (from === "right-bottom" && to === "left") return "animate-slide-left"
    if (from === "left" && to === "right-bottom") return "animate-slide-right"
    if (from === "center" && to === "right") return "animate-slide-right"
    if (from === "center-top" && to === "left") return "animate-slide-left"
    if (from === "center-bottom" && to === "left") return "animate-slide-left"
    return "animate-slide-left"
  }

  return (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2 pointer-events-none",
        getPositionClass(from, true),
        delay && "animation-delay-500",
      )}
    >
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-mono text-xs font-semibold shadow-lg",
          compact ? "px-3 py-1" : "px-4 py-2",
          color === "primary" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
          getAnimationClass(),
        )}
      >
        {label}
      </div>
    </div>
  )
}
