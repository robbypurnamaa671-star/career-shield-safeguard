import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  isPremium?: boolean;
  isLocked?: boolean;
  stats?: {
    label: string;
    value: string | number;
  };
  className?: string;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  href,
  isPremium = false,
  isLocked = false,
  stats,
  className,
}: FeatureCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        'group block card-elevated p-5 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1',
        isLocked && 'opacity-75',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          isPremium ? 'gradient-premium' : 'bg-primary/10'
        )}>
          <span className={isPremium ? 'text-premium-foreground' : 'text-primary'}>
            {icon}
          </span>
        </div>
        {isPremium && (
          <span className="premium-badge px-2 py-1 rounded-full text-xs flex items-center gap-1">
            {isLocked ? <Lock className="w-3 h-3" /> : null}
            Premium
          </span>
        )}
      </div>

      <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      {stats && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">{stats.label}</span>
          <span className="text-sm font-semibold text-foreground">{stats.value}</span>
        </div>
      )}

      <div className="flex items-center gap-1 text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all">
        <span>{isLocked ? 'Unlock' : 'Start Assessment'}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};
