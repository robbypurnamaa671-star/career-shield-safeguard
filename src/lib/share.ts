import { toast } from 'sonner';

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const canNativeShare = (): boolean => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};

export const shareContent = async (data: ShareData): Promise<boolean> => {
  if (canNativeShare()) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url || window.location.href,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error);
      }
      return false;
    }
  } else {
    // Fallback to clipboard
    return copyToClipboard(data.text);
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('Copied to clipboard!');
      return true;
    } catch {
      toast.error('Failed to copy to clipboard');
      return false;
    }
  }
};

export const generateJobRiskShareText = (
  riskLevel: string,
  riskScore: number,
  industry: string,
  jobRole: string
): string => {
  const emoji = riskLevel === 'low' ? '🟢' : riskLevel === 'medium' ? '🟡' : '🔴';
  return `${emoji} My Career Shield Job Risk Assessment:

📊 Risk Level: ${riskLevel.toUpperCase()}
📈 Risk Score: ${riskScore}/100
🏢 Industry: ${industry}
💼 Role: ${jobRole}

Analyze your career resilience with Career Shield - Job Security & AI Survival Planner

#CareerShield #JobSecurity #CareerPlanning`;
};

export const generateSkillGapShareText = (
  currentSkillsCount: number,
  gapsCount: number,
  transferableCount: number,
  desiredRole?: string
): string => {
  return `📊 My Career Shield Skill Gap Analysis:

✅ Current Skills: ${currentSkillsCount}
🎯 Skills to Develop: ${gapsCount}
🔄 Transferable Skills: ${transferableCount}
${desiredRole ? `🚀 Target Role: ${desiredRole}` : ''}

Identify your skill gaps with Career Shield - Job Security & AI Survival Planner

#CareerShield #SkillDevelopment #CareerGrowth`;
};

export const generateAIExposureShareText = (
  exposureLevel: string,
  exposureScore: number,
  jobRole: string
): string => {
  const emoji = exposureLevel === 'low' ? '🛡️' : exposureLevel === 'medium' ? '⚠️' : '🤖';
  return `${emoji} My Career Shield AI Exposure Assessment:

🤖 Exposure Level: ${exposureLevel.toUpperCase()}
📊 Exposure Score: ${exposureScore}/100
💼 Role: ${jobRole}

Understand how AI might impact your career with Career Shield

#CareerShield #AIAutomation #FutureOfWork`;
};

export const generateCareerPlanShareText = (
  skillsCount: number,
  shortTermCount: number,
  midTermCount: number,
  longTermCount: number
): string => {
  return `🎯 I just created my Career Survival Plan with Career Shield!

📚 Focus Skills: ${skillsCount}
⏱️ Short-term Goals: ${shortTermCount}
📅 Mid-term Goals: ${midTermCount}
🚀 Long-term Goals: ${longTermCount}

Plan your career growth with Career Shield - Job Security & AI Survival Planner

#CareerShield #CareerPlanning #Goals`;
};

export const shareToTwitter = (text: string): void => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'width=550,height=420');
};

export const shareToLinkedIn = (text: string, url?: string): void => {
  const shareUrl = url || window.location.href;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  window.open(linkedInUrl, '_blank', 'width=550,height=420');
};

export const shareViaEmail = (subject: string, body: string): void => {
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};

export const shareToWhatsApp = (text: string): void => {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};
