import { InnovationProject } from "../types/innovation";

const STORAGE_KEY = "devflow_innovation_projects";

const INITIAL_MOCK_PROJECTS: InnovationProject[] = [
  {
    id: "proj-1",
    name: "EduTech Offline Hub",
    problemStatement:
      "Children in remote rural villages lack stable internet access, preventing them from benefiting from modern digital learning resources.",
    proposedSolution:
      "A low-cost, solar-powered local micro-server running containerized educational software that acts as an offline digital library.",
    innovationTheme: "Education",
    sdgGoals: ["Goal 4: Quality Education", "Goal 10: Reduced Inequalities"],
    targetBeneficiaries:
      "Students and teachers in communities without grid connectivity.",
    expectedImpact:
      "Provide modern curriculum access to over 10,000 rural students, improving regional literacy rates.",
    successMetrics:
      "10,000 student hours logged, 85% average quiz scores, 30 active micro-servers deployed.",
    projectStage: "Validation",
    teamMembers: [
      { name: "Dr. Ananya Rao", role: "Principal Researcher" },
      { name: "David Chen", role: "Hardware Engineer" },
      { name: "Sarah Smith", role: "Curriculum Advisor" },
    ],
    timeline: "Q1 - Q4 2026",
    priority: "High",
    innovationScore: 88,
    engineeringHealth: 92,
    projectProgress: 75,
    impactScore: 90,
    readinessScore: 80,
    codeQuality: 94,
    testCoverage: 88,
    buildStatus: "passing",
    openIssuesCount: 4,
  },
  {
    id: "proj-2",
    name: "BioPurify Filter System",
    problemStatement:
      "High water salinity and impurities in coastal NGO operation zones cause waterborne health issues for local families.",
    proposedSolution:
      "An open-source gravity-fed bio-sand and charcoal filter utilizing local materials to purge pathogens and salt concentrations.",
    innovationTheme: "Clean Water",
    sdgGoals: [
      "Goal 6: Clean Water and Sanitation",
      "Goal 3: Good Health and Well-being",
    ],
    targetBeneficiaries: "Coastal families and low-income fishing communities.",
    expectedImpact:
      "Deliver pure drinking water to 500 households, cutting waterborne illnesses by 90%.",
    successMetrics:
      "Daily output of 10,000 liters, water purity rating of 99.2%, zero reported cholera cases.",
    projectStage: "Scaling",
    teamMembers: [
      { name: "Mark Peterson", role: "NGO Operations Lead" },
      { name: "Elena Rostova", role: "Environmental Scientist" },
    ],
    timeline: "Q2 2025 - Q2 2026",
    priority: "High",
    innovationScore: 82,
    engineeringHealth: 85,
    projectProgress: 90,
    impactScore: 95,
    readinessScore: 92,
    codeQuality: 88,
    testCoverage: 80,
    buildStatus: "passing",
    openIssuesCount: 2,
  },
  {
    id: "proj-3",
    name: "EcoCycle AI Sorter",
    problemStatement:
      "Inefficient manual sorting of plastics in urban recycling centers results in downcycling and high municipal landfill waste.",
    proposedSolution:
      "A lightweight computer-vision model running on edge microcontrollers attached to mechanical pneumatic sorters.",
    innovationTheme: "Sustainability",
    sdgGoals: [
      "Goal 12: Responsible Consumption and Production",
      "Goal 11: Sustainable Cities and Communities",
    ],
    targetBeneficiaries:
      "Municipal sorting hubs and local sorting cooperatives.",
    expectedImpact:
      "Increase recycling sorting speed by 300% and recovery purity to 98% for PET and HDPE.",
    successMetrics:
      "10 metric tons processed daily, sorting accuracy above 97.5%, sorting cost reduced by 40%.",
    projectStage: "Prototyping",
    teamMembers: [
      { name: "Linus Odegard", role: "AI Research Lead" },
      { name: "Priya Nair", role: "Robotics Engineer" },
    ],
    timeline: "Q3 2026 - Q2 2027",
    priority: "Medium",
    innovationScore: 95,
    engineeringHealth: 78,
    projectProgress: 35,
    impactScore: 86,
    readinessScore: 50,
    codeQuality: 82,
    testCoverage: 75,
    buildStatus: "passing",
    openIssuesCount: 12,
  },
];

export class InnovationService {
  /**
   * Fetch all projects from LocalStorage.
   * If empty, initialize with initial mock data.
   */
  static getProjects(): InnovationProject[] {
    if (typeof window === "undefined") {
      return INITIAL_MOCK_PROJECTS;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_PROJECTS));
      return INITIAL_MOCK_PROJECTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_MOCK_PROJECTS;
    }
  }

  /**
   * Save a project (create or update).
   */
  static saveProject(project: InnovationProject): InnovationProject[] {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);

    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return projects;
  }

  /**
   * Delete a project.
   */
  static deleteProject(id: string): InnovationProject[] {
    const projects = this.getProjects().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return projects;
  }

  /**
   * Calculate aggregated workspace statistics
   */
  static getWorkspaceStats(projects: InnovationProject[]) {
    if (projects.length === 0) {
      return {
        avgInnovation: 0,
        avgHealth: 0,
        avgProgress: 0,
        avgImpact: 0,
        avgReadiness: 0,
      };
    }
    const sum = projects.reduce(
      (acc, curr) => {
        acc.innovation += curr.innovationScore;
        acc.health += curr.engineeringHealth;
        acc.progress += curr.projectProgress;
        acc.impact += curr.impactScore;
        acc.readiness += curr.readinessScore;
        return acc;
      },
      { innovation: 0, health: 0, progress: 0, impact: 0, readiness: 0 },
    );
    const count = projects.length;
    return {
      avgInnovation: Math.round(sum.innovation / count),
      avgHealth: Math.round(sum.health / count),
      avgProgress: Math.round(sum.progress / count),
      avgImpact: Math.round(sum.impact / count),
      avgReadiness: Math.round(sum.readiness / count),
    };
  }
}
