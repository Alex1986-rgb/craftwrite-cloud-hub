
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const unifiedButtonVariants = cva(
  "btn-unified-base",
  {
    variants: {
      variant: {
        primary: "btn-unified-primary",
        secondary: "btn-unified-secondary", 
        ghost: "btn-unified-ghost",
        success: "bg-success text-white hover:opacity-90 focus-visible:ring-success",
        warning: "bg-warning text-white hover:opacity-90 focus-visible:ring-warning",
        error: "bg-error text-white hover:opacity-90 focus-visible:ring-error"
      },
      size: {
        sm: "px-3 py-2 text-sm min-h-[36px]",
        md: "px-4 py-3 text-base min-h-[44px]",
        lg: "px-6 py-4 text-lg min-h-[52px]",
        icon: "w-11 h-11 p-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof unifiedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const UnifiedButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(unifiedButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </Comp>
    );
  }
);
UnifiedButton.displayName = "UnifiedButton";

export { UnifiedButton, unifiedButtonVariants };
