import { jsPDF } from 'jspdf';
import { getAppData, type AppData, type JobRiskAssessment, type SkillGapAssessment, type AIExposureAssessment, type CareerPlan } from './storage';

export const exportToJSON = (): void => {
  const data = getAppData();
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `career-shield-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (): void => {
  const data = getAppData();
  const pdf = new jsPDF();
  
  let yPosition = 20;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 7;
  
  const checkNewPage = (requiredSpace: number = 30) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = 20;
    }
  };

  const addTitle = (text: string) => {
    checkNewPage(40);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 95); // Primary blue
    pdf.text(text, margin, yPosition);
    yPosition += 12;
  };

  const addSubtitle = (text: string) => {
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(60, 60, 60);
    pdf.text(text, margin, yPosition);
    yPosition += 10;
  };

  const addText = (text: string, indent: number = 0) => {
    checkNewPage();
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    
    const maxWidth = pdf.internal.pageSize.width - margin * 2 - indent;
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string) => {
      checkNewPage();
      pdf.text(line, margin + indent, yPosition);
      yPosition += lineHeight;
    });
  };

  const addBadge = (label: string, value: string, color: [number, number, number]) => {
    checkNewPage();
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`${label}: `, margin, yPosition);
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...color);
    pdf.text(value, margin + pdf.getTextWidth(`${label}: `), yPosition);
    yPosition += lineHeight;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRiskColor = (level: string): [number, number, number] => {
    switch (level) {
      case 'low': return [34, 139, 34];
      case 'medium': return [218, 165, 32];
      case 'high': return [178, 34, 34];
      default: return [100, 100, 100];
    }
  };

  // Header
  pdf.setFillColor(30, 58, 95);
  pdf.rect(0, 0, pdf.internal.pageSize.width, 40, 'F');
  
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Career Shield', margin, 25);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Job Security & AI Survival Planner - Assessment Report', margin, 33);
  
  yPosition = 55;
  
  // Report Info
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Generated: ${formatDate(new Date().toISOString())}`, margin, yPosition);
  yPosition += 15;

  // Summary Stats
  addTitle('Assessment Summary');
  addText(`Total Job Risk Assessments: ${data.jobRiskAssessments.length}`);
  addText(`Total Skill Gap Assessments: ${data.skillGapAssessments.length}`);
  addText(`Total AI Exposure Assessments: ${data.aiExposureAssessments.length}`);
  addText(`Total Career Plans: ${data.careerPlans.length}`);
  yPosition += 10;

  // Job Risk Assessments
  if (data.jobRiskAssessments.length > 0) {
    addTitle('Job Risk Assessments');
    
    data.jobRiskAssessments.forEach((assessment, index) => {
      checkNewPage(60);
      addSubtitle(`Assessment ${index + 1} - ${formatDate(assessment.date)}`);
      
      addBadge('Risk Level', assessment.riskLevel.toUpperCase(), getRiskColor(assessment.riskLevel));
      addBadge('Risk Score', `${assessment.riskScore}/100`, getRiskColor(assessment.riskLevel));
      addText(`Industry: ${assessment.industry}`);
      addText(`Job Role: ${assessment.jobRole}`);
      addText(`Contract Type: ${assessment.contractType}`);
      addText(`Experience: ${assessment.experienceLevel}`);
      addText(`Location: ${assessment.location}`);
      
      if (assessment.insights.length > 0) {
        yPosition += 3;
        addText('Key Insights:', 0);
        assessment.insights.forEach(insight => {
          addText(`• ${insight}`, 5);
        });
      }
      yPosition += 8;
    });
  }

  // Skill Gap Assessments
  if (data.skillGapAssessments.length > 0) {
    addTitle('Skill Gap Assessments');
    
    data.skillGapAssessments.forEach((assessment, index) => {
      checkNewPage(50);
      addSubtitle(`Assessment ${index + 1} - ${formatDate(assessment.date)}`);
      
      if (assessment.desiredRole) {
        addText(`Target Role: ${assessment.desiredRole}`);
      }
      addText(`Current Skills: ${assessment.currentSkills.length}`);
      addText(`Skill Gaps: ${assessment.gaps.length}`);
      addText(`Transferable Skills: ${assessment.transferableSkills.length}`);
      
      if (assessment.gaps.length > 0) {
        yPosition += 3;
        addText('Skills to Develop:', 0);
        addText(assessment.gaps.join(', '), 5);
      }
      
      if (assessment.transferableSkills.length > 0) {
        yPosition += 3;
        addText('Transferable Skills:', 0);
        addText(assessment.transferableSkills.join(', '), 5);
      }
      yPosition += 8;
    });
  }

  // AI Exposure Assessments
  if (data.aiExposureAssessments.length > 0) {
    addTitle('AI Exposure Assessments');
    
    data.aiExposureAssessments.forEach((assessment, index) => {
      checkNewPage(50);
      addSubtitle(`Assessment ${index + 1} - ${formatDate(assessment.date)}`);
      
      addBadge('Exposure Level', assessment.exposureLevel.toUpperCase(), getRiskColor(assessment.exposureLevel));
      addBadge('Exposure Score', `${assessment.exposureScore}/100`, getRiskColor(assessment.exposureLevel));
      addText(`Job Role: ${assessment.jobRole}`);
      
      if (assessment.reasons.length > 0) {
        yPosition += 3;
        addText('Analysis:', 0);
        assessment.reasons.forEach(reason => {
          addText(`• ${reason}`, 5);
        });
      }
      
      if (assessment.humanCentricSkills.length > 0) {
        yPosition += 3;
        addText('Recommended Human-Centric Skills:', 0);
        addText(assessment.humanCentricSkills.join(', '), 5);
      }
      yPosition += 8;
    });
  }

  // Career Plans
  if (data.careerPlans.length > 0) {
    addTitle('Career Survival Plans');
    
    data.careerPlans.forEach((plan, index) => {
      checkNewPage(80);
      addSubtitle(`Plan ${index + 1} - ${formatDate(plan.date)}`);
      
      addText('Focus Skills:', 0);
      addText(plan.skills.join(', '), 5);
      
      yPosition += 3;
      addText('Short-term Goals (0-3 months):', 0);
      plan.shortTermGoals.forEach(goal => {
        addText(`• ${goal}`, 5);
      });
      
      yPosition += 3;
      addText('Mid-term Goals (3-12 months):', 0);
      plan.midTermGoals.forEach(goal => {
        addText(`• ${goal}`, 5);
      });
      
      yPosition += 3;
      addText('Long-term Goals (1-3+ years):', 0);
      plan.longTermGoals.forEach(goal => {
        addText(`• ${goal}`, 5);
      });
      
      yPosition += 3;
      addText('Daily Habits:', 0);
      plan.habits.forEach(habit => {
        addText(`• ${habit}`, 5);
      });
      yPosition += 8;
    });
  }

  // Footer disclaimer
  checkNewPage(40);
  yPosition += 10;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition, pdf.internal.pageSize.width - margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(120, 120, 120);
  const disclaimer = 'DISCLAIMER: This report is for educational purposes only. Career Shield provides informational self-assessment tools. Results are not predictions and do not guarantee employment outcomes. Always consult career professionals for personalized advice.';
  const disclaimerLines = pdf.splitTextToSize(disclaimer, pdf.internal.pageSize.width - margin * 2);
  disclaimerLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 5;
  });

  // Save
  pdf.save(`career-shield-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const importFromJSON = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as AppData;
        
        // Validate structure
        if (
          typeof data === 'object' &&
          Array.isArray(data.jobRiskAssessments) &&
          Array.isArray(data.skillGapAssessments) &&
          Array.isArray(data.aiExposureAssessments) &&
          Array.isArray(data.careerPlans)
        ) {
          localStorage.setItem('career_shield_data', JSON.stringify(data));
          resolve(true);
        } else {
          resolve(false);
        }
      } catch {
        resolve(false);
      }
    };
    
    reader.onerror = () => resolve(false);
    reader.readAsText(file);
  });
};
