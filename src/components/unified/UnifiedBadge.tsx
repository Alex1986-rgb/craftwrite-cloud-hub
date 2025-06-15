
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const unifiedBadgeVariants = cva(
  "badge-unified",
  {
    variants: {
      variant: {
        default: "text-neutral-700 dark:text-neutral-300",
        primary: "text-brand-700 dark:text-brand-300 bg-brand-100/50 dark:bg-brand-900/30",
        secondary: "text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50",
        success: "text-success bg-success/10",
        warning: "text-warning bg-warning/10", 
        error: "text-error bg-error/10",
        info: "text-info bg-info/10"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface UnifiedBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof unifiedBadgeVariants> {
  icon?: React.ReactNode;
}

function UnifiedBadge({ className, variant, size, icon, children, ...props }: UnifiedBadgeProps) {
  return (
    <div className={cn(unifiedBadgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </div>
  );
}

export { UnifiedBadge, unifiedBadgeVariants };
