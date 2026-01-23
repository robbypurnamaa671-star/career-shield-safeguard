import { Users, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const industryData = [
  { industry: 'Tech', avgRisk: 35, yourRisk: 28 },
  { industry: 'Finance', avgRisk: 42, yourRisk: 28 },
  { industry: 'Healthcare', avgRisk: 28, yourRisk: 28 },
  { industry: 'Retail', avgRisk: 58, yourRisk: 28 },
  { industry: 'Mfg', avgRisk: 52, yourRisk: 28 },
];

const skillComparison = [
  { skill: 'Technical', you: 85, industry: 72 },
  { skill: 'Leadership', you: 65, industry: 68 },
  { skill: 'Communication', you: 78, industry: 75 },
  { skill: 'Problem Solving', you: 82, industry: 70 },
  { skill: 'Adaptability', you: 75, industry: 73 },
  { skill: 'Innovation', you: 70, industry: 65 },
];

const rankings = [
  { metric: 'Overall Career Readiness', percentile: 78, trend: 'up' },
  { metric: 'Technical Skills', percentile: 85, trend: 'up' },
  { metric: 'AI Adaptability', percentile: 72, trend: 'stable' },
  { metric: 'Industry Experience', percentile: 65, trend: 'up' },
  { metric: 'Future Skill Alignment', percentile: 80, trend: 'up' },
];

export const IndustryComparisons = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Industry Comparisons</h3>
          <p className="text-sm text-muted-foreground">Compare your profile against industry benchmarks</p>
        </div>
      </div>

      {/* Your Ranking */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-foreground">Your Industry Ranking</h4>
          <span className="text-2xl font-bold text-primary">Top 22%</span>
        </div>
        <p className="text-sm text-muted-foreground">
          You rank higher than 78% of professionals in your industry based on career readiness metrics
        </p>
      </div>

      {/* Percentile Rankings */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-4">Percentile Rankings</h4>
        <div className="space-y-3">
          {rankings.map((item) => (
            <div key={item.metric} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.metric}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentile}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-10">{item.percentile}%</span>
                {item.trend === 'up' ? (
                  <ArrowUp className="w-3 h-3 text-risk-low" />
                ) : item.trend === 'down' ? (
                  <ArrowDown className="w-3 h-3 text-risk-high" />
                ) : (
                  <Minus className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Risk Comparison */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-4">Risk vs Industry Average</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="industry" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={50} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="avgRisk" fill="hsl(var(--muted-foreground))" name="Industry Avg" radius={[0, 4, 4, 0]} />
              <Bar dataKey="yourRisk" fill="hsl(var(--primary))" name="Your Risk" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-muted-foreground" />
            <span className="text-muted-foreground">Industry Average</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-muted-foreground">Your Score</span>
          </div>
        </div>
      </div>

      {/* Skill Radar */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-4">Skill Comparison</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillComparison}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Radar name="You" dataKey="you" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              <Radar name="Industry Avg" dataKey="industry" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
