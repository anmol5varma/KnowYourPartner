
import React, { useState, useMemo } from 'react';
import { QUESTIONS } from '../data/questions';
import { Answers } from '../types';
import { formatSummaryText } from '../utils/logic';

interface SummaryProps {
  answers: Answers;
  onReset: () => void;
}

const Summary: React.FC<SummaryProps> = ({ answers, onReset }) => {
  const [copied, setCopied] = useState(false);

  const groupedResults = useMemo(() => {
    const sections: { title: string; questions: { q: string; a: string | string[] }[] }[] = [];
    
    // Hardcoded unique sections in order
    const sectionNames = Array.from(new Set(QUESTIONS.map(q => q.section)));

    sectionNames.forEach(secName => {
      const qInSec = QUESTIONS.filter(q => q.section === secName && answers[q.id]);
      if (qInSec.length > 0) {
        sections.push({
          title: secName,
          questions: qInSec.map(q => ({
            q: q.title,
            a: answers[q.id]
          }))
        });
      }
    });

    return sections;
  }, [answers]);

  const handleCopy = () => {
    const text = formatSummaryText(groupedResults);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-800 mb-4">Well done.</h1>
        <p className="text-stone-500 text-lg">Here’s a summary of what you shared. You can copy this to share with Anmol.</p>
      </div>

      <div className="space-y-12 mb-16">
        {groupedResults.map((section, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-6 pb-2 border-b border-stone-50">
              {section.title}
            </h3>
            <div className="space-y-6">
              {section.questions.map((item, qIdx) => (
                <div key={qIdx}>
                  <p className="text-stone-400 text-sm mb-1">{item.q}</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(item.a) ? (
                      item.a.map((val, vIdx) => (
                        <span key={vIdx} className="bg-stone-50 text-stone-700 px-3 py-1 rounded text-base font-medium border border-stone-100">
                          {val}
                        </span>
                      ))
                    ) : (
                      <span className="text-stone-800 text-lg font-medium">
                        {item.a}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-10 flex flex-col md:flex-row gap-4 justify-center items-center">
        <button
          onClick={handleCopy}
          className="w-full md:w-auto px-10 py-4 bg-stone-800 text-white rounded-full font-semibold text-lg shadow-xl flex items-center justify-center gap-3 hover:bg-stone-900 transition-all hover:scale-105 active:scale-95"
        >
          {copied ? 'Copied to Clipboard!' : 'Copy Summary'}
          {!copied && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>

        <button
          onClick={onReset}
          className="w-full md:w-auto px-10 py-4 border-2 border-stone-200 text-stone-500 rounded-full font-semibold text-lg hover:bg-white hover:border-stone-400 transition-all"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Summary;
