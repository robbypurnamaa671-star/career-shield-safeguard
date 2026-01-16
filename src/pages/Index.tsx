import { useEffect, useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  Bot, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { InsightCard } from '@/components/InsightCard';
import { getAppData, initializeProfile, type AppData } from '@/lib/storage';

const Dashboard = () => {
  const [appData, setAppData] = useState<AppData | null>(null);

  useEffect(() => {
    initializeProfile();
    setAppData(getAppData());
  }, []);

  const totalAssessments = appData
    ? appData.jobRiskAssessments.length +
      appData.skillGapAssessments.length +
      appData.aiExposureAssessments.length
    : 0;

  const latestRisk = appData?.jobRiskAssessments[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl gradient-hero p-6 md:p-8 text-primary-foreground">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl">Career Shield</h1>
              <p className="text-primary-foreground/80 text-sm">Job Security & AI Survival Planner</p>
            </div>
          </div>
          <p className="text-primary-foreground/90 max-w-lg text-sm md:text-base mb-6">
            Understand your career resilience with educational self-assessment tools. 
            Analyze job risks, identify skill gaps, and plan your career growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">{totalAssessments} Assessments</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Offline Ready</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
      </section>

      {/* Quick Stats */}
      {latestRisk && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-elevated p-4">
            <p className="text-xs text-muted-foreground mb-1">Latest Risk Level</p>
            <p className={`text-lg font-bold capitalize ${
              latestRisk.riskLevel === 'low' ? 'text-risk-low' :
              latestRisk.riskLevel === 'medium' ? 'text-risk-medium' : 'text-risk-high'
            }`}>
              {latestRisk.riskLevel}
            </p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
            <p className="text-lg font-bold text-foreground">{latestRisk.riskScore}/100</p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-xs text-muted-foreground mb-1">Industry</p>
            <p className="text-sm font-medium text-foreground truncate">{latestRisk.industry}</p>
          </div>
          <div className="card-elevated p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Checks</p>
            <p className="text-lg font-bold text-foreground">{totalAssessments}</p>
          </div>
        </section>
      )}

      {/* Assessment Tools */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl text-foreground">Assessment Tools</h2>
          <TrendingUp className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            title="Job Risk Analyzer"
            description="Evaluate potential job security based on industry, role, and automation exposure."
            icon={<AlertTriangle className="w-6 h-6" />}
            href="/job-risk"
            stats={appData?.jobRiskAssessments.length ? {
              label: 'Assessments',
              value: appData.jobRiskAssessments.length
            } : undefined}
          />
          <FeatureCard
            title="Skill Gap Checker"
            description="Compare your current skills with future-relevant competencies."
            icon={<Zap className="w-6 h-6" />}
            href="/skill-gap"
            stats={appData?.skillGapAssessments.length ? {
              label: 'Assessments',
              value: appData.skillGapAssessments.length
            } : undefined}
          />
          <FeatureCard
            title="AI Exposure Tool"
            description="Understand how AI and automation might impact your role."
            icon={<Bot className="w-6 h-6" />}
            href="/ai-exposure"
            stats={appData?.aiExposureAssessments.length ? {
              label: 'Assessments',
              value: appData.aiExposureAssessments.length
            } : undefined}
          />
          <FeatureCard
            title="Career Survival Planner"
            description="Create personalized short, mid, and long-term career plans."
            icon={<Target className="w-6 h-6" />}
            href="/career-plan"
            stats={appData?.careerPlans.length ? {
              label: 'Plans Created',
              value: appData.careerPlans.length
            } : undefined}
          />
        </div>
      </section>

      {/* Educational Insights */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-foreground">Quick Insights</h2>
        <InsightCard type="info" title="Educational Purpose">
          Career Shield provides informational assessments only. Results are based on general 
          industry data and should not be used as professional career advice.
        </InsightCard>
        <InsightCard type="tip" title="Pro Tip">
          Regular self-assessment helps you stay aware of changing career landscapes. 
          Consider checking your risk profile quarterly as markets evolve.
        </InsightCard>
      </section>
    </div>
  );
};

export default Dashboard;
