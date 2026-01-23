import { useState } from 'react';
import { Crown, Check, Lock, Sparkles, BarChart3, FileText, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InsightCard } from '@/components/InsightCard';
import { getAppData } from '@/lib/storage';
import { LockedFeature } from '@/components/premium/LockedFeature';
import { AdvancedAnalytics } from '@/components/premium/AdvancedAnalytics';
import { DetailedReports } from '@/components/premium/DetailedReports';
import { IndustryComparisons } from '@/components/premium/IndustryComparisons';
import { PriorityUpdates } from '@/components/premium/PriorityUpdates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const premiumFeatures = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed breakdowns, historical trends, and comparative insights',
    free: false,
    tab: 'analytics',
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Exportable PDF reports with comprehensive analysis',
    free: false,
    tab: 'reports',
  },
  {
    icon: Users,
    title: 'Industry Comparisons',
    description: 'Compare your profile against industry benchmarks',
    free: false,
    tab: 'comparisons',
  },
  {
    icon: Zap,
    title: 'Priority Updates',
    description: 'Early access to new features and assessment tools',
    free: false,
    tab: 'updates',
  },
  {
    icon: Sparkles,
    title: 'Basic Assessments',
    description: 'Job risk, skill gap, and AI exposure tools',
    free: true,
  },
  {
    icon: Crown,
    title: 'Career Planner',
    description: 'Generate personalized career roadmaps',
    free: true,
  },
];

const Premium = () => {
  const [appData] = useState(getAppData());
  const isPremium = appData?.profile?.isPremium ?? false;
  const [activeTab, setActiveTab] = useState('analytics');

  const handleUpgrade = () => {
    // In a real app, this would integrate with a payment processor
    alert('Payment integration would go here. For demo, premium can be simulated.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center">
          <Crown className="w-6 h-6 text-premium-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Premium</h1>
          <p className="text-muted-foreground text-sm">Unlock advanced career insights</p>
        </div>
      </div>

      {isPremium ? (
        <div className="card-elevated p-6 text-center">
          <div className="w-20 h-20 rounded-full gradient-premium flex items-center justify-center mx-auto mb-4">
            <Crown className="w-10 h-10 text-premium-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            You're a Premium Member!
          </h2>
          <p className="text-muted-foreground">
            Enjoy full access to all Career Shield features
          </p>
        </div>
      ) : (
        <>
          {/* Upgrade Card */}
          <div className="relative overflow-hidden rounded-2xl gradient-premium p-6 text-premium-foreground">
            <div className="relative z-10">
              <h2 className="font-display font-bold text-2xl mb-2">
                Unlock Your Full Potential
              </h2>
              <p className="text-premium-foreground/80 mb-6">
                Get advanced analytics, detailed reports, and industry comparisons 
                to make informed career decisions.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-premium-foreground/70">/month</span>
              </div>
              <Button 
                onClick={handleUpgrade}
                className="w-full bg-card text-foreground hover:bg-card/90 font-semibold h-12"
              >
                Upgrade to Premium
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>

          <InsightCard type="info">
            Premium unlocks advanced features but is not required to use Career Shield's 
            core assessment tools. All basic features remain free forever.
          </InsightCard>
        </>
      )}

      {/* Premium Features Tabs */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-xl text-foreground">
          Premium Features
        </h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 py-3 px-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col items-center gap-1 py-3 px-2">
              <FileText className="w-4 h-4" />
              <span className="text-xs">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="comparisons" className="flex flex-col items-center gap-1 py-3 px-2">
              <Users className="w-4 h-4" />
              <span className="text-xs">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex flex-col items-center gap-1 py-3 px-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Updates</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-4">
            <LockedFeature title="Advanced Analytics" isLocked={!isPremium}>
              <AdvancedAnalytics />
            </LockedFeature>
          </TabsContent>

          <TabsContent value="reports" className="mt-4">
            <LockedFeature title="Detailed Reports" isLocked={!isPremium}>
              <DetailedReports />
            </LockedFeature>
          </TabsContent>

          <TabsContent value="comparisons" className="mt-4">
            <LockedFeature title="Industry Comparisons" isLocked={!isPremium}>
              <IndustryComparisons />
            </LockedFeature>
          </TabsContent>

          <TabsContent value="updates" className="mt-4">
            <LockedFeature title="Priority Updates" isLocked={!isPremium}>
              <PriorityUpdates />
            </LockedFeature>
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Comparison */}
      <div className="card-elevated overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-display font-semibold text-lg text-foreground">
            Feature Comparison
          </h3>
        </div>
        <div className="divide-y divide-border">
          {premiumFeatures.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4 p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                feature.free ? 'bg-secondary/20' : 'bg-premium/10'
              }`}>
                <feature.icon className={`w-5 h-5 ${
                  feature.free ? 'text-secondary' : 'text-premium'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {feature.description}
                </p>
              </div>
              <div>
                {feature.free ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-risk-low">
                    <Check className="w-4 h-4" />
                    Free
                  </span>
                ) : isPremium ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-premium">
                    <Check className="w-4 h-4" />
                    Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Premium
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-lg text-foreground">
          Frequently Asked Questions
        </h3>
        
        <div className="card-elevated p-4">
          <h4 className="font-medium text-foreground mb-2">
            Can I try Premium features first?
          </h4>
          <p className="text-sm text-muted-foreground">
            All core assessment tools are free. Premium adds advanced analytics and 
            reporting features for users who want deeper insights.
          </p>
        </div>

        <div className="card-elevated p-4">
          <h4 className="font-medium text-foreground mb-2">
            Is my data safe?
          </h4>
          <p className="text-sm text-muted-foreground">
            Yes! All data is stored locally on your device. We don't collect or 
            transmit any personal information.
          </p>
        </div>

        <div className="card-elevated p-4">
          <h4 className="font-medium text-foreground mb-2">
            Can I cancel anytime?
          </h4>
          <p className="text-sm text-muted-foreground">
            Yes, you can cancel your subscription at any time. You'll retain access 
            until the end of your billing period.
          </p>
        </div>
      </div>

      <InsightCard type="tip">
        Career Shield is an educational tool. Premium features provide additional 
        analytical capabilities but do not guarantee career outcomes.
      </InsightCard>
    </div>
  );
};

export default Premium;
