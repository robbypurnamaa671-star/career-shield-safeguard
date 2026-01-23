import { Zap, Star, Clock, Bell, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const upcomingFeatures = [
  {
    id: 1,
    title: 'AI Interview Coach',
    description: 'Practice interviews with AI-powered feedback and scoring',
    status: 'coming-soon',
    eta: 'Feb 2026',
  },
  {
    id: 2,
    title: 'Salary Benchmarking',
    description: 'Compare your compensation against market data',
    status: 'in-development',
    eta: 'Mar 2026',
  },
  {
    id: 3,
    title: 'Networking Insights',
    description: 'Identify key connections and relationship opportunities',
    status: 'planned',
    eta: 'Q2 2026',
  },
  {
    id: 4,
    title: 'Industry News Feed',
    description: 'Curated news and trends for your career focus',
    status: 'in-development',
    eta: 'Feb 2026',
  },
];

const recentUpdates = [
  {
    date: 'Jan 20, 2026',
    title: 'Enhanced Skill Gap Analysis',
    description: 'New algorithm provides more accurate skill gap identification',
  },
  {
    date: 'Jan 15, 2026',
    title: 'PDF Export Improvements',
    description: 'Better formatting and more detailed charts in exported reports',
  },
  {
    date: 'Jan 10, 2026',
    title: 'Mobile Experience Update',
    description: 'Improved touch interactions and responsive layouts',
  },
];

const betaFeatures = [
  { name: 'AI Career Coach Chat', active: true },
  { name: 'Real-time Market Alerts', active: true },
  { name: 'Custom Dashboard Widgets', active: false },
];

export const PriorityUpdates = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'coming-soon':
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Coming Soon</Badge>;
      case 'in-development':
        return <Badge variant="secondary" className="bg-secondary/10 text-secondary">In Development</Badge>;
      case 'planned':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Planned</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Priority Updates</h3>
          <p className="text-sm text-muted-foreground">Early access to new features and tools</p>
        </div>
      </div>

      {/* Beta Access Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 text-primary-foreground">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5" />
          <h4 className="font-semibold">Premium Beta Access</h4>
        </div>
        <p className="text-sm opacity-90 mb-4">
          You have early access to beta features before they're released to all users
        </p>
        <div className="flex flex-wrap gap-2">
          {betaFeatures.map((feature) => (
            <div 
              key={feature.name}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                feature.active 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {feature.active ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {feature.name}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Features */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-4">Upcoming Features</h4>
        <div className="space-y-4">
          {upcomingFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="flex items-start justify-between p-3 bg-background rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-foreground">{feature.title}</h5>
                  {getStatusBadge(feature.status)}
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 ml-4">
                <Clock className="w-3 h-3" />
                {feature.eta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-muted/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Recent Updates</h4>
          <Button variant="ghost" size="sm" className="text-xs">
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="space-y-4">
          {recentUpdates.map((update, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">{update.date}</p>
                <h5 className="font-medium text-foreground text-sm">{update.title}</h5>
                <p className="text-sm text-muted-foreground">{update.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-muted/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-primary" />
          <h4 className="font-medium text-foreground">Update Notifications</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Get notified when new features are available for you
        </p>
        <Button variant="outline" className="w-full">
          Manage Notification Settings
        </Button>
      </div>
    </div>
  );
};
