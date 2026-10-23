import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { SAMPLE_SCENARIOS } from '../hooks/useSampleLoader';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Tabs, TabItem } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { AppMetadataPayload } from '@/engine/types';
import {
  MessageSquare,
  Link as LinkIcon,
  Smartphone,
  Shield,
  Sparkles,
  Lock,
} from 'lucide-react';

const COMMON_PERMISSIONS = [
  { id: 'BIND_ACCESSIBILITY_SERVICE', label: 'Accessibility Service (BIND_ACCESSIBILITY_SERVICE)', highRisk: true },
  { id: 'READ_SMS', label: 'Read SMS / OTP Messages (READ_SMS)', highRisk: true },
  { id: 'RECEIVE_SMS', label: 'Receive SMS (RECEIVE_SMS)', highRisk: true },
  { id: 'SYSTEM_ALERT_WINDOW', label: 'Display Over Other Apps (SYSTEM_ALERT_WINDOW)', highRisk: true },
  { id: 'BIND_DEVICE_ADMIN', label: 'Device Administrator Access (BIND_DEVICE_ADMIN)', highRisk: true },
  { id: 'READ_CONTACTS', label: 'Read Contacts (READ_CONTACTS)', highRisk: false },
  { id: 'CAMERA', label: 'Camera Access (CAMERA)', highRisk: false },
  { id: 'RECORD_AUDIO', label: 'Microphone / Record Audio (RECORD_AUDIO)', highRisk: false },
  { id: 'INTERNET', label: 'Standard Internet Access (INTERNET)', highRisk: false },
];

