import { ImpactProjectData } from "../types/impact";

const STORAGE_KEY = "devflow_impact_metrics";

const INITIAL_IMPACT_DATA: ImpactProjectData[] = [
  {
    projectId: "proj-1",
    overallImpactScore: 88,
    innovationReadiness: 82,
    socialImpact: 90,
    technicalFeasibility: 85,
    scalability: 88,
    sustainability: 92,
    accessibility: 80,
    aiReadiness: 75,
    riskLevel: 30,
    beneficiary: {
      primary:
        "Rural primary and secondary school students aged 8-15 without grid energy.",
      secondary:
        "School teachers, community centers, and local parent cooperatives.",
      estimatedUsers:
        "15,000 active students, 120 teachers across 30 villages.",
      geoReach:
        "Kolar and neighboring semi-arid districts in Karnataka state, India.",
      ageGroups: "8 to 15 years old (primary/middle school cohort).",
      incomeGroups:
        "Subsistence agricultural workers earning less than $2/day.",
      accessibilityNeeds:
        "Kannada regional local audio narration; offline, low bandwidth device stream support.",
    },
    sdgs: [
      {
        sdgNumber: 4,
        sdgName: "Quality Education",
        contributionLevel: 95,
        confidence: 90,
        reasoning:
          "Directly supplies complete curriculum textbooks and video lessons to students who lack basic school supplies.",
        outcomes:
          "Average 25% increase in STEM literacy test scores, Q1-Q4 2026.",
      },
      {
        sdgNumber: 10,
        sdgName: "Reduced Inequalities",
        contributionLevel: 85,
        confidence: 85,
        reasoning:
          "Bridges the digital education divide between urban kids with broadband and grid-less rural kids.",
        outcomes:
          "Equitable access to modern syllabus lessons for rural boys and girls alike.",
      },
    ],
    predictions: {
      potentialReach: 92,
      expectedAdoption: 85,
      implementationDifficulty: 40,
      economicBenefit: 78,
      timeToImpact: "3 to 6 months per village installation",
      riskFactors:
        "Solar battery deep discharges during monsoons; hardware component dust protection.",
      sustainabilityScore: 92,
    },
    timeline: {
      threeMonths:
        "Establish 5 testing solar hotspots; onboard local village schoolmistress loops; log initial 500 student video hours.",
      sixMonths:
        "Expand to 15 village schoolhouses; add admin upload panels for local teachers; measure battery degradation rates.",
      oneYear:
        "Reach 30 micro-server installations; local NGO local manufacturing partnerships; track quiz scores improvements.",
      threeYears:
        "Scale across 100 Karnataka districts; release open-source circuit board designs; support over 50,000 learners.",
    },
    risks: [
      {
        category: "Technical",
        severity: "Medium",
        description:
          "Lithium iron phosphate solar batteries degrade prematurely due to high humidity conditions.",
        mitigation:
          "Install IP65 weatherproof casing and automatic thermal cutoff controls.",
      },
      {
        category: "Adoption",
        severity: "Low",
        description:
          "Teachers refuse to operate hardware or charge it daily due to workflow overhead.",
        mitigation:
          "Redesign power logic with a single toggle switch and simple color-LED battery gauges.",
      },
    ],
    inclusivity: {
      scores: {
        ruralScore: 98,
        urbanScore: 30,
        disabilityScore: 70,
        lowInternetScore: 98,
        languageScore: 85,
        affordabilityScore: 95,
        digitalLiteracyScore: 90,
      },
      suggestions: [
        "Include local language audio tracks for all scientific diagrams to help visually impaired students.",
        "Ensure all local pages compile to a size under 5MB for older smartphones with limited storage.",
      ],
    },
  },
  {
    projectId: "proj-2",
    overallImpactScore: 92,
    innovationReadiness: 95,
    socialImpact: 96,
    technicalFeasibility: 92,
    scalability: 90,
    sustainability: 95,
    accessibility: 85,
    aiReadiness: 70,
    riskLevel: 25,
    beneficiary: {
      primary:
        "Coastal households and fishing communities drinking saline/brackish pond water.",
      secondary:
        "Local clay pot artisans, schools, and coastal health clinics.",
      estimatedUsers: "500 households (approx 2,500 villagers) in pilot zone.",
      geoReach:
        "Coastal salinity zones of Satkhira, Bangladesh border regions.",
      ageGroups:
        "All age groups (infants to elderly susceptible to pathogens).",
      incomeGroups: "Artisanal fishermen and mud-crab collectors.",
      accessibilityNeeds:
        "Visual pictorial assembly manuals; zero-energy operation.",
    },
    sdgs: [
      {
        sdgNumber: 6,
        sdgName: "Clean Water and Sanitation",
        contributionLevel: 98,
        confidence: 95,
        reasoning:
          "Gravity sand-charcoal systems extract turbidity, coliforms, and salt from local ponds directly.",
        outcomes:
          "Daily access to 20 liters of clean drinking water per family.",
      },
      {
        sdgNumber: 3,
        sdgName: "Good Health and Well-being",
        contributionLevel: 92,
        confidence: 90,
        reasoning:
          "Reduces incidents of cholera, diarrhea, and chronic hypertension from salty water.",
        outcomes:
          "90% reduction in waterborne clinical admissions in coastal pilot villages.",
      },
    ],
    predictions: {
      potentialReach: 90,
      expectedAdoption: 92,
      implementationDifficulty: 25,
      economicBenefit: 85,
      timeToImpact: "1 month deployment and testing loop",
      riskFactors:
        "Activated charcoal filtration layer exhausts capacity after 4 months; requires local testing indicators.",
      sustainabilityScore: 96,
    },
    timeline: {
      threeMonths:
        "Deploy 50 gravity layered clay pots across 3 villages; measure coliform count reductions.",
      sixMonths:
        "Establish charcoal replacement cooperatives run by local women; distribute visual user instructions.",
      oneYear:
        "Deploy 500 filter units; track waterborne clinic admissions; optimize charcoal baking local kilns.",
      threeYears:
        "Scale designs open-source across coastal delta regions; collaborate with national disaster relief teams.",
    },
    risks: [
      {
        category: "Operational",
        severity: "Medium",
        description:
          "Activated carbon layer gets clogged with clay mud silt, stopping filtration output.",
        mitigation:
          "Include a primary coarse sand pre-filter chamber to filter out heavy turbidity before the charcoal block.",
      },
    ],
    inclusivity: {
      scores: {
        ruralScore: 96,
        urbanScore: 25,
        disabilityScore: 80,
        lowInternetScore: 100,
        languageScore: 90,
        affordabilityScore: 98,
        digitalLiteracyScore: 100,
      },
      suggestions: [
        "Use local potters to bake filter casings, reinforcing the local economy and keeping costs under $5 per household.",
        "Print physical instructions on the pots themselves using visual icons to bypass language barriers.",
      ],
    },
  },
];

