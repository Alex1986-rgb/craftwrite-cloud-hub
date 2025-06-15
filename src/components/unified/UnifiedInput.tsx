
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const unifiedInputVariants = cva(
  "input-unified",
  {
    variants: {
      variant: {
        default: "",
        error: "border-error focus:shadow-error/30",
        success: "border-success focus:shadow-success/30"
      },
      size: {
        sm: "px-3 py-2 text-sm min-h-[36px]",
        md: "px-4 py-3 text-base min-h-[44px]",
        lg: "px-5 py-4 text-lg min-h-[52px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface UnifiedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof unifiedInputVariants> {
  error?: string;
  label?: string;
  description?: string;
}

const UnifiedInput = React.forwardRef<HTMLInputElement, UnifiedInputProps>(
  ({ className, variant, size, type, error, label, description, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorVariant = error ? "error" : variant;
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(unifiedInputVariants({ variant: errorVariant, size, className }))}
          ref={ref}
          {...props}
        />
        {description && !error && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
        {error && (
          <p className="text-xs text-error flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);
UnifiedInput.displayName = "UnifiedInput";

export { UnifiedInput, unifiedInputVariants };
