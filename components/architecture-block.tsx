import { cn } from "@/lib/utils"

interface ArchitectureBlockProps {
  label: string
  sublabel?: string
  active?: boolean
  size?: "sm" | "md"
}

export default function ArchitectureBlock({ label, sublabel, active, size = "md" }: ArchitectureBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 transition-all duration-500 flex flex-col items-center justify-center",
        size === "sm" ? "w-24 h-20 p-2" : "w-32 h-28 p-3",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
          : "border-border bg-card text-foreground",
      )}
    >
      <div className={cn("font-bold text-center", size === "sm" ? "text-xs" : "text-sm")}>{label}</div>
      {sublabel && (
        <div className={cn("text-center mt-1 font-mono", size === "sm" ? "text-[10px]" : "text-xs")}>{sublabel}</div>
      )}
    </div>
  )
}
