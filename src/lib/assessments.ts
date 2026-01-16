// Assessment logic and data for Career Shield

export const industries = [
  'Technology & Software',
  'Healthcare & Medical',
  'Finance & Banking',
  'Manufacturing',
  'Retail & E-commerce',
  'Education',
  'Transportation & Logistics',
  'Media & Entertainment',
  'Legal Services',
  'Real Estate',
  'Hospitality & Tourism',
  'Agriculture',
  'Construction',
  'Government & Public Sector',
  'Energy & Utilities',
  'Other',
];

export const contractTypes = [
  'Full-time Permanent',
  'Part-time Permanent',
  'Fixed-term Contract',
  'Freelance/Contractor',
  'Internship',
  'Temporary',
  'Zero-hours Contract',
];

export const experienceLevels = [
  'Student/Intern',
  'Entry Level (0-2 years)',
  'Junior (2-4 years)',
  'Mid-Level (4-7 years)',
  'Senior (7-12 years)',
  'Expert/Lead (12+ years)',
  'Executive/C-Level',
];

export const automationExposureLevels = [
  'Highly Routine Tasks',
  'Mostly Routine Tasks',
  'Mixed Tasks',
  'Mostly Creative/Complex Tasks',
  'Highly Creative/Leadership Tasks',
];

export const currentSkillCategories = {
  'Technical Skills': [
    'Programming/Coding',
    'Data Analysis',
    'Cloud Computing',
    'Cybersecurity',
    'AI/Machine Learning',
    'Web Development',
    'Mobile Development',
    'Database Management',
    'Network Administration',
    'DevOps',
  ],
  'Soft Skills': [
    'Communication',
    'Leadership',
    'Problem Solving',
    'Critical Thinking',
    'Creativity',
    'Emotional Intelligence',
    'Adaptability',
    'Teamwork',
    'Time Management',
    'Negotiation',
  ],
  'Business Skills': [
    'Project Management',
    'Strategic Planning',
    'Financial Literacy',
    'Marketing',
    'Sales',
    'Customer Service',
    'Business Analysis',
    'Process Improvement',
    'Risk Management',
    'Change Management',
  ],
};

export const futureRelevantSkills = [
  'AI & Machine Learning',
  'Data Science & Analytics',
  'Cloud Architecture',
  'Cybersecurity',
  'Digital Marketing',
  'UX/UI Design',
  'Blockchain',
  'IoT Development',
  'Automation & RPA',
  'AR/VR Development',
  'Sustainability & Green Tech',
  'Healthcare Technology',
  'FinTech',
  'Remote Collaboration Tools',
  'Agile/Scrum Methodologies',
];

export const humanCentricSkills = [
  'Empathy & Emotional Intelligence',
  'Creative Problem Solving',
  'Complex Decision Making',
  'Strategic Thinking',
  'Interpersonal Communication',
  'Cultural Awareness',
  'Ethical Judgment',
  'Mentoring & Coaching',
  'Conflict Resolution',
  'Innovation & Ideation',
  'Relationship Building',
  'Storytelling & Persuasion',
];

interface RiskFactors {
  industryRisk: number;
  contractRisk: number;
  experienceRisk: number;
  automationRisk: number;
}

export const calculateJobRisk = (
  industry: string,
  contractType: string,
  experienceLevel: string,
  automationExposure: string
): { riskLevel: 'low' | 'medium' | 'high'; riskScore: number; insights: string[] } => {
  const factors: RiskFactors = {
    industryRisk: 0,
    contractRisk: 0,
    experienceRisk: 0,
    automationRisk: 0,
  };

  // Industry risk scoring
  const highRiskIndustries = ['Manufacturing', 'Retail & E-commerce', 'Transportation & Logistics'];
  const mediumRiskIndustries = ['Finance & Banking', 'Media & Entertainment', 'Real Estate'];
  
  if (highRiskIndustries.includes(industry)) factors.industryRisk = 30;
  else if (mediumRiskIndustries.includes(industry)) factors.industryRisk = 20;
  else factors.industryRisk = 10;

  // Contract type risk
  const highRiskContracts = ['Fixed-term Contract', 'Freelance/Contractor', 'Temporary', 'Zero-hours Contract'];
  const mediumRiskContracts = ['Part-time Permanent', 'Internship'];
  
  if (highRiskContracts.includes(contractType)) factors.contractRisk = 25;
  else if (mediumRiskContracts.includes(contractType)) factors.contractRisk = 15;
  else factors.contractRisk = 5;

  // Experience level risk
  const highRiskExperience = ['Student/Intern', 'Entry Level (0-2 years)'];
  const mediumRiskExperience = ['Junior (2-4 years)'];
  
  if (highRiskExperience.includes(experienceLevel)) factors.experienceRisk = 20;
  else if (mediumRiskExperience.includes(experienceLevel)) factors.experienceRisk = 12;
  else factors.experienceRisk = 5;

  // Automation exposure risk
  if (automationExposure === 'Highly Routine Tasks') factors.automationRisk = 25;
  else if (automationExposure === 'Mostly Routine Tasks') factors.automationRisk = 20;
  else if (automationExposure === 'Mixed Tasks') factors.automationRisk = 12;
  else if (automationExposure === 'Mostly Creative/Complex Tasks') factors.automationRisk = 6;
  else factors.automationRisk = 2;

  const totalScore = factors.industryRisk + factors.contractRisk + factors.experienceRisk + factors.automationRisk;
  
  const insights: string[] = [];
  
  if (factors.industryRisk >= 25) {
    insights.push('Your industry has historically faced significant disruption from automation and economic shifts.');
  }
  if (factors.contractRisk >= 20) {
    insights.push('Non-permanent contracts may have less job security during economic downturns.');
  }
  if (factors.experienceRisk >= 15) {
    insights.push('Early-career professionals often face higher competition during hiring freezes.');
  }
  if (factors.automationRisk >= 20) {
    insights.push('Routine tasks are increasingly being automated - consider developing specialized skills.');
  }
  
  if (totalScore < 35) {
    insights.push('Your profile suggests relatively stable job prospects, but continuous learning is still recommended.');
  } else if (totalScore < 60) {
    insights.push('Consider building diverse skills to increase career flexibility.');
  } else {
    insights.push('Focus on developing unique human skills and exploring adjacent career paths.');
  }

  let riskLevel: 'low' | 'medium' | 'high';
  if (totalScore < 35) riskLevel = 'low';
  else if (totalScore < 60) riskLevel = 'medium';
  else riskLevel = 'high';

  return { riskLevel, riskScore: Math.min(totalScore, 100), insights };
};

