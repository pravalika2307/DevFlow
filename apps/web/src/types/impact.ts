export interface BeneficiaryData {
  primary: string;
  secondary: string;
  estimatedUsers: string;
  geoReach: string;
  ageGroups: string;
  incomeGroups: string;
  accessibilityNeeds: string;
}

export interface SdgMetric {
  sdgNumber: number;
  sdgName: string;
  contributionLevel: number; // 0-100
  confidence: number; // 0-100
  reasoning: string;
  outcomes: string;
}

export interface ImpactPredictions {
  potentialReach: number; // 0-100
  expectedAdoption: number; // 0-100
  implementationDifficulty: number; // 0-100
  economicBenefit: number; // 0-100
  timeToImpact: string;
  riskFactors: string;
  sustainabilityScore: number; // 0-100
}

export interface RiskItem {
  category:
    | "Technical"
    | "Financial"
    | "Operational"
    | "Ethical"
    | "Privacy"
    | "Adoption"
    | "Accessibility";
  severity: "Low" | "Medium" | "High";
  description: string;
  mitigation: string;
}

export interface InclusivityScores {
  ruralScore: number;
  urbanScore: number;
  disabilityScore: number;
  lowInternetScore: number;
  languageScore: number;
  affordabilityScore: number;
  digitalLiteracyScore: number;
}

export interface InclusivityData {
  scores: InclusivityScores;
  suggestions: string[];
}

export interface ImpactProjectData {
  projectId: string;
  overallImpactScore: number;
  innovationReadiness: number;
  socialImpact: number;
  technicalFeasibility: number;
  scalability: number;
  sustainability: number;
  accessibility: number;
  aiReadiness: number;
  riskLevel: number;

  beneficiary: BeneficiaryData;
  sdgs: SdgMetric[];
  predictions: ImpactPredictions;
  timeline: {
    threeMonths: string;
    sixMonths: string;
    oneYear: string;
    threeYears: string;
  };
  risks: RiskItem[];
  inclusivity: InclusivityData;
}
