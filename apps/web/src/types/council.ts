export interface AdvisorReview {
  advisorId:
    | "mentor"
    | "architect"
    | "ux"
    | "sustainability"
    | "strategist"
    | "research"
    | "ethics"
    | "samsung";
  advisorName: string;
  role: string;
  score: number; // 0-100
  confidence: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ConsensusReport {
  overallInnovationScore: number;
  overallReadiness: number;
  topRisks: string[];
  highestStrengths: string[];
  highestPriorities: string[];
  immediateActions: string[];
}

export interface CouncilProjectData {
  projectId: string;
  advisors: AdvisorReview[];
  consensus: ConsensusReport;
  report: {
    executiveSummary: string;
    overallRecommendation: string;
    priorityImprovements: string[];
  };
}
