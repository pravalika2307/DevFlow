export type ResearchRecordType =
  | "Interview"
  | "Survey"
  | "Observation"
  | "FieldNote"
  | "PainPoint"
  | "Quote"
  | "AffinityNote";

export interface UserResearchRecord {
  id: string;
  type: ResearchRecordType;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface ProblemExplorerData {
  initialProblem: string;
  industry: string;
  location: string;
  targetUsers: string;

  // Expanded results
  rootCauses: string[];
  hiddenCauses: string[];
  stakeholders: string[];
  existingSolutions: string[];
  whyFailures: string[];
  innovationOpportunities: string[];
}

export interface FiveWhysNode {
  whyNumber: number;
  question: string;
  answer: string;
}

export interface FishboneCategory {
  category: "Technology" | "People" | "Environment" | "Process" | "Policy";
  causes: string[];
}

export interface RootCauseAnalysisData {
  fiveWhys: FiveWhysNode[];
  fishbone: FishboneCategory[];
}

export interface OpportunityItem {
  id: string;
  title: string;
  description: string;
  type: "High Impact" | "Quick Win" | "Long-term" | "Innovation Area";
  impact: number; // 0-100
  feasibility: number; // 0-100
  scalability: number; // 0-100
  novelty: number; // 0-100
}

export interface ConfidenceScores {
  researchCompleteness: number;
  userUnderstanding: number;
  problemClarity: number;
  evidenceStrength: number;
  validationLevel: number;
}

export interface RecommendationsData {
  missingInterviews: string[];
  weakAssumptions: string[];
  researchGaps: string[];
  missingStakeholders: string[];
  potentialBiases: string[];
  ethicalConsiderations: string[];
  accessibilityImprovements: string[];
}

export interface ProblemDiscoveryData {
  projectId: string; // bound project ID or 'draft'
  explorer: ProblemExplorerData;
  userResearch: UserResearchRecord[];
  rootCause: RootCauseAnalysisData;
  opportunities: OpportunityItem[];
  confidence: ConfidenceScores;
  recommendations: RecommendationsData;
}
