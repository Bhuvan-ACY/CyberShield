import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-hairline bg-canvas mt-16 text-sm text-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-ink-dark text-canvas flex items-center justify-center">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-bold text-base text-ink-dark">CyberShield</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">
              Citizen Threat Triage & Incident Escalation Engine. Built on transparent, explainable client-side heuristics.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
              <Lock className="h-3.5 w-3.5 text-emerald-600" />
              <span>Zero data persistence. 100% in-memory processing.</span>
            </div>
          </div>

          {/* Col 2: Platform Navigation */}
          <div className="space-y-2">
            <h4 className="font-semibold text-ink-primary text-xs tracking-wider uppercase">Triage Platform</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/analyze" className="hover:text-ink-dark transition-colors">
                  Analyze Suspicious Message
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="hover:text-ink-dark transition-colors">
                  Inspect URL Structure
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="hover:text-ink-dark transition-colors">
                  App Metadata Evaluation
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-ink-dark transition-colors">
                  Scam Simulator & Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Knowledge & Guides */}
          <div className="space-y-2">
            <h4 className="font-semibold text-ink-primary text-xs tracking-wider uppercase">Resources</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/awareness" className="hover:text-ink-dark transition-colors">
                  Threat Awareness Center
                </Link>
              </li>
              <li>
                <Link to="/safety-guide" className="hover:text-ink-dark transition-colors">
                  Victim Incident Response Checklist
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ink-dark transition-colors">
                  Scoring Methodology & Limits
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ink-dark transition-colors">
                  Zero-Retention Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Indian Government Helplines */}
          <div className="space-y-2">
            <h4 className="font-semibold text-ink-primary text-xs tracking-wider uppercase">Official Indian Reporting</h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="tel:1930"
                  className="inline-flex items-center gap-1 font-semibold text-error hover:text-error-on transition-colors"
                >
                  National Helpline: 1930 <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cobalt transition-colors"
                >
                  cybercrime.gov.in <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in/sfc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cobalt transition-colors"
                >
                  DoT Chakshu Portal <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cert-in.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cobalt transition-colors"
                >
                  CERT-In Incident Reporting <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
          <p>
            <strong>Disclaimer:</strong> CyberShield is an educational, heuristic threat triage engine. It does not ping external servers or decompile APKs. It is not an official government portal. In active emergencies, report to official law enforcement via 1930.
          </p>
          <div className="shrink-0">
            &copy; {new Date().getFullYear()} CyberShield Enhanced MVP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
