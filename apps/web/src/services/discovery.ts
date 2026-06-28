import { ProblemDiscoveryData } from "../types/discovery";

const STORAGE_KEY = "devflow_problem_discoveries";

const INITIAL_DISCOVERIES: ProblemDiscoveryData[] = [
  {
    projectId: "proj-1",
    explorer: {
      initialProblem: "Rural students lack digital learning resources.",
      industry: "EdTech",
      location: "Rural India (Karnataka, Kolar region)",
      targetUsers:
        "Children aged 8-15 without grid energy or home internet access.",
      rootCauses: [
        "Inadequate cellular towers and base stations in remote areas.",
        "High subscription cost of data packages relative to local family income.",
        "Lack of electricity grid connectivity at household levels.",
      ],
      hiddenCauses: [
        "Teachers in rural schools lack training on digital syllabus systems.",
        "Device sharing priority is given to working adults instead of students.",
      ],
      stakeholders: [
        "Primary school students",
        "Rural school teachers",
        "Local village councils",
        "Rural educational NGOs",
      ],
      existingSolutions: [
        "Distribution of physical books and static educational worksheets.",
        "Mobile cellular learning vans driving out weekly.",
      ],
      whyFailures: [
        "Physical logistics are slow, expensive, and books decay rapidly.",
        "Vans are subject to weather delays and offer low contact time per child.",
      ],
      innovationOpportunities: [
        "Broadcasting containerized courses locally using zero-cost Wifi hotspots.",
        "Self-powered solar micro-servers that require no active internet uplink.",
      ],
    },
    userResearch: [
      {
        id: "rec-1-1",
        type: "Interview",
        title: "Interview with Headmistress Gowda",
        content:
          "She noted that tablets are useless if children cannot download videos. Standard apps crash when connection drops mid-download. Offline is non-negotiable.",
        author: "Sarah Smith",
        createdAt: "2026-02-28",
      },
      {
        id: "rec-1-2",
        type: "Observation",
        title: "Home Observation (Ramesh's Household)",
        content:
          "The family has one smartphone. Father takes it to the farm at 6am, returns at 7pm. রমেশ reads under single kerosene lamp. Device time is scarce.",
        author: "Sarah Smith",
        createdAt: "2026-03-05",
      },
      {
        id: "rec-1-3",
        type: "Quote",
        title: "Ramesh (Student, 12yo)",
        content:
          "'I want to watch the solar system video again, but father says we have no phone money left this month.'",
        author: "Sarah Smith",
        createdAt: "2026-03-08",
      },
    ],
    rootCause: {
      fiveWhys: [
        {
          whyNumber: 1,
          question: "Why do rural students lag behind in science?",
          answer:
            "Because they lack access to visual, interactive educational content.",
        },
        {
          whyNumber: 2,
          question: "Why do they lack access to visual content?",
          answer:
            "Because streaming videos requires high-speed internet bandwidth.",
        },
        {
          whyNumber: 3,
          question: "Why is there no high-speed internet?",
          answer:
            "Because telecom towers are not commercially viable for grid-less villages.",
        },
        {
          whyNumber: 4,
          question: "Why are towers not commercially viable?",
          answer:
            "Because local families cannot afford cellular data subscription packages.",
        },
        {
          whyNumber: 5,
          question: "Why can't they afford packages?",
          answer:
            "Because mobile data costs are priced for urban incomes, not rural subsistence earners.",
        },
      ],
      fishbone: [
        {
          category: "Technology",
          causes: ["Lack of base network towers", "No home internet routers"],
        },
        {
          category: "People",
          causes: [
            "Low smartphone literacy in parents",
            "Teacher technology resistance",
          ],
        },
        {
          category: "Environment",
          causes: [
            "Frequent power outages",
            "High environmental dust damages hardware",
          ],
        },
        {
          category: "Process",
          causes: [
            "Syllabus updates require online synchronization",
            "Slow manual distribution of micro-SD cards",
          ],
        },
        {
          category: "Policy",
          causes: [
            "Zero national subsidies for rural education data",
            "Rigid brick-and-mortar curriculum regulations",
          ],
        },
      ],
    },
    opportunities: [
      {
        id: "opp-1-1",
        title: "Localized Pi-based Video hotspot",
        description:
          "Configure Raspberry Pi to run a local offline hotspot that streams preloaded modules without cellular bandwidth.",
        type: "High Impact",
        impact: 95,
        feasibility: 85,
        scalability: 90,
        novelty: 92,
      },
      {
        id: "opp-1-2",
        title: "Monsoon Solar Backups",
        description:
          "Build an auto-switching dual-battery system using local recycled lead-acid cells to ensure 24/7 uptime.",
        type: "Quick Win",
        impact: 75,
        feasibility: 95,
        scalability: 70,
        novelty: 60,
      },
    ],
    confidence: {
      researchCompleteness: 85,
      userUnderstanding: 92,
      problemClarity: 90,
      evidenceStrength: 80,
      validationLevel: 75,
    },
    recommendations: {
      missingInterviews: [
        "Interview rural electricity grid officers about upcoming extension timelines.",
        "Survey secondary school children in neighboring districts.",
      ],
      weakAssumptions: [
        "Assuming that teachers will voluntarily switch on the solar server daily.",
        "Assuming children have access to WiFi-enabled devices at home.",
      ],
      researchGaps: [
        "Data regarding smartphone ownership rates among rural primary school students is missing.",
        "Hardware life expectancy in high humidity monsoon climates is unmeasured.",
      ],
      missingStakeholders: [
        "Telecom regulatory experts.",
        "Regional literacy curriculum architects.",
      ],
      potentialBiases: [
        "Urban designer bias: assuming students naturally understand touch-gesture interface menus.",
      ],
      ethicalConsiderations: [
        "Equal access: ensure girls have equal time slots to borrow the tablet device, as boys are often prioritized.",
      ],
      accessibilityImprovements: [
        "Add regional Kannada audio translation modules for students who cannot read text well.",
      ],
    },
  },
  {
    projectId: "proj-2",
    explorer: {
      initialProblem: "High salinity in drinking water.",
      industry: "Clean Water",
      location: "Coastal Regions (Satkhira, Bangladesh border zones)",
      targetUsers:
        "Coastal villagers and fishing families using local brackish pond water.",
      rootCauses: [
        "Sea-level rise pushing seawater inland into fresh aquifers.",
        "Destruction of natural mangrove barriers that block saline encroachment.",
      ],
      hiddenCauses: [
        "Local shrimp farming cooperatives pumping seawater into inland ponds.",
        "Over-extraction of fresh groundwater from shallow tube wells.",
      ],
      stakeholders: [
        "Coastal households",
        "Shrimp farmers",
        "Public health officers",
        "Pond owners",
      ],
      existingSolutions: [
        "Buying expensive plastic bottled water from trucks.",
        "Boiling saline water to distill, using firewood.",
      ],
      whyFailures: [
        "Bottled water costs are too high, taking up 35% of daily wages.",
        "Firewood is scarce, causes severe respiratory smoke inhalation, and boiling does not remove salt.",
      ],
      innovationOpportunities: [
        "Gravity-based layered sand filtration using local activated charcoal.",
        "Low-cost domestic solar desalination stills.",
      ],
    },
    userResearch: [
      {
        id: "rec-2-1",
        type: "Interview",
        title: "Interview with Fatima (Mother of 4)",
        content:
          "Reports that three of her children suffered stomach pain this week. Boiling water doesn't remove the salt taste, and children refuse to drink it.",
        author: "Mark Peterson",
        createdAt: "2025-09-12",
      },
      {
        id: "rec-2-2",
        type: "Observation",
        title: "Water Collection Observation",
        content:
          "She walks 1.5 hours to collect pond water in heavy clay pitchers. The water looks brown-yellow. She strains it through a thin cloth, which does not filter bacteria or salt.",
        author: "Mark Peterson",
        createdAt: "2025-09-20",
      },
    ],
    rootCause: {
      fiveWhys: [
        {
          whyNumber: 1,
          question: "Why are children getting sick?",
          answer:
            "Because they drink untreated saline pond water containing pathogens.",
        },
        {
          whyNumber: 2,
          question: "Why do they drink pond water?",
          answer:
            "Because fresh groundwater wells are high in salt and arsenic.",
        },
        {
          whyNumber: 3,
          question: "Why are fresh wells saline?",
          answer:
            "Because marine saltwater has intruded into the shallow fresh aquifers.",
        },
        {
          whyNumber: 4,
          question: "Why has saltwater intruded?",
          answer:
            "Because mangrove deforestation and shrimp farming channels have allowed ocean water to leak inland.",
        },
        {
          whyNumber: 5,
          question: "Why are mangroves deforested?",
          answer:
            "Because local commercial shrimp farming is more profitable than preserving natural forest barriers.",
        },
      ],
      fishbone: [
        {
          category: "Technology",
          causes: [
            "No local reverse-osmosis filtration",
            "Lack of water testing meters",
          ],
        },
        {
          category: "People",
          causes: [
            "Low awareness of link between saline water and high blood pressure",
            "Belief that boiled water is completely safe",
          ],
        },
        {
          category: "Environment",
          causes: ["Rising sea levels", "Cyclones destroying freshwater ponds"],
        },
        {
          category: "Process",
          causes: [
            "No water transport trucks in isolated villages",
            "Lack of filter maintenance guidelines",
          ],
        },
        {
          category: "Policy",
          causes: [
            "Permissive shrimp farming regulations",
            "No municipal water pipelines extending to coastal zones",
          ],
        },
      ],
    },
    opportunities: [
      {
        id: "opp-2-1",
        title: "Layered sand-charcoal gravity filter",
        description:
          "Stack local clay pots filled with sand and activated coconut charcoal to reduce turbidity and biological pathogens.",
        type: "High Impact",
        impact: 90,
        feasibility: 95,
        scalability: 92,
        novelty: 80,
      },
    ],
    confidence: {
      researchCompleteness: 90,
      userUnderstanding: 95,
      problemClarity: 92,
      evidenceStrength: 88,
      validationLevel: 90,
    },
    recommendations: {
      missingInterviews: [
        "Interview shrimp cooperative leaders regarding salinity drainage solutions.",
      ],
      weakAssumptions: [
        "Assuming activated charcoal is readily purchasable or producible in all coastal regions.",
      ],
      researchGaps: [
        "Exact measurements of biological pathogen levels in ponds across seasons.",
      ],
      missingStakeholders: ["Regional ministry of water resources engineers."],
      potentialBiases: [
        "Designing complex filter replacement cartridges that require tools, ignoring local household resource limits.",
      ],
      ethicalConsiderations: [
        "Ensuring the lowest income households get free sand-filter materials first.",
      ],
      accessibilityImprovements: [
        "Create pictorial instruction guides on filter assembly for illiterate users.",
      ],
    },
  },
];