export class ImpactService {
  /**
   * Fetch all impact profiles.
   * If empty, initialize with default templates.
   */
  static getAllImpactData(): ImpactProjectData[] {
    if (typeof window === "undefined") {
      return INITIAL_IMPACT_DATA;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_IMPACT_DATA));
      return INITIAL_IMPACT_DATA;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_IMPACT_DATA;
    }
  }

  /**
   * Fetch impact profile for a specific project.
   * If none exists, create a default template.
   */
  static getImpactForProject(projectId: string): ImpactProjectData {
    const list = this.getAllImpactData();
    const found = list.find((d) => d.projectId === projectId);
    if (found) {
      return found;
    }

    // Default template
    const newImpact: ImpactProjectData = {
      projectId,
      overallImpactScore: 60,
      innovationReadiness: 60,
      socialImpact: 60,
      technicalFeasibility: 60,
      scalability: 60,
      sustainability: 60,
      accessibility: 60,
      aiReadiness: 50,
      riskLevel: 40,
      beneficiary: {
        primary: "",
        secondary: "",
        estimatedUsers: "",
        geoReach: "",
        ageGroups: "",
        incomeGroups: "",
        accessibilityNeeds: "",
      },
      sdgs: [],
      predictions: {
        potentialReach: 50,
        expectedAdoption: 50,
        implementationDifficulty: 50,
        economicBenefit: 50,
        timeToImpact: "6 months",
        riskFactors: "General deployment constraints.",
        sustainabilityScore: 60,
      },
      timeline: {
        threeMonths: "Complete design frameworks and launch initial pilots.",
        sixMonths:
          "Gather primary feedback and release updated prototype editions.",
        oneYear: "Onboard initial cohort of active user bases.",
        threeYears:
          "Scale implementation models across wider regional districts.",
      },
      risks: [
        {
          category: "Technical",
          severity: "Low",
          description: "Technical integration delays.",
          mitigation: "Schedule buffer sprints into sprint targets.",
        },
      ],
      inclusivity: {
        scores: {
          ruralScore: 50,
          urbanScore: 50,
          disabilityScore: 50,
          lowInternetScore: 50,
          languageScore: 50,
          affordabilityScore: 50,
          digitalLiteracyScore: 50,
        },
        suggestions: [
          "Ensure layout designs are optimized for low internet environments.",
          "Add local language support to lower barriers for rural users.",
        ],
      },
    };

    const updatedList = [...list, newImpact];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return newImpact;
  }

  /**
   * Save impact data.
   */
  static saveImpactData(data: ImpactProjectData): ImpactProjectData[] {
    const list = this.getAllImpactData();
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
