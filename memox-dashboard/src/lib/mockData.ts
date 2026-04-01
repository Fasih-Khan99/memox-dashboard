export const dashboardKPIs = {
  activeAgents: 3,
  totalAgents: 5,
  activeCalls: 3,
  callsToday: 61,
  avgCallDuration: 298,
  overallSuccessRate: 0.72,
  meetingsBooked: 8,
  languageDistribution: { German: 27, English: 22, Dutch: 12, French: 0 }
};

export const agents = [
  {
    id: "agent-001",
    name: "Sales Agent - DACH",
    status: "active",
    language: "German",
    currentCall: { id: "call-042", company: "Müller GmbH", duration: 245, sentiment: "positive" },
    metrics: { totalCalls: 1247, successRate: 0.73, avgCallDuration: 312, callsToday: 18, conversionRate: 0.12 },
    createdAt: "2025-11-15T09:00:00Z",
    lastActive: "2026-02-17T10:45:00Z"
  },
  {
    id: "agent-002",
    name: "Sales Agent - Benelux",
    status: "idle",
    language: "Dutch",
    currentCall: null,
    metrics: { totalCalls: 892, successRate: 0.68, avgCallDuration: 287, callsToday: 12, conversionRate: 0.09 },
    createdAt: "2025-12-01T09:00:00Z",
    lastActive: "2026-02-17T09:30:00Z"
  },
  {
    id: "agent-003",
    name: "Sales Agent - France",
    status: "error",
    language: "French",
    currentCall: null,
    metrics: { totalCalls: 654, successRate: 0.71, avgCallDuration: 298, callsToday: 0, conversionRate: 0.11 },
    error: "TTS service timeout - provider unreachable",
    createdAt: "2026-01-10T09:00:00Z",
    lastActive: "2026-02-17T08:15:00Z"
  },
  {
    id: "agent-004",
    name: "Sales Agent - UK",
    status: "active",
    language: "English",
    currentCall: { id: "call-043", company: "Brighton Solutions Ltd", duration: 89, sentiment: "neutral" },
    metrics: { totalCalls: 2103, successRate: 0.76, avgCallDuration: 265, callsToday: 22, conversionRate: 0.15 },
    createdAt: "2025-10-01T09:00:00Z",
    lastActive: "2026-02-17T10:50:00Z"
  },
  {
    id: "agent-005",
    name: "Sales Agent - DACH II",
    status: "active",
    language: "German",
    currentCall: { id: "call-044", company: "Schmidt & Partner AG", duration: 178, sentiment: "positive" },
    metrics: { totalCalls: 567, successRate: 0.69, avgCallDuration: 330, callsToday: 9, conversionRate: 0.10 },
    createdAt: "2026-01-20T09:00:00Z",
    lastActive: "2026-02-17T10:48:00Z"
  }
];