export class DiscoveryService {
  /**
   * Fetch all problem discoveries.
   * If empty, initialize with mock templates.
   */
  static getAllDiscoveries(): ProblemDiscoveryData[] {
    if (typeof window === "undefined") {
      return INITIAL_DISCOVERIES;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DISCOVERIES));
      return INITIAL_DISCOVERIES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_DISCOVERIES;
    }
  }

  /**
   * Fetch discovery for a specific project.
   * If none exists, create a default template.
   */
  static getDiscoveryForProject(projectId: string): ProblemDiscoveryData {
    const list = this.getAllDiscoveries();
    const found = list.find((d) => d.projectId === projectId);
    if (found) {
      return found;
    }

    // Default template
    const newDiscovery: ProblemDiscoveryData = {
      projectId,
      explorer: {
        initialProblem: "",
        industry: "",
        location: "",
        targetUsers: "",
        rootCauses: [],
        hiddenCauses: [],
        stakeholders: [],
        existingSolutions: [],
        whyFailures: [],
        innovationOpportunities: [],
      },
      userResearch: [],
      rootCause: {
        fiveWhys: [
          {
            whyNumber: 1,
            question: "Why is the problem happening?",
            answer: "",
          },
          { whyNumber: 2, question: "Why is that?", answer: "" },
          { whyNumber: 3, question: "Why?", answer: "" },
          { whyNumber: 4, question: "Why?", answer: "" },
          { whyNumber: 5, question: "Why?", answer: "" },
        ],
        fishbone: [
          { category: "Technology", causes: [] },
          { category: "People", causes: [] },
          { category: "Environment", causes: [] },
          { category: "Process", causes: [] },
          { category: "Policy", causes: [] },
        ],
      },
      opportunities: [],
      confidence: {
        researchCompleteness: 30,
        userUnderstanding: 30,
        problemClarity: 30,
        evidenceStrength: 30,
        validationLevel: 30,
      },
      recommendations: {
        missingInterviews: ["Interview 3 target beneficiaries."],
        weakAssumptions: ["Verify if the problem occurs daily."],
        researchGaps: [
          "Gather quantitative studies about the local demographic.",
        ],
        missingStakeholders: ["Map secondary stakeholders in the community."],
        potentialBiases: ["Account for designer selection bias."],
        ethicalConsiderations: [
          "Ensure privacy protections during interviews.",
        ],
        accessibilityImprovements: [
          "Ensure layout instructions support local languages.",
        ],
      },
    };

    const updatedList = [...list, newDiscovery];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return newDiscovery;
  }

  /**
   * Save problem discovery data.
   */
  static saveDiscovery(data: ProblemDiscoveryData): ProblemDiscoveryData[] {
    const list = this.getAllDiscoveries();
    const idx = list.findIndex((d) => d.projectId === data.projectId);
    if (idx >= 0) {
      list[idx] = data;
    } else {
      list.push(data);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  }

  /**
   * Calculate Research Readiness Score (Section 6)
   */
  static calculateReadiness(
    scores: ProblemDiscoveryData["confidence"],
  ): number {
    const sum =
      scores.researchCompleteness +
      scores.userUnderstanding +
      scores.problemClarity +
      scores.evidenceStrength +
      scores.validationLevel;
    return Math.round(sum / 5);
  }
}
