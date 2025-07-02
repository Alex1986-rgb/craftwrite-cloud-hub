import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface ModernSelectProps {
  options: SelectOption[];
  value?: string | string[];
  onValueChange: (value: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  success?: boolean;
  className?: string;
  maxSelected?: number;
}

export const ModernSelect = React.forwardRef<HTMLButtonElement, ModernSelectProps>(
  ({
    options,
    value,
    onValueChange,
    placeholder = "Выберите опцию...",
    searchPlaceholder = "Поиск...",
    emptyMessage = "Ничего не найдено",
    multiple = false,
    searchable = true,
    clearable = false,
    disabled = false,
    label,
    description,
    error,
    success,
    className,
    maxSelected,
    ...props
  }, ref) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    const selectedValues = multiple 
      ? (Array.isArray(value) ? value : [])
      : (value ? [value] : []);

    const filteredOptions = searchable && searchQuery
      ? options.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const isSelected = currentValues.includes(optionValue);
        
        let newValues: string[];
        if (isSelected) {
          newValues = currentValues.filter(v => v !== optionValue);
        } else {
          if (maxSelected && currentValues.length >= maxSelected) {
            return; // Don't add if max reached
          }
          newValues = [...currentValues, optionValue];
        }
        
        onValueChange(newValues);
      } else {
        onValueChange(optionValue);
        setOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onValueChange(multiple ? [] : "");
    };

    const getDisplayText = () => {
      if (selectedValues.length === 0) return placeholder;
      
      if (multiple) {
        if (selectedValues.length === 1) {
          return options.find(opt => opt.value === selectedValues[0])?.label || selectedValues[0];
        }
        return `Выбрано: ${selectedValues.length}`;
      }
      
      return options.find(opt => opt.value === selectedValues[0])?.label || selectedValues[0];
    };

    const hasError = !!error;
    const hasValue = selectedValues.length > 0;

    const getTriggerClasses = () => {
      const baseClasses = "select-modern select-trigger";
      const stateClasses = hasError ? "input-error" : success ? "input-success" : "";
      const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
      
      return cn(baseClasses, stateClasses, disabledClasses, className);
    };

    return (
      <div className="form-group">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              type="button"
              disabled={disabled}
              className={getTriggerClasses()}
              {...props}
            >
              <span className={cn(
                "flex-1 text-left truncate",
                !hasValue && "text-muted-foreground"
              )}>
                {getDisplayText()}
              </span>
              
              <div className="flex items-center gap-2">
                {clearable && hasValue && !disabled && (
                  <X 
                    className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" 
                    onClick={handleClear}
                  />
                )}
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  open && "rotate-180"
                )} />
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent 
            className="w-full p-0 border border-border bg-popover backdrop-blur-sm" 
            align="start"
          >
            <Command>
              {searchable && (
                <div className="border-b border-border">
                  <div className="flex items-center px-3">
                    <Search className="w-4 h-4 text-muted-foreground mr-2" />
                    <CommandInput
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      className="flex-1 py-3 bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              <CommandList className="max-h-60">
                <CommandEmpty className="px-4 py-3 text-sm text-muted-foreground text-center">
                  {emptyMessage}
                </CommandEmpty>
                
                <CommandGroup>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isDisabled = option.disabled || 
                      (multiple && maxSelected && !isSelected && selectedValues.length >= maxSelected);
                    
                    return (
                      <CommandItem
                        key={`option-${option.value}`}
                        value={option.value}
                        disabled={isDisabled}
                        onSelect={() => !isDisabled && handleSelect(option.value)}
                        className={cn(
                          "flex items-center px-4 py-3 cursor-pointer text-sm",
                          "hover:bg-muted/50 focus:bg-muted/50",
                          isSelected && "bg-muted/70",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {option.description}
                            </div>
                          )}
                        </div>
                        
                        {isSelected && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Bottom section */}
        <div className="mt-1 space-y-1">
          {/* Description */}
          {description && !error && (
            <p className="form-description">{description}</p>
          )}

          {/* Error message */}
          {error && (
            <p className="form-error">
              <span className="w-3 h-3">⚠</span>
              {error}
            </p>
          )}

          {/* Selected items (for multiple) */}
          {multiple && selectedValues.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedValues.map((val: string) => {
                const option = options.find(opt => opt.value === val);
                return (
                   <div
                     key={`selected-${val}`}
                     className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                   >
                     <span>{option?.label || val}</span>
                     <button
                       type="button"
                       onClick={() => handleSelect(val)}
                       className="hover:text-primary/70"
                     >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ModernSelect.displayName = "ModernSelect";