import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ProgressiveTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'autoSave'> {
  label?: string;
  description?: string;
  error?: string;
  success?: boolean;
  characterLimit?: number;
  showWordCount?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  autoSave?: boolean;
  onAutoSave?: (value: string) => void;
}

export const ProgressiveTextarea = React.forwardRef<HTMLTextAreaElement, ProgressiveTextareaProps>(
  ({
    className,
    label,
    description,
    error,
    success,
    characterLimit,
    showWordCount = false,
    autoResize = true,
    minRows = 3,
    maxRows = 12,
    suggestions = [],
    onSuggestionSelect,
    autoSave = false,
    onAutoSave,
    ...props
  }, ref) => {
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoSaveTimeout = useRef<NodeJS.Timeout>();
    
    React.useImperativeHandle(ref, () => textareaRef.current!);

    const value = props.value || props.defaultValue || '';
    const charCount = value.toString().length;
    const wordCount = value.toString().trim().split(/\s+/).filter(word => word.length > 0).length;
    const isOverLimit = characterLimit ? charCount > characterLimit : false;
    const hasError = !!error;

    // Auto-resize functionality
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
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

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      if (characterLimit && newValue.length > characterLimit) {
        return; // Prevent input beyond limit
      }
      
      adjustHeight();
      handleAutoSave(newValue);
      props.onChange?.(e);
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion: string) => {
      if (onSuggestionSelect) {
        onSuggestionSelect(suggestion);
      } else if (props.onChange) {
        const syntheticEvent = {
          target: { value: suggestion }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        props.onChange(syntheticEvent);
      }
      setShowSuggestions(false);
    };

    // Adjust height on mount and value change
    useEffect(() => {
      adjustHeight();
    }, [value, autoResize, minRows, maxRows]);

    const getTextareaClasses = () => {
      const baseClasses = "textarea-progressive";
      const stateClasses = hasError ? "input-error" : success ? "input-success" : "";
      return cn(baseClasses, stateClasses, className);
    };

    const getCharacterCountClasses = () => {
      if (isOverLimit) return "character-counter error";
      if (characterLimit && charCount > characterLimit * 0.8) return "character-counter warning";
      return "character-counter";
    };

    return (
      <div className="form-group">
        {/* Label */}
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        {/* Textarea container */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            className={getTextareaClasses()}
            onChange={handleChange}
            style={autoResize ? { resize: 'none', overflow: 'hidden' } : undefined}
            {...props}
          />

          {/* Validation icon */}
          {(hasError || success) && (
            <div className="absolute top-3 right-3">
              {hasError && <AlertCircle className="w-4 h-4 text-destructive" />}
              {success && !hasError && <CheckCircle className="w-4 h-4 text-success" />}
            </div>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {showSuggestions ? 'Скрыть подсказки' : 'Показать подсказки'}
            </button>
            
            {showSuggestions && (
              <div className="mt-2 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left text-xs text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50 rounded px-2 py-1 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom section */}
        <div className="mt-1 space-y-1">
          {/* Description */}
          {description && !error && (
            <p className="form-description">{description}</p>
          )}

          {/* Error message */}
          {error && (
            <p className="form-error">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}

          {/* Stats and auto-save */}
          <div className="flex justify-between items-center">
            {/* Character/word count */}
            <div className={getCharacterCountClasses()}>
              <span>
                {showWordCount ? `${wordCount} слов` : `${charCount}`}
                {characterLimit && ` / ${characterLimit}`}
              </span>
            </div>

            {/* Auto-save status */}
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

ProgressiveTextarea.displayName = "ProgressiveTextarea";