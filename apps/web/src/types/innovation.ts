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

export interface InnovationProject {
  id: string;
  name: string;
  problemStatement: string;
  proposedSolution: string;
  innovationTheme: string; // e.g. Health, Education, Sustainability, NGO, Startup, etc.
  sdgGoals: string[]; // e.g. ["Goal 3: Good Health", "Goal 4: Quality Education"]
  targetBeneficiaries: string;
  expectedImpact: string;
  successMetrics: string;
  projectStage: ProjectStage;
  teamMembers: TeamMember[];
  timeline: string; // e.g. Q1-Q2 2026
  priority: ProjectPriority;

  // Scores & Metrics (0-100)
  innovationScore: number;
  engineeringHealth: number;
  projectProgress: number;
  impactScore: number;
  readinessScore: number;

  // Engineering metrics
  codeQuality: number;
  testCoverage: number;
  buildStatus: "passing" | "failing";
  openIssuesCount: number;
}
