import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'transition-colors cursor-pointer'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
