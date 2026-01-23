import { FileText, Download, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reportTypes = [
  {
    id: 'career-summary',
    title: 'Career Risk Summary',
    description: 'Comprehensive overview of all your assessments',
    pages: 12,
    lastGenerated: '2 days ago',
  },
  {
    id: 'skill-analysis',
    title: 'Skill Gap Analysis',
    description: 'Detailed breakdown of skills vs market demands',
    pages: 8,
    lastGenerated: '1 week ago',
  },
  {
    id: 'ai-exposure',
    title: 'AI Exposure Report',
    description: 'Task-by-task automation risk assessment',
    pages: 6,
    lastGenerated: '3 days ago',
  },
  {
    id: 'career-roadmap',
    title: 'Career Roadmap',
    description: 'Personalized action plan with milestones',
    pages: 10,
    lastGenerated: 'Today',
  },
];

const recentReports = [
  { name: 'Q4 Career Assessment.pdf', date: 'Jan 15, 2026', size: '2.4 MB' },
  { name: 'Skill Gap Analysis.pdf', date: 'Jan 10, 2026', size: '1.8 MB' },
  { name: 'Monthly Progress.pdf', date: 'Jan 1, 2026', size: '1.2 MB' },
];

export const DetailedReports = () => {
  const handleDownload = (reportId: string) => {
    // In a real app, this would generate and download the PDF
    console.log(`Downloading report: ${reportId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Detailed Reports</h3>
          <p className="text-sm text-muted-foreground">Exportable PDF reports with comprehensive analysis</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reportTypes.map((report) => (
          <div 
            key={report.id}
            className="bg-muted/30 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{report.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
              </div>
              <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span>{report.pages} pages</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {report.lastGenerated}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-auto"
              onClick={() => handleDownload(report.id)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-muted/30 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-4">Recent Downloads</h4>
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-background rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                </div>
              </div>
              <CheckCircle className="w-4 h-4 text-risk-low" />
            </div>
          ))}
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
        <h4 className="font-medium text-foreground mb-2">Generate Custom Report</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Create a tailored report with specific assessments and date ranges
        </p>
        <Button className="w-full">
          Create Custom Report
        </Button>
      </div>
    </div>
  );
};
