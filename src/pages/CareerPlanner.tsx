import { useState } from 'react';
import { Target, ArrowRight, RotateCcw, Calendar, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckboxGroup } from '@/components/AssessmentForm';
import { InsightCard } from '@/components/InsightCard';
import { generateCareerPlan, futureRelevantSkills } from '@/lib/assessments';
import { saveCareerPlan, type CareerPlan } from '@/lib/storage';

const timeframes = [
  '6 months',
  '1 year',
  '2 years',
  '5 years',
];

const CareerPlanner = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState('');
  const [result, setResult] = useState<CareerPlan | null>(null);

  const handleGenerate = () => {
    if (!currentRole || !targetRole || selectedSkills.length === 0 || !timeframe) return;

    const plan = generateCareerPlan(currentRole, targetRole, selectedSkills, timeframe);

    const savedPlan = saveCareerPlan({
      shortTermGoals: plan.shortTerm,
      midTermGoals: plan.midTerm,
      longTermGoals: plan.longTerm,
      skills: selectedSkills,
      habits: plan.habits,
    });

    setResult(savedPlan);
    setStep('result');
  };

  const handleReset = () => {
    setCurrentRole('');
    setTargetRole('');
    setSelectedSkills([]);
    setTimeframe('');
    setResult(null);
    setStep('form');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
          <Target className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Career Survival Planner</h1>
          <p className="text-muted-foreground text-sm">Create your personalized career roadmap</p>
        </div>
      </div>

      {step === 'form' ? (
        <div className="space-y-6">
          <InsightCard type="info">
            This planner helps you create educational goals focused on skills, habits, and 
            career flexibility. Plans are guidance, not guarantees – adapt them to your 
            unique circumstances.
          </InsightCard>

          <div className="card-elevated p-6 space-y-6">
            <div>
              <label className="block font-medium text-foreground mb-2">Current Role</label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="e.g., Junior Developer, Marketing Coordinator"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block font-medium text-foreground mb-2">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Senior Developer, Marketing Manager"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block font-medium text-foreground mb-2">Planning Timeframe</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeframes.map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      timeframe === tf
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input hover:border-primary/50 text-foreground'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <CheckboxGroup
            label="Skills to Focus On"
            description="Select skills you want to develop as part of your plan"
            options={futureRelevantSkills}
            selected={selectedSkills}
            onChange={setSelectedSkills}
            maxSelect={5}
          />

          <Button 
            onClick={handleGenerate}
            disabled={!currentRole || !targetRole || selectedSkills.length === 0 || !timeframe}
            className="w-full h-12 text-base font-semibold"
          >
            Generate Career Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      ) : result && (
        <div className="space-y-6 animate-slide-up">
          {/* Plan Summary */}
          <div className="card-elevated p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">
              Your Career Survival Plan
            </h2>
            <p className="text-muted-foreground">
              Personalized roadmap based on your goals
            </p>
          </div>

          {/* Short-term Goals */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-risk-low-bg text-risk-low text-xs font-semibold rounded-full">
                0-3 Months
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">Short-term Goals</h3>
            </div>
            <ul className="space-y-3">
              {result.shortTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mid-term Goals */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-risk-medium-bg text-risk-medium text-xs font-semibold rounded-full">
                3-12 Months
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">Mid-term Goals</h3>
            </div>
            <ul className="space-y-3">
              {result.midTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-risk-medium flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long-term Goals */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                1-3+ Years
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">Long-term Goals</h3>
            </div>
            <ul className="space-y-3">
              {result.longTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Daily Habits */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-semibold text-lg text-foreground">
                Daily Habits for Success
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.habits.map((habit, index) => (
                <div key={index} className="p-3 bg-accent/50 rounded-lg">
                  <span className="text-sm text-foreground">{habit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Skills */}
          <div className="card-elevated p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Your Focus Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-secondary/20 text-secondary text-sm font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <InsightCard type="tip" title="Pro Tip">
            Review and adjust your plan monthly. Career paths are rarely linear – 
            be flexible and open to opportunities that align with your core goals.
          </InsightCard>

          <InsightCard type="info">
            This plan is for educational guidance only. Actual career progression depends 
            on many factors including market conditions, personal circumstances, and opportunities.
          </InsightCard>

          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full h-12"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Create New Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default CareerPlanner;
