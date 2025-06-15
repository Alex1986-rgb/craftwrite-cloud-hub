
import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle';
  blur?: 'sm' | 'md' | 'lg';
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', blur = 'md', ...props }, ref) => {
    const variants = {
      default: 'glass-card',
      elevated: 'glass-card shadow-xl border-white/20',
      subtle: 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl'
    };

    const blurLevels = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg'
    };

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          blurLevels[blur],
          'transition-all duration-300 hover:shadow-2xl hover:border-white/30',
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
