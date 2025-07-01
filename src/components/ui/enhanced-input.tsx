
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  variant?: 'default' | 'floating' | 'minimal';
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    icon, 
    showPasswordToggle = false, 
    variant = 'default',
    type = 'text',
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="space-y-2">
        {label && variant !== 'floating' && (
          <Label 
            htmlFor={props.id} 
            className={cn(
              'text-sm font-medium',
              error && 'text-red-600',
              'transition-colors duration-200'
            )}
          >
            {label}
          </Label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <Input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              // Base styles
              'transition-all duration-200 min-h-[44px]',
              // Icon padding
              icon && 'pl-10',
              // Password toggle padding
              showPasswordToggle && 'pr-10',
              // Error state
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              // Variant styles
              variant === 'floating' && 'placeholder-transparent',
              variant === 'minimal' && 'border-0 border-b-2 rounded-none bg-transparent',
              // Focus states
              'focus:ring-2 focus:ring-offset-1',
              className
            )}
            {...props}
          />

          {/* Floating label */}
          {label && variant === 'floating' && (
            <Label
              htmlFor={props.id}
              className={cn(
                'absolute left-3 transition-all duration-200 pointer-events-none',
                (isFocused || props.value) 
                  ? 'top-2 text-xs text-primary' 
                  : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
              )}
            >
              {label}
            </Label>
          )}

          {/* Password toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {/* Error icon */}
          {error && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';
