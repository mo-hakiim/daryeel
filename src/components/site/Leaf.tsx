import { cn } from "@/lib/utils";

/** Fine-line botanical leaf used as subtle decoration. */
export function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      <path
        d="M60 196C60 196 8 150 8 92C8 44 40 12 60 4C80 12 112 44 112 92C112 150 60 196 60 196Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M60 196V20" stroke="currentColor" strokeWidth="1.2" />
      {[50, 75, 100, 125, 150].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y + 10}C${48 - i} ${y} ${30 + i * 2} ${y - 8} ${22 + i * 3} ${y - 18}`} stroke="currentColor" strokeWidth="1" />
          <path d={`M60 ${y + 10}C${72 + i} ${y} ${90 - i * 2} ${y - 8} ${98 - i * 3} ${y - 18}`} stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
