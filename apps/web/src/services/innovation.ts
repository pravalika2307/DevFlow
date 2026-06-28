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

    // Design Thinking Stage Data
    empathise: {
      targetUser:
        "Rural students aged 8-15 and primary school teachers with basic smartphone skills.",
      userPersona:
        "Ramesh, a 12-year-old student who wants to study science but has no textbooks or home electricity.",
      goals:
        "Access high-quality interactive videos, download science modules, and practice self-assessments.",
      pains:
        "Must walk 4km to get spotty 2G mobile signal; lack of educational textbooks at home.",
      behaviours:
        "Shares a single mobile phone with 5 family members; highly eager to learn via visual aids.",
      needs:
        "A zero-cost, offline educational database that does not require cellular data packages.",
    },
    define: {
      problemStatement:
        "How can we deliver interactive, digital educational content to remote rural students who do not have reliable cellular connectivity or home electricity?",
      opportunityStatement:
        "Providing offline solar-powered local servers leverages container technology to enable localized, free digital schoolhouses.",
      howMightWe:
        "How might we build an offline digital library that lets rural schoolkids stream educational videos without using any mobile data?",
      successMetrics:
        "Monthly active learners per server, quiz completion rates, and solar battery discharge cycles.",
    },
    ideate: [
      {
        id: "idea-1-1",
        title: "Micro-SD Card Preload Distribution",
        description:
          "Pre-load offline learning videos onto physical micro-SD cards and distribute them directly to teachers.",
        innovationScore: 60,
        feasibility: 90,
        socialImpact: 70,
        aiRecommendation:
          "Highly feasible but physical logistics are expensive and updates are difficult.",
        isSelected: false,
      },
      {
        id: "idea-1-2",
        title: "Offline Solar Local Wifi Server",
        description:
          "Deploy solar-powered local Raspberry Pi servers that broadcast a localized free Wifi hotspot containing hosted video contents.",
        innovationScore: 95,
        feasibility: 82,
        socialImpact: 92,
        aiRecommendation:
          "Highly innovative, self-sustaining, and scalable with excellent local network throughput.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-1-1",
        version: "v0.1.0",
        figmaLink: "https://figma.com/file/edutech-wireframe-v1",
        githubRepo: "https://github.com/devflow/edutech-microserver",
        demoUrl: "http://offline-demo.local",
        screenshots:
          "Text-based admin panel, offline dashboard displaying mock courses, basic static file index.",
        notes:
          "Initial prototype built on a Raspberry Pi 4 with a basic USB battery bank. Wifi hotspot coverage extends to 15 meters.",
        createdAt: "2026-02-15",
      },
      {
        id: "proto-1-2",
        version: "v1.0.0",
        figmaLink: "https://figma.com/file/edutech-hifi-design",
        githubRepo: "https://github.com/devflow/edutech-microserver",
        demoUrl: "http://edu-hub.local",
        screenshots:
          "Sleek dark learning dashboard, progressive web app installation page, interactive mock quizzes.",
        notes:
          "Upgraded with a customized solar panel charging controller and weather-proof casing. Hotspot range boosted to 40 meters.",
        createdAt: "2026-05-10",
      },
    ],
    test: [
      {
        id: "test-1-1",
        testUsers: "5 teachers and 20 students at Kolar Rural School.",
        feedback:
          "Students loved the video speeds since there was zero buffer delay. Teachers requested a dashboard to upload custom local content.",
        improvements:
          "Added an admin page for teachers to upload local text files via a simple local form.",
        pendingIssues:
          "Solar battery performance during heavy monsoon seasons needs continuous stress testing.",
        lessonsLearned:
          "Physical ease of use is critical; teachers preferred a simple single-button reboot mechanism.",
        createdAt: "2026-05-25",
      },
    ],
    innovationScores: {
      problemClarity: 90,
      innovation: 88,
      feasibility: 82,
      socialImpact: 90,
      aiReadiness: 78,
      scalability: 85,
      sustainability: 92,
    },
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

    // Design Thinking Stage Data
    empathise: {
      targetUser:
        "Households in coastal fishing villages lacking municipal tap pipelines.",
      userPersona:
        "Fatima, a mother of four who boils salty pond water daily, spending 20% of income on firewood.",
      goals:
        "Obtain clean water that is safe for children to drink without buying expensive firewood or water bottles.",
      pains:
        "Frequent diarrhea in children; high fuel costs; bad taste from boiled saline pond water.",
      behaviours:
        "Spends 2 hours daily collecting wood and water; stores water in clay pots.",
      needs:
        "A low-maintenance purification filter made of cheap, accessible local materials.",
    },
    define: {
      problemStatement:
        "How can coastal families purify saline, contaminated pond water into safe drinking water without incurring ongoing wood fuel or chemical purchase costs?",
      opportunityStatement:
        "Combining local bio-sand filtration layers with activated coconut charcoal allows low-cost gravity-based purification.",
      howMightWe:
        "How might we create a zero-energy water filter using only gravel, sand, and locally available organic charcoal?",
      successMetrics:
        "Daily liters purified, reduction in fecal coliform count, filter layer durability.",
    },
    ideate: [
      {
        id: "idea-2-1",
        title: "Gravity-Fed Layered Clay Pot Filter",
        description:
          "Stack three local clay pots filled with gravel, active sand, and crushed coconut shell charcoal respectively.",
        innovationScore: 85,
        feasibility: 95,
        socialImpact: 95,
        aiRecommendation:
          "Outstanding social impact and feasibility. Highly cost-effective and culturally familiar.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-2-1",
        version: "v1.0.0",
        figmaLink: "https://figma.com/file/biopurify-blueprints",
        githubRepo: "https://github.com/devflow/biopurify-cad",
        demoUrl: "http://biopurify.org/blueprint",
        screenshots:
          "3D CAD blueprint drawings, assembly instruction guide pages.",
        notes:
          "Initial prototype constructed in the NGO office yard. Filtration output tested at 5 liters per hour.",
        createdAt: "2025-08-01",
      },
    ],
    test: [
      {
        id: "test-2-1",
        testUsers: "12 households in Satkhira coastal village.",
        feedback:
          "Water turbidity dropped immediately and taste improved. Users noted the charcoal layer needs replacement every 4 months.",
        improvements:
          "Designed a simple mesh cartridge for the charcoal layer to make replacements tool-free.",
        pendingIssues:
          "Testing biological contaminants removal over long periods (6+ months).",
        lessonsLearned:
          "Providing clear visual color indicators (clean vs dirty) in instructions helps adoption.",
        createdAt: "2025-11-10",
      },
    ],
    innovationScores: {
      problemClarity: 95,
      innovation: 80,
      feasibility: 95,
      socialImpact: 96,
      aiReadiness: 70,
      scalability: 90,
      sustainability: 95,
    },
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

    // Design Thinking Stage Data
    empathise: {
      targetUser:
        "Municipal waste sorting plant managers and local cooperative sorting workers.",
      userPersona:
        "Arjun, a 34-year-old sorting line supervisor exposed to toxic dust who manages a team sorting 2 tons of waste daily.",
      goals:
        "Speed up sorting, reduce physical exposure to harmful chemical residues, and minimize sorting mistakes.",
      pains:
        "Skin rashes from handling contaminated materials; high turnover of workers; low pricing due to mixed plastic contamination.",
      behaviours:
        "Sorts plastics solely by visual shape and touch; works under loud, fast conveyor line settings.",
      needs:
        "An automated assistant that filters out clear PET and HDPE bottles safely before manual handling.",
    },
    define: {
      problemStatement:
        "How can municipal waste facilities automatically sort PET and HDPE plastics from rapid conveyor lines without requiring high manual labour exposure?",
      opportunityStatement:
        "Deploying Edge computer-vision sensors on existing mechanical lines enables cheap retrofitting.",
      howMightWe:
        "How might we use camera feeds and AI edge nodes to trigger air jets that sort recyclable plastics on a moving conveyor belt?",
      successMetrics:
        "Frames processed per second, classification accuracy, pneumatic nozzle valve latency.",
    },
    ideate: [
      {
        id: "idea-3-1",
        title: "Laser Spectroscopy Sorter",
        description:
          "Deploy NIR spectroscopy sensors to analyze chemical signatures of moving plastics.",
        innovationScore: 90,
        feasibility: 50,
        socialImpact: 80,
        aiRecommendation:
          "Highly accurate but extremely expensive and complex to build locally.",
        isSelected: false,
      },
      {
        id: "idea-3-2",
        title: "Edge CV Sorter with Air Jets",
        description:
          "Mount a high-speed camera over the conveyor belt connected to an ESP32-CAM or Raspberry Pi running a MobileNet model to trigger pneumatic actuators.",
        innovationScore: 96,
        feasibility: 85,
        socialImpact: 90,
        aiRecommendation:
          "Excellent cost-to-performance ratio; highly adaptable to existing infrastructure.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-3-1",
        version: "v0.1.0",
        figmaLink: "https://figma.com/file/ecocycle-dash",
        githubRepo: "https://github.com/devflow/ecocycle-detector",
        demoUrl: "http://localhost:8080/detect",
        screenshots:
          "Edge classification logger, live video bounding boxes, classification latency chart.",
        notes:
          "Model trained on 5,000 plastic bottle images. Classification takes 80ms on Raspberry Pi 4.",
        createdAt: "2026-05-12",
      },
    ],
    test: [
      {
        id: "test-3-1",
        testUsers: "GreenLoop Recycling sorting hub.",
        feedback:
          "Sorter runs well on clean water bottles but struggles with squashed or dirty containers.",
        improvements:
          "Augmented dataset with dirty, crushed, and partially labeled bottles to retrain the neural net.",
        pendingIssues:
          "Syncing pneumatic valve trigger latency with high-speed conveyor belts.",
        lessonsLearned:
          "Real-world waste is highly deformed; synthetic clean datasets are insufficient.",
        createdAt: "2026-06-05",
      },
    ],
    innovationScores: {
      problemClarity: 92,
      innovation: 95,
      feasibility: 80,
      socialImpact: 88,
      aiReadiness: 85,
      scalability: 90,
      sustainability: 86,
    },
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

  /**
   * Calculate overall Innovation Readiness Score (0-100)
   * Based on 7 dimensions of InnovationScores
   */
  static calculateReadiness(
    scores: InnovationProject["innovationScores"],
  ): number {
    const sum =
      scores.problemClarity +
      scores.innovation +
      scores.feasibility +
      scores.socialImpact +
      scores.aiReadiness +
      scores.scalability +
      scores.sustainability;
    return Math.round(sum / 7);
  }
}
