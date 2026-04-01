# Memox Voice Agent Dashboard

A responsive frontend dashboard built with Next.js App Router for monitoring AI-powered B2B sales agents. 

## Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-repo-url>
   cd memox-dashboard
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architectural Decisions

* **Next.js App Router:** Chosen for its modern paradigm, enabling intuitive nested layouts (like the persistent sidebar) and native server components.
* **Server Components by Default:** Most pages (`/dashboard`, `/agents/[id]`, `/calls/[id]`) are rendered on the server. This minimizes the JavaScript bundle sent to the client and provides a cleaner architecture for data fetching (currently simulated via `mockData.ts`).
* **State Management & Interactivity:** Added client-side filtering and search functionality on the (`/agents`, and `/calls`) page using React State and URL search parameters.
* **Tailwind CSS:** Selected for rapid UI development and ensuring the application is fully responsive out-of-the-box without heavy external UI libraries. The layout flexes from a bottom/top-nav on mobile to a side-nav on desktop seamlessly.
* **Local Data Layer:** Extracted the mock JSON into a structured TypeScript file (`lib/mockData.ts`) with helper functions. This mimics a real service-layer abstraction, making it trivial to swap out for actual `fetch()` calls to a backend API later.

## What I'd Improve with More Time

1. **Real-time Updates:** Implement WebSockets or Server-Sent Events (SSE) so the active call counts and agent statuses update in real-time without refreshing.
2. **UI Library / Design System:** Integrate `shadcn/ui` for more polished, accessible components (like data tables, comboboxes for filtering, and proper toast notifications for agent errors).
3. **Testing:** Add unit tests for the data parsing logic and end-to-end tests using Playwright to verify critical user journeys.
4. **Pagination:** Implement pagination for the `/calls` and `/agents` lists to handle scaling to hundreds of agents.