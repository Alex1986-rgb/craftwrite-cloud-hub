import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, X, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface SmartInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  allowCustom?: boolean;
  onSearch?: (query: string) => Promise<string[]>;
  maxSuggestions?: number;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  showSearchIcon?: boolean;
  clearable?: boolean;
  debounceMs?: number;
}

export const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
  ({
    className,
    value,
    onChange,
    suggestions = [],
    allowCustom = true,
    onSearch,
    maxSuggestions = 10,
    placeholder,
    icon: Icon,
    showSearchIcon = false,
    clearable = false,
    debounceMs = 300,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(suggestions);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const debounceTimeout = useRef<NodeJS.Timeout>();
    const inputRef = useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Debounced search
    const debouncedSearch = (query: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (onSearch && query.length > 0) {
          setIsLoading(true);
          try {
            const results = await onSearch(query);
            setCurrentSuggestions(results.slice(0, maxSuggestions));
          } catch (error) {
            console.error('Search error:', error);
            setCurrentSuggestions([]);
          }
          setIsLoading(false);
        } else {
          // Filter local suggestions
          const filtered = suggestions.filter(s => 
            s.toLowerCase().includes(query.toLowerCase())
          ).slice(0, maxSuggestions);
          setCurrentSuggestions(filtered);
        }
      }, debounceMs);
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      
      if (newValue.length > 0) {
        debouncedSearch(newValue);
        setIsOpen(true);
      } else {
        setCurrentSuggestions(suggestions);
        setIsOpen(false);
      }
      setHighlightedIndex(-1);
    };

    // Handle suggestion selection
    const handleSuggestionSelect = (suggestion: string) => {
      onChange(suggestion);
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen || currentSuggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < currentSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : currentSuggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSuggestionSelect(currentSuggestions[highlightedIndex]);
          } else if (allowCustom) {
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    // Clear input
    const handleClear = () => {
      onChange('');
      setIsOpen(false);
      inputRef.current?.focus();
    };

    // Update suggestions when prop changes
    useEffect(() => {
      setCurrentSuggestions(suggestions);
    }, [suggestions]);

    const showDropdownIndicator = currentSuggestions.length > 0 || isLoading;

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            {/* Leading icon */}
            {(Icon || showSearchIcon) && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                {Icon ? (
                  <Icon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Search className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            )}

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (value.length > 0 || currentSuggestions.length > 0) {
                  setIsOpen(true);
                }
              }}
              placeholder={placeholder}
              className={cn(
                "input-enhanced",
                (Icon || showSearchIcon) && "pl-12",
                (clearable || showDropdownIndicator) && "pr-12",
                className
              )}
              {...props}
            />

            {/* Trailing icons */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isLoading && (
                <div className="form-spinner" />
              )}
              
              {clearable && value && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {showDropdownIndicator && !isLoading && (
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )} />
              )}
            </div>
          </div>
        </PopoverTrigger>

        {/* Suggestions dropdown */}
        <PopoverContent 
          className="w-full p-0 border border-border bg-popover backdrop-blur-sm" 
          align="start"
          sideOffset={4}
        >
          {currentSuggestions.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {currentSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors",
                    "focus:outline-none focus:bg-muted/50",
                    highlightedIndex === index && "bg-muted/70"
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              {isLoading ? 'Поиск...' : 'Ничего не найдено'}
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

SmartInput.displayName = "SmartInput";