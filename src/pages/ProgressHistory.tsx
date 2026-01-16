import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  getAppData, 
  JobRiskAssessment, 
  SkillGapAssessment, 
  AIExposureAssessment, 
  CareerPlan 
} from '@/lib/storage';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  History,
  AlertTriangle,
  Bot,
  Zap,
  Target,
  Calendar,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

const riskChartConfig = {
  score: {
    label: "Risk Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const exposureChartConfig = {
  score: {
    label: "Exposure Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const skillsChartConfig = {
  gaps: {
    label: "Skill Gaps",
    color: "hsl(var(--chart-3))",
  },
  transferable: {
    label: "Transferable Skills",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low': return 'bg-risk-low/10 text-risk-low border-risk-low/20';
    case 'medium': return 'bg-risk-medium/10 text-risk-medium border-risk-medium/20';
    case 'high': return 'bg-risk-high/10 text-risk-high border-risk-high/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return <TrendingUp className="w-4 h-4 text-risk-high" />;
    case 'down': return <TrendingDown className="w-4 h-4 text-risk-low" />;
    default: return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
};

const calculateTrend = (data: number[]): 'up' | 'down' | 'stable' => {
  if (data.length < 2) return 'stable';
  const recent = data.slice(-3);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const firstAvg = data.slice(0, 3).reduce((a, b) => a + b, 0) / Math.min(3, data.length);
  if (avg > firstAvg + 5) return 'up';
  if (avg < firstAvg - 5) return 'down';
  return 'stable';
};

export default function ProgressHistory() {
  const [activeTab, setActiveTab] = useState('overview');
  const data = getAppData();

  const jobRiskData = data.jobRiskAssessments.slice().reverse().map((a, i) => ({
    date: format(new Date(a.date), 'MMM d'),
    fullDate: format(new Date(a.date), 'MMM d, yyyy'),
    score: a.riskScore,
    level: a.riskLevel,
    role: a.jobRole,
  }));

  const aiExposureData = data.aiExposureAssessments.slice().reverse().map((a) => ({
    date: format(new Date(a.date), 'MMM d'),
    fullDate: format(new Date(a.date), 'MMM d, yyyy'),
    score: a.exposureScore,
    level: a.exposureLevel,
    role: a.jobRole,
  }));

  const skillGapData = data.skillGapAssessments.slice().reverse().map((a) => ({
    date: format(new Date(a.date), 'MMM d'),
    fullDate: format(new Date(a.date), 'MMM d, yyyy'),
    gaps: a.gaps.length,
    transferable: a.transferableSkills.length,
    role: a.desiredRole,
  }));

  const totalAssessments = 
    data.jobRiskAssessments.length + 
    data.skillGapAssessments.length + 
    data.aiExposureAssessments.length + 
    data.careerPlans.length;

  const riskTrend = calculateTrend(jobRiskData.map(d => d.score));
  const exposureTrend = calculateTrend(aiExposureData.map(d => d.score));

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
          <History className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Progress History</h1>
          <p className="text-muted-foreground">Track your assessment trends over time</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-xs">Total Assessments</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalAssessments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">Risk Trend</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{data.jobRiskAssessments.length}</p>
              {getTrendIcon(riskTrend)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Bot className="w-4 h-4" />
              <span className="text-xs">AI Exposure Trend</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{data.aiExposureAssessments.length}</p>
              {getTrendIcon(exposureTrend)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Target className="w-4 h-4" />
              <span className="text-xs">Career Plans</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{data.careerPlans.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="job-risk">Job Risk</TabsTrigger>
          <TabsTrigger value="ai-exposure">AI Exposure</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {totalAssessments === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <History className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No assessments yet</h3>
                <p className="text-muted-foreground">
                  Complete some assessments to see your progress history and trends.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Job Risk Chart */}
              {jobRiskData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      Job Risk Score
                    </CardTitle>
                    <CardDescription>Your risk assessment trend over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={riskChartConfig} className="h-[200px]">
                      <AreaChart data={jobRiskData}>
                        <defs>
                          <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="score" 
                          stroke="hsl(var(--chart-1))" 
                          fill="url(#riskGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {/* AI Exposure Chart */}
              {aiExposureData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      AI Exposure Score
                    </CardTitle>
                    <CardDescription>Your AI exposure assessment trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={exposureChartConfig} className="h-[200px]">
                      <AreaChart data={aiExposureData}>
                        <defs>
                          <linearGradient id="exposureGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="score" 
                          stroke="hsl(var(--chart-2))" 
                          fill="url(#exposureGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {/* Skills Chart */}
              {skillGapData.length > 0 && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Skills Analysis
                    </CardTitle>
                    <CardDescription>Skill gaps vs transferable skills over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={skillsChartConfig} className="h-[200px]">
                      <BarChart data={skillGapData}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="gaps" fill="hsl(var(--chart-3))" radius={4} />
                        <Bar dataKey="transferable" fill="hsl(var(--chart-4))" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Job Risk Tab */}
        <TabsContent value="job-risk" className="space-y-4">
          {data.jobRiskAssessments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No job risk assessments</h3>
                <p className="text-muted-foreground">
                  Complete a job risk assessment to track your progress.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {jobRiskData.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Score Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={riskChartConfig} className="h-[250px]">
                      <LineChart data={jobRiskData}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="hsl(var(--chart-1))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--chart-1))" }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-3">
                {data.jobRiskAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} type="job-risk" />
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* AI Exposure Tab */}
        <TabsContent value="ai-exposure" className="space-y-4">
          {data.aiExposureAssessments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No AI exposure assessments</h3>
                <p className="text-muted-foreground">
                  Complete an AI exposure assessment to track your progress.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {aiExposureData.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Exposure Score Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={exposureChartConfig} className="h-[250px]">
                      <LineChart data={aiExposureData}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--chart-2))" }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-3">
                {data.aiExposureAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} type="ai-exposure" />
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          {data.skillGapAssessments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Zap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No skill gap assessments</h3>
                <p className="text-muted-foreground">
                  Complete a skill gap assessment to track your progress.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {skillGapData.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={skillsChartConfig} className="h-[250px]">
                      <BarChart data={skillGapData}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="gaps" fill="hsl(var(--chart-3))" radius={4} />
                        <Bar dataKey="transferable" fill="hsl(var(--chart-4))" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-3">
                {data.skillGapAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} type="skill-gap" />
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Assessment Card Component
function AssessmentCard({ 
  assessment, 
  type 
}: { 
  assessment: JobRiskAssessment | SkillGapAssessment | AIExposureAssessment | CareerPlan;
  type: 'job-risk' | 'ai-exposure' | 'skill-gap' | 'career-plan';
}) {
  const date = format(new Date(assessment.date), 'MMM d, yyyy');

  if (type === 'job-risk') {
    const a = assessment as JobRiskAssessment;
    return (
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{a.jobRole}</p>
                <p className="text-sm text-muted-foreground">{a.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getRiskColor(a.riskLevel)}>
                {a.riskLevel.toUpperCase()} • {a.riskScore}%
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {date}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'ai-exposure') {
    const a = assessment as AIExposureAssessment;
    return (
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{a.jobRole}</p>
                <p className="text-sm text-muted-foreground">{a.humanCentricSkills.length} human-centric skills</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getRiskColor(a.exposureLevel)}>
                {a.exposureLevel.toUpperCase()} • {a.exposureScore}%
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {date}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'skill-gap') {
    const a = assessment as SkillGapAssessment;
    return (
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{a.desiredRole}</p>
                <p className="text-sm text-muted-foreground">{a.currentSkills.length} current skills</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-risk-medium border-risk-medium/30">
                  {a.gaps.length} gaps
                </Badge>
                <Badge variant="outline" className="text-risk-low border-risk-low/30">
                  {a.transferableSkills.length} transferable
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {date}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
