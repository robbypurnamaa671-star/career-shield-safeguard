import { useState } from 'react';
import { AlertTriangle, ArrowRight, RotateCcw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/AssessmentForm';
import { RiskBadge } from '@/components/RiskBadge';
import { ProgressRing } from '@/components/ProgressRing';
import { InsightCard } from '@/components/InsightCard';
import { 
  industries, 
  contractTypes, 
  experienceLevels, 
  automationExposureLevels,
  calculateJobRisk 
} from '@/lib/assessments';
import { saveJobRiskAssessment, type JobRiskAssessment } from '@/lib/storage';

const JobRiskAnalyzer = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState({
    industry: '',
    jobRole: '',
    contractType: '',
    experienceLevel: '',
    location: '',
    automationExposure: '',
  });
  const [result, setResult] = useState<JobRiskAssessment | null>(null);

  const isFormValid = Object.values(formData).every(v => v !== '');

  const handleSubmit = () => {
    if (!isFormValid) return;

    const { riskLevel, riskScore, insights } = calculateJobRisk(
      formData.industry,
      formData.contractType,
      formData.experienceLevel,
      formData.automationExposure
    );

    const assessment = saveJobRiskAssessment({
      ...formData,
      riskLevel,
      riskScore,
      insights,
    });

    setResult(assessment);
    setStep('result');
  };

  const handleReset = () => {
    setFormData({
      industry: '',
      jobRole: '',
      contractType: '',
      experienceLevel: '',
      location: '',
      automationExposure: '',
    });
    setResult(null);
    setStep('form');
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Job Risk Analyzer</h1>
          <p className="text-muted-foreground text-sm">Evaluate your job security factors</p>
        </div>
      </div>

      {step === 'form' ? (
        <>
          {/* Disclaimer */}
          <InsightCard type="info">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                This tool provides <strong>educational insights only</strong>. Results are based on 
                general patterns and do not predict actual job outcomes.
              </span>
            </div>
          </InsightCard>

          {/* Form */}
          <div className="card-elevated p-6 space-y-6">
            <SelectField
              label="Industry"
              description="Select the industry you work in or plan to work in"
              options={industries}
              value={formData.industry}
              onChange={(v) => setFormData(prev => ({ ...prev, industry: v }))}
              placeholder="Choose your industry"
            />

            <div>
              <label className="block font-medium text-foreground mb-2">Job Role</label>
              <input
                type="text"
                value={formData.jobRole}
                onChange={(e) => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                placeholder="e.g., Software Engineer, Accountant, Marketing Manager"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <SelectField
              label="Contract Type"
              description="What type of employment contract do you have?"
              options={contractTypes}
              value={formData.contractType}
              onChange={(v) => setFormData(prev => ({ ...prev, contractType: v }))}
              placeholder="Select contract type"
            />

            <SelectField
              label="Experience Level"
              options={experienceLevels}
              value={formData.experienceLevel}
              onChange={(v) => setFormData(prev => ({ ...prev, experienceLevel: v }))}
              placeholder="Select your experience level"
            />

            <div>
              <label className="block font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., New York, Remote, London"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <SelectField
              label="Task Automation Exposure"
              description="How would you describe the nature of your daily tasks?"
              options={automationExposureLevels}
              value={formData.automationExposure}
              onChange={(v) => setFormData(prev => ({ ...prev, automationExposure: v }))}
              placeholder="Select task type"
            />

            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full h-12 text-base font-semibold"
            >
              Analyze My Risk
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </>
      ) : result && (
        <div className="space-y-6 animate-slide-up">
          {/* Result Card */}
          <div className="card-elevated p-6">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your Risk Assessment</p>
              <RiskBadge level={result.riskLevel} size="lg" />
            </div>

            <div className="flex justify-center mb-6">
              <ProgressRing 
                value={result.riskScore} 
                size={140}
                strokeWidth={10}
                color={getRiskColor(result.riskLevel)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-xs">Industry</p>
                <p className="font-medium text-foreground">{result.industry}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-xs">Role</p>
                <p className="font-medium text-foreground">{result.jobRole}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-xs">Contract</p>
                <p className="font-medium text-foreground">{result.contractType}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-muted-foreground text-xs">Experience</p>
                <p className="font-medium text-foreground">{result.experienceLevel}</p>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg text-foreground">Key Insights</h3>
            {result.insights.map((insight, index) => (
              <InsightCard 
                key={index} 
                type={result.riskLevel === 'low' ? 'success' : result.riskLevel === 'medium' ? 'warning' : 'warning'}
              >
                {insight}
              </InsightCard>
            ))}
          </div>

          {/* Disclaimer */}
          <InsightCard type="info" title="Important Notice">
            This assessment is for educational purposes only and should not be considered 
            as professional career advice. Job market conditions vary by location, timing, 
            and individual circumstances.
          </InsightCard>

          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full h-12"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Assessment
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobRiskAnalyzer;
