import { CouncilProjectData } from "../types/council";

const STORAGE_KEY = "devflow_council_data";

const INITIAL_COUNCIL_DATA: CouncilProjectData[] = [
  {
    projectId: "proj-1",
    advisors: [
      {
        advisorId: "mentor",
        advisorName: "Dr. Karen Vance",
        role: "Innovation Mentor",
        score: 92,
        confidence: 90,
        strengths: [
          "Zero-bandwidth WiFi broadcasting is highly creative and contextually appropriate.",
          "Overcomes physical school-book supply log-jams directly.",
        ],
        weaknesses: [
          "Needs clearer user-incentive models so teachers voluntarily open the server daily.",
        ],
        recommendations: [
          "Include a gamified learning points system for students to encourage self-directed study.",
        ],
      },
      {
        advisorId: "architect",
        advisorName: "Alex Chen",
        role: "Technical Architect",
        score: 86,
        confidence: 95,
        strengths: [
          "Raspberry Pi local server setup keeps bill-of-materials cost under $45 per schoolhouse.",
          "Using SQLite is excellent for zero-administration, zero-maintenance database local needs.",
        ],
        weaknesses: [
          "Lithium batteries will degrade quickly under hot, high-humidity monsoon conditions if unshielded.",
        ],
        recommendations: [
          "Integrate an IP65 waterproof container casing and simple LED battery status level indicators.",
        ],
      },
      {
        advisorId: "ux",
        advisorName: "Sarah Jenkins",
        role: "UX & Accessibility Expert",
        score: 82,
        confidence: 88,
        strengths: [
          "Focus on Kannada localized audio translates scientific diagrams to blind or illiterate users.",
          "Zero-friction captive portal setup matches target user digital literacy standards.",
        ],
        weaknesses: [
          "CAPTCHA tests or complex login screens will create major friction for younger children.",
        ],
        recommendations: [
          "Use card-based picture avatar selectors for student logins instead of text passwords.",
        ],
      },
      {
        advisorId: "sustainability",
        advisorName: "Elena Rostova",
        role: "Sustainability Advisor",
        score: 90,
        confidence: 92,
        strengths: [
          "Utilizes low-wattage solar cells to bypass local grid failures entirely.",
          "Local NGO partnerships guarantee device repairs and hardware lifecycle sustainability.",
        ],
        weaknesses: [
          "No defined electronic recycling pathway for old solar battery blocks.",
        ],
        recommendations: [
          "Implement a 'take-back' program with lead-acid local suppliers to safely recycle depleted battery packs.",
        ],
      },
      {
        advisorId: "strategist",
        advisorName: "Marcus Sterling",
        role: "Business Strategist",
        score: 80,
        confidence: 85,
        strengths: [
          "Extremely high market feasibility and cost ratio advantages compared to buying tablet data packs.",
          "Educational NGO funding routes align with corporate social responsibility mandates in India.",
        ],
        weaknesses: [
          "Recurring costs of updating syllabus curriculum materials on offline servers are not fully costed.",
        ],
        recommendations: [
          "Onboard mobile learning vans to carry new SD flash-cards to sync servers during routine site visits.",
        ],
      },
      {
        advisorId: "research",
        advisorName: "Dr. Linda Gupta",
        role: "Research Advisor",
        score: 88,
        confidence: 90,
        strengths: [
          "Excellent primary field documentation including interviews with rural headmistress Gowda.",
          "Observation diary clarifies home-life device scarcity correctly.",
        ],
        weaknesses: [
          "Lacks baseline test-score statistics from target schools to measure post-installation learning jumps.",
        ],
        recommendations: [
          "Run a baseline math and science quiz loop for 100 students before deploying servers.",
        ],
      },
      {
        advisorId: "ethics",
        advisorName: "Devon Foster",
        role: "Ethics & Privacy Advisor",
        score: 85,
        confidence: 92,
        strengths: [
          "Total offline design prevents kid tracking or metadata storage by external commercial advertisers.",
          "Zero personal data is synchronized to public cloud servers.",
        ],
        weaknesses: [
          "Teacher admin panels could allow tracking of individual child quiz failure records.",
        ],
        recommendations: [
          "Anonymize grade metrics on the local SQLite server and display progress in aggregate views only.",
        ],
      },
      {
        advisorId: "samsung",
        advisorName: "Solve for Tomorrow Engine",
        role: "Samsung Judge Simulator",
        score: 90,
        confidence: 95,
        strengths: [
          "High alignment with Solve for Tomorrow social-impact goals by assisting marginalized students.",
          "Novel combining of solar micro-servers and local wifi capture pages.",
        ],
        weaknesses: [
          "Hardware component durability needs field testing proofs before scaling presentations.",
        ],
        recommendations: [
          "Include a detailed 'Hardware validation report' in the final stage submission package.",
        ],
      },
    ],
    consensus: {
      overallInnovationScore: 89,
      overallReadiness: 85,
      topRisks: [
        "Monsoon battery degradation and humidity damage to micro-servers.",
        "Teacher adoption overhead if setup workflow requires complex daily configurations.",
      ],
      highestStrengths: [
        "Highly context-appropriate WiFi offline captive portal deployment.",
        "Kannada local language voice narration modules bypass literacy barriers.",
      ],
      highestPriorities: [
        "Finalize IP65 weatherproofing container casing design specs.",
        "Add picture-avatar student logins to clear user interface friction.",
      ],
      immediateActions: [
        "Onboard local potter/casing workshop to prototype server shells.",
        "Deploy a baseline science quiz to 100 children in pilot village Kolar.",
      ],
    },
    report: {
      executiveSummary:
        "EduTech Offline Hub utilizes a solar-powered micro-server to stream containerized syllabus lessons to students without grid energy or internet access. Evaluators agree the project has exceptionally high social impact and novel localized technology configurations.",
      overallRecommendation:
        "Proceed to Stage 3 prototype testing. Focus heavily on battery shielding and teacher onboarding simplification loops.",
      priorityImprovements: [
        "Deploy IP65 weatherproof server casing designs.",
        "Build card-based student logins to assist illiterate primary children.",
        "Establish an electronic battery take-back recycling partnership.",
      ],
    },
  },
  {
    projectId: "proj-2",
    advisors: [
      {
        advisorId: "mentor",
        advisorName: "Dr. Karen Vance",
        role: "Innovation Mentor",
        score: 95,
        confidence: 92,
        strengths: [
          "Brilliant combining of local pottery artisans with charcoal filtration technology.",
          "Directly addresses critical water contamination issues in salinity zones.",
        ],
        weaknesses: [
          "The mechanical process is standard, but the local economic integration model is highly novel.",
        ],
        recommendations: [
          "Highlight the community co-creation model when presenting to sustainability judges.",
        ],
      },
      {
        advisorId: "architect",
        advisorName: "Alex Chen",
        role: "Technical Architect",
        score: 90,
        confidence: 95,
        strengths: [
          "Clay pot sand-charcoal setup does not require any electricity grid or battery backups.",
          "Coconut charcoal block is simple to bake locally using agricultural waste.",
        ],
        weaknesses: [
          "Filter sand and charcoal elements clog with silt, reducing water flow after 4 months.",
        ],
        recommendations: [
          "Build a primary coarse sand sedimentation layer to clear heavy silt beforehand.",
        ],
      },
      {
        advisorId: "ux",
        advisorName: "Sarah Jenkins",
        role: "UX & Accessibility Expert",
        score: 85,
        confidence: 90,
        strengths: [
          "Painting instructions directly on the clay pots via visual icons bypasses language barriers.",
          "Zero-tool assembly fits the home resources of rural Satkhira families.",
        ],
        weaknesses: [
          "Lacks any indicator to warn users when the charcoal layer has exhausted its filtering capacity.",
        ],
        recommendations: [
          "Include a simple, zero-cost paper test-strip packet to verify water output purity.",
        ],
      },
      {
        advisorId: "sustainability",
        advisorName: "Elena Rostova",
        role: "Sustainability Advisor",
        score: 96,
        confidence: 95,
        strengths: [
          "Extremely low carbon footprint since clay casings are baked in local clay kilns.",
          "Creates circular income streams for local potter artisans.",
        ],
        weaknesses: [
          "Intense wood fuel usage for baking clay pots could accelerate local deforestation.",
        ],
        recommendations: [
          "Onboard potters using modern agricultural crop-residue fueled baking kilns.",
        ],
      },
      {
        advisorId: "strategist",
        advisorName: "Marcus Sterling",
        role: "Business Strategist",
        score: 88,
        confidence: 88,
        strengths: [
          "System unit cost under $5 is highly affordable, bypassing bottled-water truck fees.",
          "High scaling possibilities through regional disaster relief agencies.",
        ],
        weaknesses: [
          "Lacks a commercial model for local potters to distribute charcoal filter refills sustainably.",
        ],
        recommendations: [
          "Establish an active filter replacement cooperative run by village women entrepreneurs.",
        ],
      },
      {
        advisorId: "research",
        advisorName: "Dr. Linda Gupta",
        role: "Research Advisor",
        score: 92,
        confidence: 92,
        strengths: [
          "Thorough primary validation detailing walks to brackish pond sites.",
          "Clinical indicators match waterborne pathogen reports from local medical centers.",
        ],
        weaknesses: [
          "Lacks seasonal variations testing since pond turbidity peaks during monsoons.",
        ],
        recommendations: [
          "Test filtration flow rates using monsoon silt pond water samples.",
        ],
      },
      {
        advisorId: "ethics",
        advisorName: "Devon Foster",
        role: "Ethics & Privacy Advisor",
        score: 90,
        confidence: 94,
        strengths: [
          "Directly addresses the fundamental human right to clean water.",
          "Zero tracking devices or digital privacy threats.",
        ],
        weaknesses: [
          "Must ensure the lowest-income households receive free filter kits to prevent health inequalities.",
        ],
        recommendations: [
          "Collaborate with village councils to distribute initial 50 filter units to families below poverty line.",
        ],
      },
      {
        advisorId: "samsung",
        advisorName: "Solve for Tomorrow Engine",
        role: "Samsung Judge Simulator",
        score: 94,
        confidence: 96,
        strengths: [
          "Extremely high score in the 'Community Social Impact' dimension.",
          "High alignment with regional environmental sustainability priorities.",
        ],
        weaknesses: [
          "Presentation slide deck needs more visual diagrams explaining filter layers.",
        ],
        recommendations: [
          "Include a clear cross-sectional diagram showing sand, gravel, and charcoal blocks.",
        ],
      },
    ],
    consensus: {
      overallInnovationScore: 92,
      overallReadiness: 90,
      topRisks: [
        "Silt clogging filtration layers, causing flow speed failures.",
        "Potter kilns accelerating local wood deforestation rates.",
      ],
      highestStrengths: [
        "Extremely affordable clay-charcoal modular design costing under $5.",
        "Visual instructions painted directly on pots bypass literacy barriers.",
      ],
      highestPriorities: [
        "Add a primary coarse pre-filter sedimentation layer.",
        "Establish local replacement charcoal cooperatives.",
      ],
      immediateActions: [
        "Onboard local Satkhira potters to test crop-residue kilns.",
        "Distribute zero-cost purity testing strips for pilot village households.",
      ],
    },
    report: {
      executiveSummary:
        "BioPurify Filter System combines sand-charcoal gravity filtration with locally produced clay pot casings to remove salinity and pathogens from coastal drinking water. Evaluators highlight outstanding social impact and extreme affordability indicators.",
      overallRecommendation:
        "Proceed to scale pilot deployment immediately. Simplify charcoal layer replacement logistics through local women cooperatives.",
      priorityImprovements: [
        "Include a primary coarse sand pre-filter sedimentation chamber.",
        "Onboard potters using green agricultural waste-fueled kilns.",
        "Introduce simple zero-cost output purity test strips.",
      ],
    },
  },
];

