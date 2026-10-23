import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AWARENESS_ARTICLES, AwarenessArticle } from '../data/articles';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const AwarenessPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'digital_arrest', label: 'Digital Arrest Scams' },
    { id: 'phishing', label: 'Phishing & Credentials' },
    { id: 'url', label: 'Malicious URLs' },
    { id: 'app_safety', label: 'Mobile App Security' },
  ];

  const filteredArticles = useMemo(() => {
    return AWARENESS_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.content.some((para) => para.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary">
          <BookOpen className="h-3.5 w-3.5 text-cobalt" />
          <span>Knowledge & Defense Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-primary">
          Cyber Threat Awareness Guides
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Master the psychological manipulation patterns, technical indicators, and legal realities behind modern scams targeting digital citizens in India.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-faint" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by scam keywords, CBI, OTP, APK..."
            className="pl-9"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors select-none min-h-[38px] ${
                selectedCategory === cat.id
                  ? 'bg-ink-dark text-canvas border-ink-dark'
                  : 'bg-canvas text-ink-muted border-hairline hover:bg-surface-1 hover:text-ink-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 border border-hairline rounded-lg bg-canvas space-y-2">
          <p className="text-sm text-ink-muted font-medium">No educational guides found matching your search.</p>
          <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article: AwarenessArticle) => {
            const isExpanded = expandedArticleId === article.id;
            return (
              <Card
                key={article.id}
                hoverable={!isExpanded}
                className={`flex flex-col justify-between transition-all ${
                  isExpanded ? 'md:col-span-2 shadow-halo border-ink-dark/40' : ''
                }`}
              >
                <div>
                  <CardHeader className="pb-3 border-none">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="surface" size="sm">
                        {article.categoryLabel}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <CardTitle className="text-lg sm:text-xl leading-snug">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1.5">
                      {article.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Expanded Article Body */}
                    {isExpanded && (
                      <div className="space-y-4 pt-4 border-t border-hairline mt-3 text-sm sm:text-base text-ink-primary leading-relaxed">
                        {article.content.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}

                        {/* Key Takeaways Callout */}
                        <div className="bg-surface-1 border border-hairline rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-sm text-ink-dark uppercase tracking-wider">
                            <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                            Essential Citizen Takeaways
                          </div>
                          <ul className="list-disc pl-4 space-y-1.5 text-sm text-ink-muted">
                            {article.keyTakeaways.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>

                {/* Footer action button */}
                <div className="pt-4 border-t border-surface-1 mt-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedArticleId(isExpanded ? null : article.id)}
                  >
                    {isExpanded ? 'Collapse Guide' : 'Read Full Guide'}
                  </Button>

                  <Link to="/app/analyze">
                    <span className="text-xs font-semibold text-cobalt hover:underline inline-flex items-center gap-1">
                      Test in Analyzer <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Bottom CTA to Quizzes */}
      <div className="border border-hairline rounded-lg p-6 bg-surface-1/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-ink-primary">Want to test your fraud detection skills?</h3>
          <p className="text-xs text-ink-muted">
            Take our 10-question cybersecurity hygiene quiz or test interactive scam scenarios.
          </p>
        </div>
        <Link to="/app/training">
          <Button variant="primary" size="sm" className="shrink-0">
            Start Cybersecurity Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
};
