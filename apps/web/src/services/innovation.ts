import { InnovationProject } from "../types/innovation";

const STORAGE_KEY = "devflow_innovation_projects";

const INITIAL_MOCK_PROJECTS: InnovationProject[] = [
  {
    id: "proj-1",
    name: "Smart Waste Management",
    problemStatement:
      "Urban cities suffer from overflowing municipal bins, leading to toxic pest hazards, air pollution, and high fuel waste from unscheduled garbage truck collection routes.",
    proposedSolution:
      "A network of solar-powered ultrasonic sensor nodes retrofitted inside city dumpsters that transmit fill-level data to an AI route-optimization engine for trucks.",
    innovationTheme: "Clean Cities",
    sdgGoals: [
      "Goal 11: Sustainable Cities and Communities",
      "Goal 12: Responsible Consumption and Production",
    ],
    targetBeneficiaries: "Municipal sanitation departments and urban citizens.",
    expectedImpact:
      "Reduce garbage truck fuel emissions by 40%, eliminate dumpster overflows, and save $120K in monthly route costs.",
    successMetrics:
      "Average route completion time, bin overflow counts, fuel usage gallons per truck.",
    projectStage: "Scaling",
    teamMembers: [
      { name: "Linus Odegard", role: "Hardware Lead" },
      { name: "Siddharth Rao", role: "AI Optimisation Architect" },
    ],
    timeline: "Q1 - Q4 2026",
    priority: "High",
    innovationScore: 92,
    engineeringHealth: 94,
    projectProgress: 95,
    impactScore: 91,
    readinessScore: 90,
    codeQuality: 92,
    testCoverage: 88,
    buildStatus: "passing",
    openIssuesCount: 3,
    empathise: {
      targetUser: "Municipal collection truck drivers and dispatch planners.",
      userPersona:
        "Rajesh, a dispatcher who schedules 40 routes blindly everyday without knowing which bins are actually full.",
      goals:
        "Only dispatch trucks to full bins and minimize unnecessary truck miles.",
      pains:
        "Rising diesel fuel costs and frequent public complaints about overflowing public bins.",
      behaviours: "Relies on fixed daily schedule grids printed on clipboards.",
      needs:
        "A live digital map showing exact fill status across all sector dumpsters.",
    },
    define: {
      problemStatement:
        "How might we design a data-driven collection system that helps sanitation dispatchers optimize routes by prioritizing bins at 80%+ capacity?",
      opportunityStatement:
        "Integrating ultrasonic level transceivers with cell modems provides real-time telemetry at low cost.",
      howMightWe:
        "How might we dynamic-route garbage collection vehicles using live capacity coordinates?",
      successMetrics:
        "Liters of fuel saved per week, average bin fill level upon collection.",
    },
    ideate: [
      {
        id: "idea-1-1",
        title: "Weight Sensor Dumpster Scales",
        description:
          "Install scale pads beneath bins to track waste mass changes.",
        innovationScore: 70,
        feasibility: 60,
        socialImpact: 75,
        aiRecommendation:
          "High cost, complex installation, and susceptible to soil shifting.",
        isSelected: false,
      },
      {
        id: "idea-1-2",
        title: "Ultrasonic Lid Sensors",
        description:
          "Mount a small, weather-proof ultrasonic sensor inside the container cover.",
        innovationScore: 94,
        feasibility: 90,
        socialImpact: 92,
        aiRecommendation:
          "Highly feasible, low-power battery usage, simple hardware casing.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-1-1",
        version: "v1.0.0",
        figmaLink: "https://figma.com/file/smart-waste-dashboard",
        githubRepo: "https://github.com/devflow/smart-waste-firmware",
        demoUrl: "https://waste-dashboard.devflow.io",
        screenshots:
          "Route map overlay, level alerts, active sensor telemetry logging.",
        notes:
          "Sensors deployed in 50 downtown bins. Batteries show 18-month lifespan estimate.",
        createdAt: "2026-03-10",
      },
    ],
    test: [
      {
        id: "test-1-1",
        testUsers: "3 dispatchers and 12 sanitation drivers in District 4.",
        feedback:
          "Drivers saved 2 hours per shift. Recommended high-contrast maps for night driving.",
        improvements: "Added premium dark mode to mobile map interface.",
        pendingIssues:
          "Filtering signal spikes caused by empty cardboard boxes blocking sensor lens.",
        lessonsLearned:
          "Signal averaging algorithms are crucial to clean raw sensor readings.",
        createdAt: "2026-05-15",
      },
    ],
    innovationScores: {
      problemClarity: 92,
      innovation: 90,
      feasibility: 88,
      socialImpact: 94,
      aiReadiness: 86,
      scalability: 91,
      sustainability: 92,
    },
  },
  {
    id: "proj-2",
    name: "AI Disaster Response",
    problemStatement:
      "First responders lack real-time map data immediately after earthquakes or floods, delaying search and rescue teams from reaching isolated survivors.",
    proposedSolution:
      "A swarm of autonomous drones that maps disaster areas using computer vision to identify blocked roads and damaged structures.",
    innovationTheme: "Safety & Relief",
    sdgGoals: [
      "Goal 11: Sustainable Cities and Communities",
      "Goal 9: Industry, Innovation, and Infrastructure",
    ],
    targetBeneficiaries:
      "Search and rescue agencies and disaster-affected citizens.",
    expectedImpact:
      "Locate trapped survivors up to 60% faster and create post-disaster maps within 20 minutes.",
    successMetrics:
      "Map generation speed, hazard classification accuracy, flight endurance.",
    projectStage: "Prototyping",
    teamMembers: [
      { name: "Priya Nair", role: "Drone Control Lead" },
      { name: "Sarah Smith", role: "CV Engineer" },
    ],
    timeline: "Q3 2026 - Q2 2027",
    priority: "High",
    innovationScore: 95,
    engineeringHealth: 88,
    projectProgress: 40,
    impactScore: 94,
    readinessScore: 78,
    codeQuality: 86,
    testCoverage: 80,
    buildStatus: "passing",
    openIssuesCount: 9,
    empathise: {
      targetUser: "Search and rescue team commanders.",
      userPersona:
        "Captain Marcus, who commands a team of 15 and must decide which flooded streets to navigate blind.",
      goals: "Quickly locate hazard-free routes to marooned neighborhoods.",
      pains: "Complete lack of cellular signal and outdated paper maps.",
      behaviours:
        "Relies on manual binoculars and local word of mouth reports.",
      needs:
        "A real-time aerial overlay of road blocks, flooding, and hazards.",
    },
    define: {
      problemStatement:
        "How might we provide immediate, offline road-blockage maps to rescuers when all communications infrastructure is down?",
      opportunityStatement:
        "Local WiFi meshes on automated drone hardware allow offline transmission of dynamic disaster mapping data.",
      howMightWe:
        "How might we map survivor locations without cellular network backhauls?",
      successMetrics:
        "Aerial processing frames per second, network coverage footprint.",
    },
    ideate: [
      {
        id: "idea-2-1",
        title: "Satellite Image Retransmission",
        description:
          "Download fresh satellite scans and push to rescuer terminals.",
        innovationScore: 75,
        feasibility: 50,
        socialImpact: 85,
        aiRecommendation:
          "High latency and high cloud dependency; useless when local comms fail.",
        isSelected: false,
      },
      {
        id: "idea-2-2",
        title: "Local Drone Swarm with CV",
        description:
          "Deploy offline edge drones classifying raw videos into local GPS overlays.",
        innovationScore: 96,
        feasibility: 80,
        socialImpact: 95,
        aiRecommendation:
          "Highly resilient, offline, and generates maps within 15 minutes.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-2-1",
        version: "v0.4.0",
        figmaLink: "https://figma.com/file/disaster-map-hifi",
        githubRepo: "https://github.com/devflow/drone-mesh-cv",
        demoUrl: "http://disaster-mesh.local",
        screenshots:
          "Mesh telemetry node status, damage overlays, search path routing.",
        notes:
          "Drones run local TensorFlow Lite models. Map data replicates via peer mesh.",
        createdAt: "2026-06-01",
      },
    ],
    test: [
      {
        id: "test-2-1",
        testUsers: "Volunteer Rescue Team Alpha.",
        feedback:
          "Drones mapped a 2km zone accurately but wind currents lowered battery life.",
        improvements:
          "Optimized flight trajectories to maximize battery range by 15%.",
        pendingIssues:
          "Stable classification of people under heavy smoke or rubble.",
        lessonsLearned:
          "Thermal imaging addition is critical for smoke-filled search environments.",
        createdAt: "2026-06-20",
      },
    ],
    innovationScores: {
      problemClarity: 95,
      innovation: 96,
      feasibility: 78,
      socialImpact: 94,
      aiReadiness: 90,
      scalability: 88,
      sustainability: 80,
    },
  },
  {
    id: "proj-3",
    name: "Smart Water Conservation",
    problemStatement:
      "Water utilities lose up to 35% of clean municipal drinking water through undetected underground leaks before the water reaches households.",
    proposedSolution:
      "A smart acoustic sensor collar clamped onto main underground valves that listens for high-frequency pipe anomalies and pinpoints leak positions.",
    innovationTheme: "Clean Water & Climate",
    sdgGoals: ["Goal 6: Clean Water and Sanitation", "Goal 13: Climate Action"],
    targetBeneficiaries: "Municipal utility operators and community residents.",
    expectedImpact:
      "Save 2 million gallons of drinking water daily, preventing subsidence damage and resource depletion.",
    successMetrics:
      "Acoustic signal accuracy, leak location precision, battery efficiency.",
    projectStage: "Validation",
    teamMembers: [
      { name: "Elena Rostova", role: "Hydrology Researcher" },
      { name: "David Chen", role: "Acoustic Engineer" },
    ],
    timeline: "Q2 2025 - Q2 2026",
    priority: "High",
    innovationScore: 88,
    engineeringHealth: 90,
    projectProgress: 80,
    impactScore: 92,
    readinessScore: 86,
    codeQuality: 90,
    testCoverage: 84,
    buildStatus: "passing",
    openIssuesCount: 2,
    empathise: {
      targetUser: "Municipal water maintenance engineers.",
      userPersona:
        "Sanjay, a maintenance tech who must manually check miles of pipeline using audio probes.",
      goals: "Identify exact pipe leak coords before excavating heavy roads.",
      pains:
        "High road repair costs and massive public anger during water shortages.",
      behaviours:
        "Manually audits pipelines in response to surface water reports.",
      needs: "Continuous, automated underground leak detection monitoring.",
    },
    define: {
      problemStatement:
        "How might we design a continuous pipeline monitoring system that automatically detects micro-leaks before they cause surface collapses?",
      opportunityStatement:
        "Piezoelectric sensor collars can convert pipeline sound frequencies into digital indicators.",
      howMightWe:
        "How might we listen to underground city piping sounds to locate hidden micro-leaks?",
      successMetrics: "Liters of water saved, excavation targeting accuracy.",
    },
    ideate: [
      {
        id: "idea-3-1",
        title: "Flow Meter Variance Audits",
        description:
          "Compare water input vs exit meters to find volume differences.",
        innovationScore: 65,
        feasibility: 85,
        socialImpact: 70,
        aiRecommendation:
          "Detects the existence of leaks but cannot identify their locations.",
        isSelected: false,
      },
      {
        id: "idea-3-2",
        title: "Acoustic Frequency Analysis",
        description:
          "Clamping microphone sensor collars to valves to detect high-frequency stress waves.",
        innovationScore: 90,
        feasibility: 80,
        socialImpact: 92,
        aiRecommendation:
          "Pinpoints location to within 1 meter by comparing arrival times between collars.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-3-1",
        version: "v1.0.0",
        figmaLink: "https://figma.com/file/water-leak-dashboard",
        githubRepo: "https://github.com/devflow/water-leak-acoustic",
        demoUrl: "https://leak-dashboard.devflow.io",
        screenshots:
          "Interactive pipe map, audio spectral charts, battery monitors.",
        notes:
          "Sensors deployed along 5 kilometers of main municipal piping feed.",
        createdAt: "2026-01-15",
      },
    ],
    test: [
      {
        id: "test-3-1",
        testUsers: "City Water Authority maintenance crew.",
        feedback:
          "Acoustic collars identified 4 leaks successfully with 90% excavation accuracy.",
        improvements:
          "Added filtering for heavy vehicle traffic vibrations to reduce false alarms.",
        pendingIssues:
          "Calibrating acoustics for pvc plastic pipes vs steel pipes.",
        lessonsLearned:
          "PVC pipes damp sound travel; requires placing collars closer together.",
        createdAt: "2026-04-10",
      },
    ],
    innovationScores: {
      problemClarity: 90,
      innovation: 88,
      feasibility: 84,
      socialImpact: 92,
      aiReadiness: 80,
      scalability: 88,
      sustainability: 90,
    },
  },
  {
    id: "proj-4",
    name: "Mental Health Companion",
    problemStatement:
      "Students in competitive universities experience high anxiety and isolation, with university mental health clinics facing 6-week appointment backlogs.",
    proposedSolution:
      "A privacy-first, offline-capable AI companion that uses cognitive behavioral therapy (CBT) reflection exercises to help students manage stress.",
    innovationTheme: "Well-being & Health",
    sdgGoals: [
      "Goal 3: Good Health and Well-being",
      "Goal 4: Quality Education",
    ],
    targetBeneficiaries: "University students and mental health staff.",
    expectedImpact:
      "Provide instant, zero-cost support to 5,000+ students, bridging the care gap during peak examination weeks.",
    successMetrics:
      "Student stress score reduction, daily active reflection logs, clinic referral rate.",
    projectStage: "Ideation",
    teamMembers: [
      { name: "Dr. Ananya Rao", role: "Clinical Psychologist" },
      { name: "Sarah Smith", role: "UX Researcher" },
    ],
    timeline: "Q3 - Q4 2026",
    priority: "Medium",
    innovationScore: 85,
    engineeringHealth: 90,
    projectProgress: 15,
    impactScore: 88,
    readinessScore: 72,
    codeQuality: 92,
    testCoverage: 80,
    buildStatus: "passing",
    openIssuesCount: 1,
    empathise: {
      targetUser: "Undergraduate university students.",
      userPersona:
        "Meera, a freshman studying Computer Science who feels overwhelmed and is too anxious to seek help.",
      goals:
        "Safely talk about academic pressures without fear of stigma or data leaks.",
      pains:
        "Long university counseling waiting lists and high costs of private therapy.",
      behaviours:
        "Scrolls social media when stressed, keeping worries bottled up.",
      needs:
        "An immediate, private tool to organize thoughts and reduce panic symptoms.",
    },
    define: {
      problemStatement:
        "How might we provide privacy-first, on-demand emotional support to college students during late-night anxiety spikes?",
      opportunityStatement:
        "Running local quantized AI models inside a sandboxed browser environment guarantees complete user data privacy.",
      howMightWe:
        "How might we design a CBT assistant that operates entirely local to the user's phone?",
      successMetrics:
        "User anxiety reduction ratings, data privacy compliance checkmarks.",
    },
    ideate: [
      {
        id: "idea-4-1",
        title: "Peer-to-Peer Help Chatroom",
        description:
          "Connect stressed students anonymously with other student listeners.",
        innovationScore: 72,
        socialImpact: 78,
        feasibility: 85,
        aiRecommendation:
          "High moderating costs and risk of inappropriate advice.",
        isSelected: false,
      },
      {
        id: "idea-4-2",
        title: "Offline Local CBT Companion",
        description:
          "A client-side WebAssembly chatbot guiding users through CBT writing prompts.",
        innovationScore: 89,
        socialImpact: 90,
        feasibility: 88,
        aiRecommendation:
          "Highly secure, zero server costs, absolute user data privacy.",
        isSelected: true,
      },
    ],
    prototype: [],
    test: [],
    innovationScores: {
      problemClarity: 88,
      innovation: 85,
      feasibility: 82,
      socialImpact: 88,
      aiReadiness: 70,
      scalability: 85,
      sustainability: 80,
    },
  },
  {
    id: "proj-5",
    name: "Smart Farming Assistant",
    problemStatement:
      "Smallholder farmers lose up to 40% of their harvest yields due to late pest detection and incorrect fertilizer application schedules.",
    proposedSolution:
      "An offline mobile app that uses leaf-image scanning models to instantly identify crop diseases and recommend natural remedies.",
    innovationTheme: "Sustainable Agriculture",
    sdgGoals: [
      "Goal 2: Zero Hunger",
      "Goal 12: Responsible Consumption and Production",
    ],
    targetBeneficiaries: "Smallholder farmers in rural agricultural sectors.",
    expectedImpact:
      "Increase crop yields by 25% for rural smallholders and decrease chemical pesticide runoffs.",
    successMetrics:
      "Yield improvements, pest diagnostic speed, offline model usage.",
    projectStage: "Validation",
    teamMembers: [
      { name: "Priya Nair", role: "Agronomist" },
      { name: "Siddharth Rao", role: "Mobile Developer" },
    ],
    timeline: "Q1 - Q4 2026",
    priority: "High",
    innovationScore: 90,
    engineeringHealth: 92,
    projectProgress: 70,
    impactScore: 92,
    readinessScore: 85,
    codeQuality: 90,
    testCoverage: 85,
    buildStatus: "passing",
    openIssuesCount: 4,
    empathise: {
      targetUser:
        "Smallholder farmers in regions with poor internet connectivity.",
      userPersona:
        "Ramesh, a paddy farmer who notices brown spots on his rice stalks but has no local agronomist to ask.",
      goals:
        "Get an instant diagnosis for leaf spots without traveling to the city.",
      pains:
        "Massive crop losses from pests and zero 4G network signal in fields.",
      behaviours:
        "Asks neighboring farmers for advice; buys expensive chemicals blindly.",
      needs:
        "A visual diagnostic tool that works without using any internet data.",
    },
    define: {
      problemStatement:
        "How might we help rural farmers identify crop diseases in the field without requiring internet access or specialized lab equipment?",
      opportunityStatement:
        "Deploying optimized MobileNet computer vision models directly inside low-cost smartphones lets them work offline.",
      howMightWe:
        "How might we turn a basic phone camera into an offline agronomist assistant?",
      successMetrics: "Disease diagnosis accuracy, app offline launch speed.",
    },
    ideate: [
      {
        id: "idea-5-1",
        title: "Agronomist Hotline Callcenter",
        description:
          "Set up a toll-free number for farmers to call and describe leaf issues.",
        innovationScore: 68,
        feasibility: 80,
        socialImpact: 75,
        aiRecommendation:
          "Difficult to describe complex fungal textures over voice calls.",
        isSelected: false,
      },
      {
        id: "idea-5-2",
        title: "Offline Mobile Leaf Scanner",
        description:
          "An app hosting local disease neural nets that classify leaf spots via camera view.",
        innovationScore: 92,
        feasibility: 85,
        socialImpact: 92,
        aiRecommendation:
          "Provides immediate, visual, offline diagnoses right in the field.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-5-1",
        version: "v1.0.0",
        figmaLink: "https://figma.com/file/smart-farm-ui",
        githubRepo: "https://github.com/devflow/leaf-classifier",
        demoUrl: "https://farm-diagnostic.devflow.io",
        screenshots:
          "Camera leaf scanner interface, diagnostics page, natural cure recipes.",
        notes:
          "Supports 8 local crop types. Model file compressed to only 12MB.",
        createdAt: "2026-03-20",
      },
    ],
    test: [
      {
        id: "test-5-1",
        testUsers: "15 vegetable farmers in Kolar village.",
        feedback:
          "App diagnosed tomato blight correctly. Recommended adding voice translations.",
        improvements:
          "Added local language voice audio guidance to diagnostic results.",
        pendingIssues:
          "Scanning crops in poor direct sunlight or shadow conditions.",
        lessonsLearned:
          "Audio guidance helps bridge literacy barriers in rural farms.",
        createdAt: "2026-05-18",
      },
    ],
    innovationScores: {
      problemClarity: 92,
      innovation: 90,
      feasibility: 85,
      socialImpact: 92,
      aiReadiness: 84,
      scalability: 88,
      sustainability: 89,
    },
  },
  {
    id: "proj-6",
    name: "Accessible Public Transport",
    problemStatement:
      "Wheelchair users and visually impaired travelers struggle to navigate bus networks, finding bus station ramps blocked or buses departing without them.",
    proposedSolution:
      "An IoT beacon network at bus stops that transmits accessibility boarding alerts directly to the driver's dashboard interface.",
    innovationTheme: "Urban Equity",
    sdgGoals: [
      "Goal 10: Reduced Inequalities",
      "Goal 11: Sustainable Cities and Communities",
    ],
    targetBeneficiaries: "Visually and physically impaired urban commuters.",
    expectedImpact:
      "Reduce transit boarding friction times by 50% and raise public transport usage among disabled citizens.",
    successMetrics:
      "Boarding delay seconds, driver alert responses, system active hours.",
    projectStage: "Prototyping",
    teamMembers: [
      { name: "Linus Odegard", role: "Electronics Engineer" },
      { name: "Sarah Smith", role: "Accessibility Specialist" },
    ],
    timeline: "Q3 2026 - Q1 2027",
    priority: "Medium",
    innovationScore: 89,
    engineeringHealth: 88,
    projectProgress: 50,
    impactScore: 90,
    readinessScore: 78,
    codeQuality: 88,
    testCoverage: 82,
    buildStatus: "passing",
    openIssuesCount: 5,
    empathise: {
      targetUser: "Visually impaired and wheelchair commuters.",
      userPersona:
        "Anjali, a blind university student who stands at bus stops waiting for hours, hoping the correct bus halts.",
      goals:
        "Notify arriving bus drivers of her boarding request and route target.",
      pains:
        "Buses frequently drive past her without stopping, or stop too far from curbs.",
      behaviours:
        "Relies on asking strangers which bus number has just arrived.",
      needs:
        "A direct, automated notification link between her and the transit driver.",
    },
    define: {
      problemStatement:
        "How might we guarantee that public transit drivers receive real-time notice of disabled commuters waiting at upcoming stops?",
      opportunityStatement:
        "Low-energy Bluetooth beacons at shelter kiosks can link commuter boarding requests to driver control units.",
      howMightWe:
        "How might we trigger driver dashboard alerts when an accessibility commuter is waiting?",
      successMetrics:
        "Driver confirmation rate, passenger boarding satisfaction rating.",
    },
    ideate: [
      {
        id: "idea-6-1",
        title: "Transit Booking Website",
        description:
          "Commuters register schedules online 24 hours before traveling.",
        innovationScore: 60,
        feasibility: 90,
        socialImpact: 65,
        aiRecommendation:
          "Highly inflexible; fails for spontaneous daily travel.",
        isSelected: false,
      },
      {
        id: "idea-6-2",
        title: "IoT Stop Beacons & App Link",
        description:
          "Commuters tap their phone at the stop beacon to push visual indicators directly to the driver's display.",
        innovationScore: 92,
        feasibility: 82,
        socialImpact: 94,
        aiRecommendation:
          "Highly flexible, low-cost beacons, integrates with existing buses.",
        isSelected: true,
      },
    ],
    prototype: [
      {
        id: "proto-6-1",
        version: "v0.6.0",
        figmaLink: "https://figma.com/file/transit-driver-alert",
        githubRepo: "https://github.com/devflow/transit-beacon-firmware",
        demoUrl: "https://driver-alert.devflow.io",
        screenshots:
          "Driver HUD warnings, passenger wait status list, beacon logs.",
        notes: "BLE beacons deployed in 4 central bus shelter bays.",
        createdAt: "2026-04-12",
      },
    ],
    test: [
      {
        id: "test-6-1",
        testUsers: "6 disabled commuters and 10 municipal bus drivers.",
        feedback:
          "Drivers responded within 5 seconds. Commuters felt significantly safer.",
        improvements:
          "Added loud audible text-to-speech speaker output at bus shelter bays.",
        pendingIssues:
          "Beacon signal range overlap when multiple buses arrive at once.",
        lessonsLearned:
          "Clear user-interface alerts prevent driver warning fatigue.",
        createdAt: "2026-06-08",
      },
    ],
    innovationScores: {
      problemClarity: 90,
      innovation: 89,
      feasibility: 82,
      socialImpact: 94,
      aiReadiness: 76,
      scalability: 86,
      sustainability: 85,
    },
  },
];

export class InnovationService {
  /**
   * Return the raw, immutable mock dataset for SSR/Hydration consistency.
   */
  static getRawMockProjects(): InnovationProject[] {
    return INITIAL_MOCK_PROJECTS;
  }

  /**
   * Fetch all projects from LocalStorage.
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
