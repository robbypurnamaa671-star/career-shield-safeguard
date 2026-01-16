import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const RiskBadge = ({ level, size = 'md', showIcon = true, className }: RiskBadgeProps) => {
  const icons = {
    low: CheckCircle,
    medium: AlertCircle,
    high: AlertTriangle,
  };

  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  };

  const Icon = icons[level];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        level === 'low' && 'risk-badge-low',
        level === 'medium' && 'risk-badge-medium',
        level === 'high' && 'risk-badge-high',
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {labels[level]}
    </span>
  );
};
