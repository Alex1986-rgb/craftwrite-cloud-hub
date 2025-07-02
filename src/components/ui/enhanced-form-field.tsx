import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface EnhancedFormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'autoSave'> {
  label?: string;
  description?: string;
  error?: string;
  success?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  showPasswordToggle?: boolean;
  characterLimit?: number;
  autoSave?: boolean;
  onAutoSave?: (value: string) => void;
  validationRules?: ((value: string) => string | null)[];
  realTimeValidation?: boolean;
}

export const EnhancedFormField = React.forwardRef<HTMLInputElement, EnhancedFormFieldProps>(
  ({
    className,
    type = 'text',
    label,
    description,
    error,
    success,
    icon: Icon,
    tooltip,
    showPasswordToggle = false,
    characterLimit,
    autoSave = false,
    onAutoSave,
    validationRules = [],
    realTimeValidation = false,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentError, setCurrentError] = useState(error);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const autoSaveTimeout = useRef<NodeJS.Timeout>();
    const inputRef = useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => inputRef.current!);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;
    const hasError = !!currentError;
    const charCount = props.value?.toString().length || 0;
    const isOverLimit = characterLimit ? charCount > characterLimit : false;

    // Real-time validation
    const validateInput = (value: string) => {
      if (!realTimeValidation || validationRules.length === 0) return;
      
      for (const rule of validationRules) {
        const error = rule(value);
        if (error) {
          setCurrentError(error);
          return;
        }
      }
      setCurrentError(null);
    };

    // Auto-save functionality
    const handleAutoSave = (value: string) => {
      if (!autoSave || !onAutoSave) return;
      
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }

      autoSaveTimeout.current = setTimeout(() => {
        setIsSaving(true);
        onAutoSave(value);
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
        }, 500);
      }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      if (characterLimit && value.length > characterLimit) {
        return; // Prevent input beyond limit
      }
      
      validateInput(value);
      handleAutoSave(value);
      props.onChange?.(e);
    };

    useEffect(() => {
      setCurrentError(error);
    }, [error]);

    const getInputClasses = () => {
      const baseClasses = "input-enhanced";
      const stateClasses = hasError ? "input-error" : success ? "input-success" : "";
      const iconPadding = Icon ? "pl-12" : "";
      const passwordTogglePadding = showPasswordToggle ? "pr-12" : "";
      
      return cn(baseClasses, stateClasses, iconPadding, passwordTogglePadding, className);
    };

    const getCharacterCountClasses = () => {
      if (isOverLimit) return "character-counter error";
      if (characterLimit && charCount > characterLimit * 0.8) return "character-counter warning";
      return "character-counter";
    };

    return (
      <div className="form-group">
        {/* Label with optional tooltip */}
        {label && (
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={props.id} className="block text-sm font-medium text-foreground">
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </label>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Leading icon */}
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-200" />
          )}

          {/* Input field */}
          <input
            ref={inputRef}
            type={inputType}
            className={getInputClasses()}
            onChange={handleChange}
            {...props}
          />

          {/* Trailing icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Validation status */}
            {hasError && (
              <AlertCircle className="w-4 h-4 text-destructive" />
            )}
            {success && !hasError && (
              <CheckCircle className="w-4 h-4 text-success" />
            )}

            {/* Password toggle */}
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-1 space-y-1">
          {/* Description */}
          {description && !currentError && (
            <p className="form-description">{description}</p>
          )}

          {/* Error message */}
          {currentError && (
            <p className="form-error">
              <AlertCircle className="w-3 h-3" />
              {currentError}
            </p>
          )}

          {/* Character count and auto-save status */}
          <div className="flex justify-between items-center">
            {characterLimit && (
              <div className={getCharacterCountClasses()}>
                <span>{charCount}/{characterLimit}</span>
              </div>
            )}

            {autoSave && (
              <div className={`autosave-indicator ${isSaving ? 'saving' : lastSaved ? 'saved' : ''}`}>
                {isSaving ? (
                  <>
                    <div className="form-spinner" />
                    <span>Сохранение...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    <span>Сохранено {lastSaved.toLocaleTimeString()}</span>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

EnhancedFormField.displayName = "EnhancedFormField";