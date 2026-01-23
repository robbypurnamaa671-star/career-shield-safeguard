import { ReactNode } from 'react';
import { Lock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LockedFeatureProps {
  children: ReactNode;
  title: string;
  isLocked: boolean;
}

export const LockedFeature = ({ children, title, isLocked }: LockedFeatureProps) => {
  const navigate = useNavigate();

  if (!isLocked) {
    return <div className="card-elevated p-6">{children}</div>;
  }

  return (
    <div className="card-elevated p-6 relative overflow-hidden">
      {/* Blurred Content Preview */}
      <div className="pointer-events-none select-none filter blur-sm opacity-50">
        {children}
      </div>
      
      {/* Lock Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center p-6 max-w-sm">
          <div className="w-16 h-16 rounded-full gradient-premium flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-premium-foreground" />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Unlock this premium feature to access advanced insights and detailed analysis
          </p>
          <Button 
            onClick={() => navigate('/premium')}
            className="gradient-premium text-premium-foreground hover:opacity-90"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </div>
  );
};
