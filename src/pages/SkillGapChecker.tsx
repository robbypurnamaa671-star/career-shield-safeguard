import { useState } from 'react';
import { Zap, ArrowRight, RotateCcw, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckboxGroup } from '@/components/AssessmentForm';
import { InsightCard } from '@/components/InsightCard';
import { 
  currentSkillCategories, 
  futureRelevantSkills,
  humanCentricSkills 
} from '@/lib/assessments';
import { saveSkillGapAssessment, type SkillGapAssessment } from '@/lib/storage';

const SkillGapChecker = () => {
  const [step, setStep] = useState<'skills' | 'target' | 'result'>('skills');
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [targetSkills, setTargetSkills] = useState<string[]>([]);
  const [desiredRole, setDesiredRole] = useState('');
  const [result, setResult] = useState<SkillGapAssessment | null>(null);

  const allCurrentSkills = Object.values(currentSkillCategories).flat();

  const handleAnalyze = () => {
    // Calculate gaps
    const gaps = targetSkills.filter(skill => !currentSkills.includes(skill));
    
    // Find transferable skills
    const transferableSkills = currentSkills.filter(skill => 
      futureRelevantSkills.some(fs => 
        skill.toLowerCase().includes(fs.toLowerCase().split(' ')[0]) ||
        fs.toLowerCase().includes(skill.toLowerCase().split(' ')[0])
      )
    );

    // Generate recommendations
    const recommendations = [
      `Focus on developing ${gaps.slice(0, 2).join(' and ')} as priority skills`,
      'Consider online courses or certifications in your target areas',
      `Leverage your existing ${transferableSkills[0] || 'skills'} as a foundation`,
      'Seek mentorship from professionals in your target role',
      'Practice new skills through side projects or volunteer work',
    ];

    const assessment = saveSkillGapAssessment({
      currentSkills,
      desiredRole,
      gaps,
      transferableSkills,
      recommendations,
    });

    setResult(assessment);
    setStep('result');
  };

  const handleReset = () => {
    setCurrentSkills([]);
    setTargetSkills([]);
    setDesiredRole('');
    setResult(null);
    setStep('skills');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Skill Gap Checker</h1>
          <p className="text-muted-foreground text-sm">Identify skills to develop for future success</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        {['skills', 'target', 'result'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === s ? 'bg-primary text-primary-foreground' :
              ['skills', 'target', 'result'].indexOf(step) > i ? 'bg-primary/20 text-primary' :
              'bg-muted text-muted-foreground'
            }`}>
              {i + 1}
            </div>
            {i < 2 && <div className={`w-8 h-0.5 ${
              ['skills', 'target', 'result'].indexOf(step) > i ? 'bg-primary' : 'bg-muted'
            }`} />}
          </div>
        ))}
      </div>

      {step === 'skills' && (
        <div className="space-y-6 animate-fade-in">
          <InsightCard type="info">
            Select the skills you currently have. Be honest – this helps identify 
            meaningful development opportunities.
          </InsightCard>

          {Object.entries(currentSkillCategories).map(([category, skills]) => (
            <div key={category} className="card-elevated p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.map(skill => (
                  <label
                    key={skill}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentSkills.includes(skill)
                        ? 'border-primary bg-primary/5'
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={currentSkills.includes(skill)}
                      onChange={() => {
                        if (currentSkills.includes(skill)) {
                          setCurrentSkills(currentSkills.filter(s => s !== skill));
                        } else {
                          setCurrentSkills([...currentSkills, skill]);
                        }
                      }}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <Button 
            onClick={() => setStep('target')}
            disabled={currentSkills.length === 0}
            className="w-full h-12 text-base font-semibold"
          >
            Continue to Target Skills
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {step === 'target' && (
        <div className="space-y-6 animate-fade-in">
          <div className="card-elevated p-6">
            <label className="block font-medium text-foreground mb-2">Desired Role (Optional)</label>
            <input
              type="text"
              value={desiredRole}
              onChange={(e) => setDesiredRole(e.target.value)}
              placeholder="e.g., Data Scientist, Product Manager, DevOps Engineer"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <CheckboxGroup
            label="Future-Relevant Skills"
            description="Select skills you want to develop for future career growth"
            options={futureRelevantSkills}
            selected={targetSkills}
            onChange={setTargetSkills}
          />

          <CheckboxGroup
            label="Human-Centric Skills"
            description="Skills that are harder to automate and remain valuable"
            options={humanCentricSkills}
            selected={targetSkills}
            onChange={setTargetSkills}
          />

          <div className="flex gap-3">
            <Button 
              onClick={() => setStep('skills')}
              variant="outline"
              className="flex-1 h-12"
            >
              Back
            </Button>
            <Button 
              onClick={handleAnalyze}
              disabled={targetSkills.length === 0}
              className="flex-1 h-12 text-base font-semibold"
            >
              Analyze Gaps
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 'result' && result && (
        <div className="space-y-6 animate-slide-up">
          {/* Summary Card */}
          <div className="card-elevated p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Your Skill Analysis
            </h3>
            {result.desiredRole && (
              <p className="text-muted-foreground mb-4">
                Target Role: <span className="font-medium text-foreground">{result.desiredRole}</span>
              </p>
            )}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-foreground">{result.currentSkills.length}</p>
                <p className="text-xs text-muted-foreground">Current Skills</p>
              </div>
              <div className="p-4 bg-risk-high-bg rounded-lg">
                <p className="text-2xl font-bold text-risk-high">{result.gaps.length}</p>
                <p className="text-xs text-muted-foreground">Skill Gaps</p>
              </div>
              <div className="p-4 bg-risk-low-bg rounded-lg">
                <p className="text-2xl font-bold text-risk-low">{result.transferableSkills.length}</p>
                <p className="text-xs text-muted-foreground">Transferable</p>
              </div>
            </div>
          </div>

          {/* Skill Gaps */}
          {result.gaps.length > 0 && (
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-risk-high" />
                <h3 className="font-display font-semibold text-lg text-foreground">Skills to Develop</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.gaps.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-risk-high-bg text-risk-high text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Transferable Skills */}
          {result.transferableSkills.length > 0 && (
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-5 h-5 text-secondary" />
                <h3 className="font-display font-semibold text-lg text-foreground">Transferable Skills</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                These existing skills can help you transition to new roles
              </p>
              <div className="flex flex-wrap gap-2">
                {result.transferableSkills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-accent text-accent-foreground text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg text-foreground">Recommendations</h3>
            {result.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <CheckCircle className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{rec}</p>
              </div>
            ))}
          </div>

          <InsightCard type="tip">
            Focus on 2-3 key skills at a time rather than trying to learn everything at once. 
            Consistent, focused practice leads to better skill retention.
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

export default SkillGapChecker;