export const AnalysisForm: React.FC = () => {
  const navigate = useNavigate();
  const { analyze, isAnalyzing } = useAnalysis();

  const [activeTab, setActiveTab] = useState<string>('message');

  // Form states
  const [messageText, setMessageText] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [appName, setAppName] = useState<string>('');
  const [packageId, setPackageId] = useState<string>('');
  const [installationSource, setInstallationSource] = useState<AppMetadataPayload['installationSource']>('Google Play Store');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [claimedPublisher, setClaimedPublisher] = useState<string>('');

  const [validationError, setValidationError] = useState<string | null>(null);

  const tabs: TabItem[] = [
    { id: 'message', label: 'Message / SMS / Email', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'url', label: 'Standalone URL Inspection', icon: <LinkIcon className="h-4 w-4" /> },
    { id: 'app', label: 'Mobile App Permissions', icon: <Smartphone className="h-4 w-4" /> },
  ];

  const handleSelectSample = (scenarioId: string) => {
    const scenario = SAMPLE_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setValidationError(null);
    setActiveTab(scenario.category);

    if (scenario.payload.messageText) {
      setMessageText(scenario.payload.messageText);
    }
    if (scenario.payload.url) {
      setUrlInput(scenario.payload.url);
    }
    if (scenario.payload.appMetadata) {
      setAppName(scenario.payload.appMetadata.appName);
      setPackageId(scenario.payload.appMetadata.packageId || '');
      setInstallationSource(scenario.payload.appMetadata.installationSource);
      setSelectedPermissions(scenario.payload.appMetadata.permissions);
      setClaimedPublisher(scenario.payload.appMetadata.claimedPublisher || '');
    }
  };

  const handleTogglePermission = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (activeTab === 'message') {
      const trimmed = messageText.trim();
      if (!trimmed) {
        setValidationError('Please enter or paste message content to evaluate.');
        return;
      }
      if (trimmed.length > 5000) {
        setValidationError('Message exceeds maximum 5,000 characters limit.');
        return;
      }
      analyze({
        type: 'message',
        messageText: trimmed,
      });
    } else if (activeTab === 'url') {
      const trimmed = urlInput.trim();
      if (!trimmed) {
        setValidationError('Please enter a URL to inspect.');
        return;
      }
      analyze({
        type: 'url',
        url: trimmed,
      });
    } else if (activeTab === 'app') {
      const trimmedName = appName.trim();
      if (!trimmedName) {
        setValidationError('Please enter an application name.');
        return;
      }
      analyze({
        type: 'app',
        appMetadata: {
          appName: trimmedName,
          packageId: packageId.trim() || undefined,
          installationSource,
          permissions: selectedPermissions,
          claimedPublisher: claimedPublisher.trim() || undefined,
        },
      });
    }

    navigate('/app/analyze/results');
  };

  const handleClear = () => {
    setMessageText('');
    setUrlInput('');
    setAppName('');
    setPackageId('');
    setInstallationSource('Google Play Store');
    setSelectedPermissions([]);
    setClaimedPublisher('');
    setValidationError(null);
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-flat border-hairline">
      {/* Sample Scenarios Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-surface-1">
        <div className="flex items-center gap-1.5 text-xs text-ink-primary font-medium">
          <Sparkles className="h-4 w-4 text-cobalt" />
          <span>Load Realistic Incident Scenario:</span>
        </div>

        <select
          onChange={(e) => {
            if (e.target.value) handleSelectSample(e.target.value);
          }}
          defaultValue=""
          className="w-full sm:w-auto min-h-[38px] text-xs bg-surface-1 border border-hairline rounded-lg px-3 py-1.5 text-ink-primary focus:outline-none focus:ring-1 focus:ring-ink-dark"
        >
          <option value="" disabled>
            Select a sample incident...
          </option>
          {SAMPLE_SCENARIOS.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
      </div>

      <Tabs items={tabs} activeTab={activeTab} onChange={(id) => { setActiveTab(id); setValidationError(null); }} className="mb-6" />

      {validationError && (
        <Alert variant="error" title="Validation Notice" className="mb-4">
          {validationError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab 1: Message Text */}
        {activeTab === 'message' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="message-input" className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
                Paste SMS, WhatsApp, or Email Text
              </label>
              <span className={`text-xs font-mono ${messageText.length > 5000 ? 'text-error font-bold' : 'text-ink-secondary'}`}>
                {messageText.length} / 5,000 characters
              </span>
            </div>

            <Textarea
              id="message-input"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Paste suspected phishing message, digital arrest summons, or prize notification here... (e.g. 'URGENT: Your bank account will be blocked today...')"
              className="font-sans text-base"
            />

            <div className="flex items-center gap-2 text-sm text-ink-secondary">
              <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Zero-knowledge client analysis: Raw message text is processed in-memory and never sent to remote servers or saved.</span>
            </div>
          </div>
        )}

        {/* Tab 2: Standalone URL */}
        {activeTab === 'url' && (
          <div className="space-y-3">
            <label htmlFor="url-input" className="text-xs font-semibold text-ink-primary uppercase tracking-wider block">
              Enter Web Link or Domain to Inspect
            </label>

            <Input
              id="url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://sbi-verification.top/login or https://incometax.gov.in.security-update.xyz"
            />

            <Alert variant="info" title="Zero-Fetch Static Parser Security Guarantee">
              CyberShield analyzes URL structure, IP hosts, ports, deceptive subdomains, and suspicious TLDs purely through syntax analysis. We never ping or fetch target websites, ensuring you are safe from exploit payloads or tracking cookies.
            </Alert>
          </div>
        )}

        {/* Tab 3: Mobile App Metadata */}
        {activeTab === 'app' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-primary uppercase tracking-wider block mb-1.5">
                  Application Name *
                </label>
                <Input
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g. PM Electricity Subsidy or SBI QuickPay"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-primary uppercase tracking-wider block mb-1.5">
                  Installation Source *
                </label>
                <select
                  value={installationSource}
                  onChange={(e) => setInstallationSource(e.target.value as AppMetadataPayload['installationSource'])}
                  className="w-full h-10 rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm text-ink-primary focus:outline-none focus:ring-1 focus:ring-ink-dark"
                >
                  <option value="Google Play Store">Google Play Store (Official)</option>
                  <option value="Apple App Store">Apple App Store (Official)</option>
                  <option value="Direct APK Download / Web">Direct APK Download / Web (Sideloaded)</option>
                  <option value="WhatsApp / Telegram Link">WhatsApp / Telegram Link (Untrusted)</option>
                  <option value="Unknown / Third-Party">Unknown / Third-Party Source</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-primary uppercase tracking-wider block mb-2">
                Requested Android Permissions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-hairline rounded-lg p-3 bg-canvas">
                {COMMON_PERMISSIONS.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-start gap-2.5 p-1.5 text-xs text-ink-primary hover:bg-surface-1/40 rounded cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm.id)}
                      onChange={() => handleTogglePermission(perm.id)}
                      className="mt-0.5 rounded border-hairline"
                    />
                    <span className={perm.highRisk ? 'font-semibold text-ink-dark' : 'text-ink-muted'}>
                      {perm.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-hairline">
          <Button type="button" variant="ghost" size="sm" onClick={handleClear} className="w-full sm:w-auto min-h-[44px]">
            Clear Form
          </Button>

          <Button type="submit" variant="primary" size="md" isLoading={isAnalyzing} className="w-full sm:w-auto min-h-[44px]">
            <Shield className="h-4 w-4" />
            Analyze Threat Heuristics
          </Button>
        </div>
      </form>
    </Card>
  );
};
