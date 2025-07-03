import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'frosted';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', blur = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-white/10 border border-white/20',
      elevated: 'bg-white/15 border border-white/30 shadow-2xl',
      subtle: 'bg-white/5 border border-white/10',
      frosted: 'bg-white/20 border border-white/40 shadow-xl'
    };

    const blurLevels = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md', 
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-500 hover:shadow-2xl hover:border-white/50',
          variants[variant],
          blurLevels[blur],
          'hover:bg-white/20 hover:scale-[1.02]',
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }