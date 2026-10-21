# CyberShield — Citizen Threat Triage & Incident Escalation Engine

> **Enhanced MVP** | Built strictly in conformance with `PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `.stitch/DESIGN.md`, and `.stitch/DESIGNSYSTEM.md`.

---

## 1. Project Overview

**CyberShield** is an explainable, client-side cybersecurity threat triage platform designed for digital citizens in India. It empowers non-technical users to identify, evaluate, and respond to prevalent social engineering attacks—most notably **Digital Arrest extortion schemes, fake electricity bill/KYC SMS phishing, lookalike banking URLs, and malicious sideloaded APK permissions**.

### Key Value Propositions:
- **100% In-Memory Client-Side Evaluation:** Pure TypeScript heuristic rules evaluate inputs instantly in browser RAM without remote server roundtrips.
- **Zero-Knowledge Privacy:** Raw user-submitted messages, credentials, and links are never persisted to disk, relational databases, or external AI models.
- **Explainable Scoring:** Transparent mathematical scoring ($S \in [0, 100]$) with evidence excerpts, contextual attenuation, and indicator deduplication.
- **Zero-Fetch Static URL Security:** Syntactic URL analysis protects against SSRF and prevents connecting to or executing malicious destination web servers.
- **Verified Indian Escalation Directory:** Direct integration with the National Cyber Crime Helpline (**1930**), `cybercrime.gov.in`, and the DoT Chakshu portal.

---

## 2. Technology Stack

- **Frontend Core:** React 18, Vite 6, TypeScript 5 (Strict Mode).
- **Routing:** React Router DOM v6 with code-splitting (`React.lazy()` / `Suspense`).
- **Server State & Caching:** TanStack Query (React Query) v5.
- **Design System & Styling:** Tailwind CSS v3, shadcn/ui (Radix primitives), Documentation-Native achromatic gray tokens (`.stitch/DESIGNSYSTEM.md`).
- **Scrolling & Animation:** Lenis momentum smooth scroll with `prefers-reduced-motion` detection, Framer Motion for interactive micro-animations and gauges.
- **Backend-as-a-Service (Optional Telemetry):** Supabase client SDK with Row-Level Security (RLS). Zero custom Node.js/Express server.
- **Testing & Verification:** Vitest with unit test suites and 75-sample benchmark corpus.
- **Hosting & Deployment:** Vercel Global Edge Network with SPA rewrites and strict Content Security Policy headers (`vercel.json`).

---

## 3. Application Pages & Route Architecture

| Route | Page | Primary Responsibilities |
| :--- | :--- | :--- |
| `/` | **Home / Dashboard** | Hero with security status badge, rapid triage input bar, active scam advisory banner, core threat domain cards. |
| `/analyze` | **Analyze Threats** | 3-tab analysis form (Message text, Standalone URL, App Metadata), sample scenario loader, live validation. |
| `/analyze/results` | **Analysis Results** | Animated SVG radial score gauge (0–100), classification badge, findings accordion with quotes, actionable checklist, 1-click plain text summary copy. |
| `/awareness` | **Threat Awareness Center** | Searchable and category-filtered educational guides with key takeaways and read times. |
| `/safety-guide` | **Safety & 1930 Escalation** | Prominent 1930 emergency hotline trigger, interactive victim response checklist, forensic evidence preservation guide, verified Indian government portals. |
| `/training` | **Defensive Training** | Interactive scam simulation cards with clickable threat hotspots + 10-question quiz with real-time scoring and remediation links. |
| `/about` | **About & Privacy** | Scoring formula breakdown, classification tiers table, zero-retention privacy manifesto, and heuristic limitations disclosure. |
| `*` | **404 Not Found** | Error recovery page guiding users back to the dashboard. |

---

## 4. Detection Engine Architecture

```
Raw User Input
      │
      ▼
Unicode Homoglyph & Whitespace Normalizer
      │
      ▼
Safe URL Extractor (Embedded Links)
      │
      ├──> Phishing & Credential Theft Rules (RULE_PHISH_*)
      ├──> Digital Arrest & Extortion Rules (RULE_ARREST_*)
      ├──> URL Structure & Typosquatting Rules (RULE_URL_*)
      └──> Mobile App Permissions & Source Rules (RULE_APP_*)
      │
      ▼
Indicator Deduplication & Span Filter
      │
      ▼
Contextual Evaluator (Advisory Attenuation / Multi-Category Convergence)
      │
      ▼
Normalized 0–100 Risk Scorer (Low / Moderate / High / Very High)
      │
      ▼
Evidence Excerpts & Actionable Recommendations
      │
      ▼
Structured ThreatAssessmentResult
```

### Mathematical Scoring Formula:
$$S = \min\left(100, \max\left(0, \text{round}\left(\left(\sum_{i=1}^{n} w_i\right) \times C_{\text{context}}\right)\right)\right)$$

Where $C_{\text{context}} = 0.4$ for educational/advisory text, $1.15$ for compound multi-category threats, and $1.0$ default.

---

## 5. Development & Testing Instructions

### Prerequisites
- Node.js `v18.x` or later (tested on `v24.x`)
- npm `v9.x` or later

### Installation
```bash
# Clone the repository and install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```

### Running Tests
```bash
# Execute unit tests and benchmark detection corpus
npm run test

# Watch mode
npm run test:watch
```

### Static Type Checking & Linting
```bash
# Verify TypeScript strict type check
npm run lint
```

### Production Build
```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Environment Configuration

Copy `.env.example` to `.env` (optional for local testing; core analysis runs 100% locally):
```bash
cp .env.example .env
```

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Public (Client) | HTTPS endpoint for Supabase project (optional feedback/telemetry). |
| `VITE_SUPABASE_ANON_KEY` | Public (Client) | Anonymous public key with RLS enforcement. |

---

## 7. Official Indian Emergency Resources

- **National Cyber Crime Helpline:** Dial **`1930`** (24x7 toll-free emergency hotline).
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **DoT Chakshu Portal (Suspected Fraud Communications):** [https://sancharsaathi.gov.in/sfc/](https://sancharsaathi.gov.in/sfc/)
- **CERT-In Incident Reporting:** [https://www.cert-in.org.in](https://www.cert-in.org.in)

---

## 8. License & Privacy Guarantee

CyberShield is open-source software provided under the MIT License for educational and citizen awareness purposes. Raw submissions are processed strictly in volatile memory on the user's client machine.
