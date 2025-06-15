
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const unifiedCardVariants = cva(
  "card-unified",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg shadow-unified-glow",
        interactive: "hover:scale-[1.02] cursor-pointer",
        minimal: "bg-transparent border border-neutral-200 dark:border-neutral-800"
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6", 
        lg: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
);

interface UnifiedCardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof unifiedCardVariants> {}

const UnifiedCard = React.forwardRef<HTMLDivElement, UnifiedCardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(unifiedCardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
UnifiedCard.displayName = "UnifiedCard";

const UnifiedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
UnifiedCardHeader.displayName = "UnifiedCardHeader";

const UnifiedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));
UnifiedCardTitle.displayName = "UnifiedCardTitle";

const UnifiedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
    {...props}
  />
));
UnifiedCardDescription.displayName = "UnifiedCardDescription";

const UnifiedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
UnifiedCardContent.displayName = "UnifiedCardContent";

const UnifiedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between pt-4", className)}
    {...props}
  />
));
UnifiedCardFooter.displayName = "UnifiedCardFooter";

export { 
  UnifiedCard, 
  UnifiedCardHeader, 
  UnifiedCardFooter, 
  UnifiedCardTitle, 
  UnifiedCardDescription, 
  UnifiedCardContent,
  unifiedCardVariants
};