export const calculateAIExposure = (
  jobRole: string,
  tasks: string[]
): { exposureScore: number; exposureLevel: 'low' | 'medium' | 'high'; reasons: string[]; recommendations: string[] } => {
  const routineTasks = [
    'data entry',
    'scheduling',
    'basic reporting',
    'document processing',
    'customer inquiries',
    'inventory management',
    'basic analysis',
    'transcription',
    'translation',
    'content moderation',
  ];

  const creativeTasks = [
    'strategy development',
    'complex problem solving',
    'leadership',
    'relationship building',
    'innovation',
    'mentoring',
    'crisis management',
    'negotiations',
    'ethical decisions',
    'creative design',
  ];

  let routineCount = 0;
  let creativeCount = 0;
  const reasons: string[] = [];

  const lowerTasks = tasks.map(t => t.toLowerCase());
  
  routineTasks.forEach(rt => {
    if (lowerTasks.some(t => t.includes(rt))) {
      routineCount++;
    }
  });

  creativeTasks.forEach(ct => {
    if (lowerTasks.some(t => t.includes(ct))) {
      creativeCount++;
    }
  });

  const baseScore = 50;
  const routineImpact = routineCount * 8;
  const creativeImpact = creativeCount * -6;
  
  let exposureScore = Math.max(0, Math.min(100, baseScore + routineImpact + creativeImpact));

  if (routineCount > 3) {
    reasons.push('Your role involves several tasks that can be automated with current AI technology.');
  }
  if (creativeCount > 3) {
    reasons.push('Your role requires significant human judgment and creativity, which reduces AI exposure.');
  }
  if (routineCount > creativeCount) {
    reasons.push('The balance of routine vs. creative tasks suggests moderate to high automation potential.');
  } else {
    reasons.push('Your task mix favors human-centric skills, which are harder to automate.');
  }

  const recommendations = [
    'Develop expertise in AI tools to work alongside automation',
    'Focus on tasks requiring emotional intelligence and human judgment',
    'Build cross-functional skills that combine technical and soft skills',
    'Stay current with industry trends and emerging technologies',
  ];

  let exposureLevel: 'low' | 'medium' | 'high';
  if (exposureScore < 35) exposureLevel = 'low';
  else if (exposureScore < 65) exposureLevel = 'medium';
  else exposureLevel = 'high';

  return { exposureScore, exposureLevel, reasons, recommendations };
};

export const generateCareerPlan = (
  currentRole: string,
  targetRole: string,
  skills: string[],
  timeframe: string
): { shortTerm: string[]; midTerm: string[]; longTerm: string[]; habits: string[] } => {
  const shortTerm = [
    `Assess current skills gap between ${currentRole} and ${targetRole}`,
    'Identify 2-3 key skills to develop in the next 3 months',
    'Create a learning schedule with specific weekly goals',
    'Join relevant professional communities and networks',
    'Start documenting achievements and building a portfolio',
  ];

  const midTerm = [
    'Complete at least one certification or course in target field',
    'Take on stretch projects or volunteer for cross-functional work',
    'Build relationships with mentors in your target area',
    'Develop a personal brand through content or thought leadership',
    'Gain practical experience through side projects or freelance work',
  ];

  const longTerm = [
    `Position yourself for ${targetRole} opportunities`,
    'Become known as an expert in your specialized area',
    'Build a network of professional relationships',
    'Consider leadership or management track options',
    'Plan for continuous adaptation and lifelong learning',
  ];

  const habits = [
    'Dedicate 30 minutes daily to learning new skills',
    'Read industry news and publications weekly',
    'Network with one new professional per week',
    'Reflect on progress and adjust goals monthly',
    'Practice new skills in real-world scenarios',
    'Seek feedback regularly from peers and mentors',
  ];

  return { shortTerm, midTerm, longTerm, habits };
};