export const calls = [
  {
    id: "call-044",
    agentId: "agent-005",
    agentName: "Sales Agent - DACH II",
    company: "Schmidt & Partner AG",
    contact: "Klaus Schmidt",
    direction: "outbound",
    status: "in-progress",
    startTime: "2026-02-17T10:45:00Z",
    duration: 178,
    language: "German",
    sentiment: "positive",
    outcome: "null",
    transcript: [
      { speaker: "agent", text: "Hallo Herr Schmidt, ich sehe Sie haben sich unsere Demoversion angesehen.", timestamp: 0, sentiment: "neutral" },
      { speaker: "contact", text: "Ja, das Tool sieht sehr mächtig aus. Ich hatte eine Frage zur API-Integration.", timestamp: 12, sentiment: "positive" },
      { speaker: "agent", text: "Hervorragend. Unsere API ist vollständig dokumentiert und lässt sich in unter 10 Minuten anbinden.", timestamp: 25, sentiment: "positive" }
    ]
  },
  {
    id: "call-043",
    agentId: "agent-004",
    agentName: "Sales Agent - UK",
    company: "Brighton Solutions Ltd",
    contact: "James Wilson",
    direction: "outbound",
    status: "in-progress",
    startTime: "2026-02-17T10:48:00Z",
    duration: 89,
    language: "English",
    sentiment: "neutral",
    outcome: "null",
    transcript: [
      { speaker: "agent", text: "Hello, is this James from Brighton Solutions?", timestamp: 0, sentiment: "neutral" },
      { speaker: "contact", text: "Speaking. Who is this?", timestamp: 4, sentiment: "neutral" },
      { speaker: "agent", text: "I'm calling from Memox. We spoke briefly at the expo last month about automating your lead qualification.", timestamp: 10, sentiment: "positive" },
      { speaker: "contact", text: "Oh right, yes. I have a few minutes now if you want to go over the pricing models.", timestamp: 22, sentiment: "neutral" }
    ]
  },
  {
    id: "call-042",
    agentId: "agent-001",
    agentName: "Sales Agent - DACH",
    company: "Müller GmbH",
    contact: "Hans Müller",
    direction: "outbound",
    status: "in-progress",
    startTime: "2026-02-17T10:41:00Z",
    duration: 245,
    language: "German",
    sentiment: "positive",
    outcome: "null",
    transcript: [
      {
        speaker: "agent",
        text: "Guten Tag, Herr Müller. Ich rufe an bezüglich unserer Lösung für Ihr Vertriebsteam.",
        timestamp: 0,
        sentiment: "neutral"
      },
      {
        speaker: "contact",
        text: "Ah ja, ich erinnere mich. Sie hatten letzte Woche eine E-Mail geschickt.",
        timestamp: 8,
        sentiment: "neutral"
      },
      {
        speaker: "agent",
        text: "Genau. Ich wollte kurz besprechen, wie wir Ihre Outbound-Kapazität verdreifachen können.",
        timestamp: 15,
        sentiment: "positive"
      },
      {
        speaker: "contact",
        text: "Das klingt interessant. Erzählen Sie mir mehr.",
        timestamp: 24,
        sentiment: "positive"
      }
    ]
  },
  {
    id: "call-041",
    agentId: "agent-004",
    agentName: "Sales Agent - UK",
    company: "TechFlow Inc",
    contact: "Sarah Chen",
    direction: "outbound",
    status: "completed",
    startTime: "2026-02-17T10:15:00Z",
    endTime: "2026-02-17T10:22:00Z",
    duration: 420,
    language: "English",
    sentiment: "positive",
    outcome: "meeting_booked"
  },
  {
    id: "call-040",
    agentId: "agent-002",
    agentName: "Sales Agent - Benelux",
    company: "Van der Berg BV",
    contact: "Jan van der Berg",
    direction: "outbound",
    status: "completed",
    startTime: "2026-02-17T09:45:00Z",
    endTime: "2026-02-17T09:50:00Z",
    duration: 300,
    language: "Dutch",
    sentiment: "negative",
    outcome: "not_interested"
  },
  {
    id: "call-039",
    agentId: "agent-001",
    agentName: "Sales Agent - DACH",
    company: "Weber Consulting",
    contact: "Lisa Weber",
    direction: "inbound",
    status: "completed",
    startTime: "2026-02-17T09:20:00Z",
    endTime: "2026-02-17T09:35:00Z",
    duration: 900,
    language: "German",
    sentiment: "positive",
    outcome: "meeting_booked"
  },
  {
    id: "call-038",
    agentId: "agent-005",
    agentName: "Sales Agent - DACH II",
    company: "Bauer Gruppe",
    contact: "Thomas Bauer",
    direction: "outbound",
    status: "completed",
    startTime: "2026-02-17T08:50:00Z",
    endTime: "2026-02-17T08:58:00Z",
    duration: 480,
    language: "German",
    sentiment: "neutral",
    outcome: "callback_requested"
  }
]

export function getAgentById(id: string) {
  return agents.find(a => a.id === id);
}

export function getCallById(id: string) {
  return calls.find(c => c.id === id);
}