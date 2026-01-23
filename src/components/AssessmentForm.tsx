import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormFieldProps {
  label: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FormField = ({ label, description, children, className }: FormFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block font-medium text-foreground">{label}</label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  description?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SelectField = ({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className,
}: SelectFieldProps) => {
  return (
    <FormField label={label} description={description} className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 px-4 text-base">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option} className="text-base py-3">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
};

interface CheckboxGroupProps {
  label: string;
  description?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelect?: number;
  className?: string;
}

export const CheckboxGroup = ({
  label,
  description,
  options,
  selected,
  onChange,
  maxSelect,
  className,
}: CheckboxGroupProps) => {
  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else if (!maxSelect || selected.length < maxSelect) {
      onChange([...selected, option]);
    }
  };

  return (
    <FormField label={label} description={description} className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
              selected.includes(option)
                ? 'border-primary bg-primary/5'
                : 'border-input hover:border-primary/50'
            )}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">{option}</span>
          </label>
        ))}
      </div>
      {maxSelect && (
        <p className="text-xs text-muted-foreground mt-2">
          Select up to {maxSelect} options ({selected.length}/{maxSelect})
        </p>
      )}
    </FormField>
  );
};
