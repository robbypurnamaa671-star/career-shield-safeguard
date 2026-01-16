import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface InsightCardProps {
  type: 'tip' | 'warning' | 'success' | 'info';
  title?: string;
  children: ReactNode;
  className?: string;
}

export const InsightCard = ({ type, title, children, className }: InsightCardProps) => {
  const config = {
    tip: {
      icon: Lightbulb,
      bgClass: 'bg-accent',
      iconClass: 'text-accent-foreground',
      borderClass: 'border-l-secondary',
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-risk-medium-bg',
      iconClass: 'text-risk-medium',
      borderClass: 'border-l-risk-medium',
    },
    success: {
      icon: CheckCircle,
      bgClass: 'bg-risk-low-bg',
      iconClass: 'text-risk-low',
      borderClass: 'border-l-risk-low',
    },
    info: {
      icon: Info,
      bgClass: 'bg-muted',
      iconClass: 'text-muted-foreground',
      borderClass: 'border-l-primary',
    },
  };

  const { icon: Icon, bgClass, iconClass, borderClass } = config[type];

  return (
    <div
      className={cn(
        'rounded-lg p-4 border-l-4',
        bgClass,
        borderClass,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconClass)} />
        <div>
          {title && (
            <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          )}
          <div className="text-sm text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
};