export class CouncilService {
  /**
   * Fetch all council evaluations.
   * If empty, initialize with default templates.
   */
  static getAllCouncilData(): CouncilProjectData[] {
    if (typeof window === "undefined") {
      return INITIAL_COUNCIL_DATA;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COUNCIL_DATA));
      return INITIAL_COUNCIL_DATA;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_COUNCIL_DATA;
    }
  }

  /**
   * Fetch council evaluation for a specific project.
   * If none exists, create a default template.
   */
  static getCouncilForProject(projectId: string): CouncilProjectData {
    const list = this.getAllCouncilData();
    const found = list.find((d) => d.projectId === projectId);
    if (found) {
      return found;
    }

    // Default template
    const newCouncil: CouncilProjectData = {
      projectId,
      advisors: [
        {
          advisorId: "mentor",
          advisorName: "Dr. Karen Vance",
          role: "Innovation Mentor",
          score: 60,
          confidence: 70,
          strengths: ["Creative concept basis."],
          weaknesses: ["Requires competitor differentiation parameters."],
          recommendations: ["Perform an in-depth patent search."],
        },
        {
          advisorId: "architect",
          advisorName: "Alex Chen",
          role: "Technical Architect",
          score: 60,
          confidence: 70,
          strengths: ["Technical framework fits modern standards."],
          weaknesses: ["Scale constraints not detailed."],
          recommendations: ["Outline server deployment parameters."],
        },
        {
          advisorId: "ux",
          advisorName: "Sarah Jenkins",
          role: "UX & Accessibility Expert",
          score: 60,
          confidence: 70,
          strengths: ["User flow is straightforward."],
          weaknesses: ["Lacks screen reader support details."],
          recommendations: [
            "Incorporate ARIA compliance tags into layout views.",
          ],
        },
        {
          advisorId: "sustainability",
          advisorName: "Elena Rostova",
          role: "Sustainability Advisor",
          score: 60,
          confidence: 70,
          strengths: ["Minimizes resource consumption."],
          weaknesses: ["No hardware recycling logs provided."],
          recommendations: ["Draft recycling take-back procedures."],
        },
        {
          advisorId: "strategist",
          advisorName: "Marcus Sterling",
          role: "Business Strategist",
          score: 60,
          confidence: 70,
          strengths: ["Fills an active demand gap."],
          weaknesses: ["Pricing framework is vague."],
          recommendations: ["Build detailed local subscription tiers."],
        },
        {
          advisorId: "research",
          advisorName: "Dr. Linda Gupta",
          role: "Research Advisor",
          score: 60,
          confidence: 70,
          strengths: ["Primary interviews completed."],
          weaknesses: ["Lacks quantitative survey evidence."],
          recommendations: ["Survey 30 regional target beneficiaries."],
        },
        {
          advisorId: "ethics",
          advisorName: "Devon Foster",
          role: "Ethics & Privacy Advisor",
          score: 60,
          confidence: 70,
          strengths: ["Complies with general data privacy standards."],
          weaknesses: ["User consent flow needs clarification."],
          recommendations: [
            "Integrate explicit cookie and record consent panels.",
          ],
        },
        {
          advisorId: "samsung",
          advisorName: "Solve for Tomorrow Engine",
          role: "Samsung Judge Simulator",
          score: 60,
          confidence: 70,
          strengths: ["Targets community social values."],
          weaknesses: ["Durability targets need metrics."],
          recommendations: ["Include physical testing pilot outcomes."],
        },
      ],
      consensus: {
        overallInnovationScore: 60,
        overallReadiness: 60,
        topRisks: ["Competitor replication.", "Unclear deployment logistics."],
        highestStrengths: [
          "Strong community target values.",
          "Low-cost local framework designs.",
        ],
        highestPriorities: [
          "Conduct beneficiary testing.",
          "Define operational cost sheets.",
        ],
        immediateActions: [
          "Draft initial user survey worksheets.",
          "Establish pricing model parameters.",
        ],
      },
      report: {
        executiveSummary:
          "Evaluators confirm the project addresses real social values but requires further logistical and technical definition stages before scaling.",
        overallRecommendation:
          "Continue iterating prototype parameters. Define concrete operational metrics.",
        priorityImprovements: [
          "Perform detailed patent surveys.",
          "Integrate visual accessibility narration helpers.",
        ],
      },
    };

    const updatedList = [...list, newCouncil];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return newCouncil;
  }

  /**
   * Save council evaluation data.
   */
  static saveCouncilData(data: CouncilProjectData): CouncilProjectData[] {
    const list = this.getAllCouncilData();
    const idx = list.findIndex((d) => d.projectId === data.projectId);
    if (idx >= 0) {
      list[idx] = data;
    } else {
      list.push(data);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  }
}
