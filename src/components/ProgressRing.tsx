import { cn } from '@/lib/utils';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'risk-low' | 'risk-medium' | 'risk-high';
}

export const ProgressRing = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true,
  color = 'primary',
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(value / max, 1);
  const offset = circumference - percent * circumference;

  const colorClasses = {
    primary: 'stroke-primary',
    secondary: 'stroke-secondary',
    'risk-low': 'stroke-risk-low',
    'risk-medium': 'stroke-risk-medium',
    'risk-high': 'stroke-risk-high',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colorClasses[color], 'transition-all duration-700 ease-out')}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold font-display text-foreground">
            {Math.round(value)}
          </span>
        </div>
      )}
    </div>
  );
};
