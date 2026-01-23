import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { month: 'Jan', riskScore: 45, aiExposure: 52, skillGap: 38 },
  { month: 'Feb', riskScore: 42, aiExposure: 48, skillGap: 35 },
  { month: 'Mar', riskScore: 48, aiExposure: 55, skillGap: 40 },
  { month: 'Apr', riskScore: 38, aiExposure: 45, skillGap: 32 },
  { month: 'May', riskScore: 35, aiExposure: 42, skillGap: 28 },
  { month: 'Jun', riskScore: 32, aiExposure: 38, skillGap: 25 },
];

const skillDistribution = [
  { name: 'Technical', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Soft Skills', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'Business', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Leadership', value: 20, color: 'hsl(var(--muted))' },
];

const metrics = [
  { label: 'Risk Trend', value: -13, icon: TrendingDown, positive: true },
  { label: 'AI Exposure', value: -14, icon: TrendingDown, positive: true },
  { label: 'Skill Progress', value: 8, icon: TrendingUp, positive: true },
  { label: 'Market Fit', value: 0, icon: Minus, positive: null },
];

export const AdvancedAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Advanced Analytics</h3>
          <p className="text-sm text-muted-foreground">Detailed breakdowns and historical trends</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-center gap-1">
              <metric.icon className={`w-4 h-4 ${
                metric.positive === true ? 'text-risk-low' : 
                metric.positive === false ? 'text-risk-high' : 'text-muted-foreground'
              }`} />
              <span className={`font-semibold ${
                metric.positive === true ? 'text-risk-low' : 
                metric.positive === false ? 'text-risk-high' : 'text-foreground'
              }`}>
                {metric.value > 0 ? '+' : ''}{metric.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-4">6-Month Trend Analysis</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="riskScore" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} name="Risk Score" />
              <Area type="monotone" dataKey="aiExposure" stackId="2" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} name="AI Exposure" />
              <Area type="monotone" dataKey="skillGap" stackId="3" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} name="Skill Gap" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-muted/30 rounded-xl p-4">
          <h4 className="font-medium text-foreground mb-4">Skill Distribution</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-xl p-4">
          <h4 className="font-medium text-foreground mb-4">Key Insights</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-low mt-1.5 flex-shrink-0" />
              <span className="text-muted-foreground">Risk score improved 13% over 6 months</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-low mt-1.5 flex-shrink-0" />
              <span className="text-muted-foreground">AI exposure decreased through skill development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
              <span className="text-muted-foreground">Technical skills are your strongest area</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-risk-medium mt-1.5 flex-shrink-0" />
              <span className="text-muted-foreground">Consider developing leadership skills</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
