# CyberShield — Citizen Cyber Defense & Threat Triage Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)](https://reactjs.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS 3](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-729B1B.svg?logo=vitest)](https://vitest.dev/)

> **CyberShield** is an explainable, zero-knowledge, client-side cybersecurity threat triage and emergency escalation engine tailored for digital citizens in India. It empowers non-technical users to identify, evaluate, and counter prevalent social engineering exploits—most notably **Digital Arrest extortion schemes, deceptive KYC/banking SMS phishing, spoofed government/banking URLs, and malicious sideloaded APKs**.

---

## 🌟 Key Capabilities & Highlights

- **🔒 100% Client-Side In-Memory Evaluation:** Pure TypeScript heuristic rules execute directly inside browser RAM without remote server roundtrips.
- **🛡️ Zero-Knowledge Data Privacy:** Raw messages, credentials, and links are never written to disk, databases, or third-party AI APIs.
- **📊 Transparent & Explainable Scoring:** Mathematical risk assessment ($S \in [0, 100]$) paired with verbatim evidence excerpts, contextual attenuation, and indicator deduplication.
- **🔍 Zero-Fetch URL Security:** Syntactic URL analysis parses structures and typosquatting entirely offline, preventing SSRF or unwanted connections to malicious servers.
- **🚨 Indian Incident Escalation:** Direct links to the National Cyber Crime Helpline (**1930**), `cybercrime.gov.in`, and the DoT Chakshu reporting portal.
- **🌓 High-Fidelity UI & Theme System:** Full Dark and Light mode support, dynamic animations (GSAP, Lenis momentum scroll, Framer Motion), accessible typography, and smooth UX.

---

## 🏗️ Architecture & Core Engine Pipeline

```
Raw User Input (Message / URL / APK Permissions)
       │
       ▼
Unicode Homoglyph & Whitespace Normalizer
       │
       ▼
Safe Zero-Fetch URL Extractor
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

### Risk Scoring Formula
$$S = \min\left(100, \max\left(0, \text{round}\left(\left(\sum_{i=1}^{n} w_i\right) \times C_{\text{context}}\right)\right)\right)$$

- **Educational/Advisory Context Attenuation:** $C_{\text{context}} = 0.4$
- **Compound Multi-Category Threat Convergence:** $C_{\text{context}} = 1.15$
- **Default Baseline:** $C_{\text{context}} = 1.0$

---

## 🗺️ Application Routes & Core Modules

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | **Landing Page** | Dynamic interactive showcase featuring the threat landscape, live workflow visualizer, and rapid triage entry. |
| `/login` & `/signup` | **Authentication** | Secure Supabase authentication (email/password & OAuth) with automatic routing guards. |
| `/signout` | **Secure Sign Out** | Smooth session teardown with an animated 3-second redirect back to the home screen. |
| `/app` | **Home Dashboard** | Authenticated command center with quick-scan action triggers and threat status monitors. |
| `/app/analyze` | **Analyze Threats** | 3-tab triage console for Text Messages, Standalone URLs, and Android APK metadata. |
| `/app/analyze/results` | **Triage Results** | Animated SVG score gauge, confidence rating, highlighted evidence quotes, and copyable report. |
| `/app/awareness` | **Awareness Center** | Searchable repository of threat advisories and attack vector dissections. |
| `/app/safety-guide` | **Safety & 1930 Guide**| Immediate response checklist, evidence preservation handbook, and direct helpline triggers. |
| `/app/training` | **Training & Quizzes** | Gamified scenario simulations with interactive hotspot inspections and knowledge quizzes. |
| `/app/about` | **About & Methodology**| Mathematical scoring methodology, classification thresholds, and privacy manifestos. |

---

## 💻 Tech Stack & Tools

- **Frontend Core:** React 18, Vite 6, TypeScript 5 (Strict Mode)
- **Routing:** React Router DOM v6 with code-splitting (`React.lazy` / `Suspense`)
- **Styling:** Tailwind CSS v3, CSS variables for multi-theme palette
- **Motion & Smooth Scrolling:** GSAP ScrollTrigger, Lenis smooth scrolling, Framer Motion
- **Icons:** Lucide React
- **Authentication & Backend:** Supabase Client SDK (optional authentication & telemetries)
- **Testing:** Vitest, React Testing Library (with 75-sample detection benchmark corpus)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (`v18.x` or later)
- [npm](https://www.npmjs.com/) (`v9.x` or later)

### Installation
```bash
# Clone the repository
git clone https://github.com/Bhuvan-ACY/CyberShield.git
cd CyberShield

# Install project dependencies
npm install
```

### Environment Setup (Optional)
The core analysis engine runs completely client-side in the browser. For Supabase authentication features, create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Running Locally
```bash
# Start Vite local development server
npm run dev
```
Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing & Quality Assurance

```bash
# Run unit and benchmark test suites
npm run test

# Run tests in watch mode
npm run test:watch

# TypeScript type check (strict)
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📞 Official Emergency Resources (India)

If you or someone you know is facing an active cyber attack or extortion attempt:
- **National Cyber Crime Helpline:** Call **`1930`** (24x7 Toll-Free)
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **DoT Chakshu Portal (Suspected Fraud Communications):** [https://sancharsaathi.gov.in/sfc/](https://sancharsaathi.gov.in/sfc/)
- **CERT-In Incident Reporting:** [https://www.cert-in.org.in](https://www.cert-in.org.in)

---

## 📄 License & Privacy Guarantee

Distributed under the **MIT License**.

**Privacy Guarantee:** CyberShield was designed under a strict zero-retention architecture. No sensitive triage messages, passwords, OTPs, or personally identifiable information (PII) are ever stored or transmitted to external servers.
