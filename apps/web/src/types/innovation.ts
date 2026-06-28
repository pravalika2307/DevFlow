export interface TeamMember {
  name: string;
  role: string;
  avatarUrl?: string;
}

export type ProjectStage =
  | "Ideation"
  | "Prototyping"
  | "Validation"
  | "Scaling";

export type ProjectPriority = "Low" | "Medium" | "High";

// Milestone 6 Design Thinking Structures
export interface EmpathiseData {
  targetUser: string;
  userPersona: string;
  goals: string;
  pains: string;
  behaviours: string;
  needs: string;
}

export interface DefineData {
  problemStatement: string;
  opportunityStatement: string;
  howMightWe: string;
  successMetrics: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  innovationScore: number;
  feasibility: number;
  socialImpact: number;
  aiRecommendation: string;
  isSelected: boolean;
}

export interface PrototypeVersion {
  id: string;
  version: string;
  figmaLink: string;
  githubRepo: string;
  demoUrl: string;
  screenshots: string; // Describes prototype interface screens
  notes: string;
  createdAt: string;
}

export interface TestRecord {
  id: string;
  testUsers: string;
  feedback: string;
  improvements: string;
  pendingIssues: string;
  lessonsLearned: string;
  createdAt: string;
}

export interface InnovationScores {
  problemClarity: number;
  innovation: number;
  feasibility: number;
  socialImpact: number;
  aiReadiness: number;
  scalability: number;
  sustainability: number;
}

export interface InnovationProject {
  id: string;
  name: string;
  problemStatement: string;
  proposedSolution: string;
  innovationTheme: string; // e.g. Education, Clean Water, etc.
  sdgGoals: string[]; // e.g. ["Goal 4: Quality Education"]
  targetBeneficiaries: string;
  expectedImpact: string;
  successMetrics: string;
  projectStage: ProjectStage;
  teamMembers: TeamMember[];
  timeline: string; // e.g. Q1-Q2 2026
  priority: ProjectPriority;

  // Overall aggregated scores (0-100)
  innovationScore: number;
  engineeringHealth: number;
  projectProgress: number;
  impactScore: number;
  readinessScore: number;

  // Design Thinking Stages Data (Milestone 6)
  empathise: EmpathiseData;
  define: DefineData;
  ideate: Idea[];
  prototype: PrototypeVersion[];
  test: TestRecord[];
  innovationScores: InnovationScores;

  // Engineering metrics
  codeQuality: number;
  testCoverage: number;
  buildStatus: "passing" | "failing";
  openIssuesCount: number;
}
