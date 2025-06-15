
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface EnhancedProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: 'default' | 'gradient' | 'animated';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
}

const EnhancedProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  EnhancedProgressProps
>(({ className, variant = 'default', size = 'md', showValue = false, label, value = 0, ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variants = {
    default: 'bg-blue-600',
    gradient: 'gradient-primary',
    animated: 'bg-blue-600 animate-pulse'
  };

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>}
          {showValue && <span className="text-slate-500 dark:text-slate-400">{value}%</span>}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700",
          sizeClasses[size],
          "shadow-inner",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-700 ease-out",
            variants[variant],
            variant === 'animated' && 'relative overflow-hidden',
            "shadow-sm"
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
          {variant === 'animated' && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
})
EnhancedProgress.displayName = "EnhancedProgress"

export { EnhancedProgress }
