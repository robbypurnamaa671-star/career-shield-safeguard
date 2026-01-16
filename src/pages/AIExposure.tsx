import { useState } from 'react';
import { Bot, ArrowRight, RotateCcw, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ProgressRing';
import { RiskBadge } from '@/components/RiskBadge';
import { InsightCard } from '@/components/InsightCard';
import { ShareButton } from '@/components/ShareButton';
import { calculateAIExposure, humanCentricSkills } from '@/lib/assessments';
import { saveAIExposureAssessment, type AIExposureAssessment } from '@/lib/storage';
import { generateAIExposureShareText } from '@/lib/share';

const taskOptions = [
  'Data entry and processing',
  'Customer service inquiries',
  'Document processing',
  'Scheduling and coordination',
  'Basic reporting and analysis',
  'Transcription and translation',
  'Content moderation',
  'Inventory management',
  'Strategy development',
  'Complex problem solving',
  'Leadership and team management',
  'Relationship building',
  'Innovation and creativity',
  'Mentoring and coaching',
  'Crisis management',
  'Negotiations',
  'Ethical decision making',
  'Creative design and ideation',
];

const AIExposure = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [jobRole, setJobRole] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [result, setResult] = useState<AIExposureAssessment | null>(null);

  const handleAnalyze = () => {
    if (!jobRole || selectedTasks.length === 0) return;

    const { exposureScore, exposureLevel, reasons, recommendations } = calculateAIExposure(
      jobRole,
      selectedTasks
    );

    const assessment = saveAIExposureAssessment({
      jobRole,
      exposureScore,
      exposureLevel,
      reasons,
      humanCentricSkills: humanCentricSkills.slice(0, 5),
    });

    setResult(assessment);
    setStep('result');
  };

  const handleReset = () => {
    setJobRole('');
    setSelectedTasks([]);
    setResult(null);
    setStep('form');
  };

  const getExposureColor = (level: 'low' | 'medium' | 'high') => {
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
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">AI Exposure Tool</h1>
          <p className="text-muted-foreground text-sm">Understand automation impact on your role</p>
        </div>
      </div>

      {step === 'form' ? (
        <div className="space-y-6">
          <InsightCard type="info">
            This tool estimates how tasks in your role might be affected by AI and automation. 
            The goal is education, not prediction – technology adoption varies greatly by organization.
          </InsightCard>

          <div className="card-elevated p-6 space-y-6">
            <div>
              <label className="block font-medium text-foreground mb-2">Your Job Role</label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g., Marketing Manager, Software Developer, Accountant"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block font-medium text-foreground mb-2">
                Daily Tasks & Responsibilities
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                Select tasks that represent your typical work activities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {taskOptions.map(task => (
                  <label
                    key={task}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTasks.includes(task)
                        ? 'border-primary bg-primary/5'
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task)}
                      onChange={() => {
                        if (selectedTasks.includes(task)) {
                          setSelectedTasks(selectedTasks.filter(t => t !== task));
                        } else {
                          setSelectedTasks([...selectedTasks, task]);
                        }
                      }}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{task}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={!jobRole || selectedTasks.length === 0}
              className="w-full h-12 text-base font-semibold"
            >
              Analyze AI Exposure
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      ) : result && (
        <div className="space-y-6 animate-slide-up">
          {/* Result Card */}
          <div className="card-elevated p-6">
            <div className="flex justify-end mb-2">
              <ShareButton 
                shareText={generateAIExposureShareText(
                  result.exposureLevel,
                  result.exposureScore,
                  result.jobRole
                )}
                title="My AI Exposure Assessment"
                variant="icon"
              />
            </div>
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">AI Automation Exposure</p>
              <RiskBadge level={result.exposureLevel} size="lg" />
            </div>

            <div className="flex justify-center mb-6">
              <ProgressRing 
                value={result.exposureScore} 
                size={140}
                strokeWidth={10}
                color={getExposureColor(result.exposureLevel)}
              />
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Role Analyzed</p>
              <p className="font-semibold text-foreground text-lg">{result.jobRole}</p>
            </div>
          </div>

          {/* Analysis Insights */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg text-foreground">Analysis Insights</h3>
            {result.reasons.map((reason, index) => (
              <InsightCard 
                key={index} 
                type={result.exposureLevel === 'low' ? 'success' : 'info'}
              >
                {reason}
              </InsightCard>
            ))}
          </div>

          {/* Human-Centric Skills */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-semibold text-lg text-foreground">
                Human-Centric Skills to Develop
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These skills are harder to automate and increase your career resilience
            </p>
            <div className="space-y-2">
              {result.humanCentricSkills.map((skill, index) => (
                <div key={skill} className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <InsightCard type="tip" title="Staying Ahead">
            Rather than fearing AI, consider how you can work alongside it. 
            Learning to use AI tools effectively can make you more valuable, 
            not less. Focus on skills that complement technology.
          </InsightCard>

          <InsightCard type="info" title="Educational Note">
            AI capabilities and adoption rates vary significantly across industries 
            and organizations. This assessment provides general guidance based on 
            task characteristics, not specific predictions.
          </InsightCard>

          <div className="flex gap-3">
            <ShareButton 
              shareText={generateAIExposureShareText(
                result.exposureLevel,
                result.exposureScore,
                result.jobRole
              )}
              title="My AI Exposure Assessment"
              variant="full"
              className="flex-1"
            />
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Analyze Different Role
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIExposure;
