
import React, { useState, useEffect } from 'react';
import { Question, Answers } from '../types';

interface QuestionCardProps {
  question: Question;
  answers: Answers;
  onAnswer: (id: string, value: string | string[]) => void;
  onNext: () => void;
  autoAdvance: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, onAnswer, onNext, autoAdvance }) => {
  const currentAnswer = answers[question.id];
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (typeof currentAnswer === 'string' && currentAnswer.startsWith('Other:')) {
      setOtherText(currentAnswer.replace('Other: ', ''));
    } else if (Array.isArray(currentAnswer)) {
      const otherVal = currentAnswer.find(v => v.startsWith('Other:'));
      if (otherVal) setOtherText(otherVal.replace('Other: ', ''));
    }
  }, [currentAnswer]);

  const handleSingleSelect = (val: string) => {
    onAnswer(question.id, val);
    if (autoAdvance) {
      setTimeout(onNext, 400);
    }
  };

  const handleMultiSelect = (val: string) => {
    let newAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    if (newAnswers.includes(val)) {
      newAnswers = newAnswers.filter(a => a !== val);
    } else {
      if (question.maxSelect && newAnswers.length >= question.maxSelect) return;
      newAnswers.push(val);
    }
    onAnswer(question.id, newAnswers);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setOtherText(text);
    const formatted = `Other: ${text}`;
    
    if (question.type === 'singleSelect') {
      onAnswer(question.id, formatted);
    } else {
      let newAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
      newAnswers = newAnswers.filter(a => !a.startsWith('Other:'));
      if (text.trim()) {
         newAnswers.push(formatted);
      }
      onAnswer(question.id, newAnswers);
    }
  };

  const isSelected = (val: string) => {
    if (val === 'Other') {
      return Array.isArray(currentAnswer) 
        ? currentAnswer.some(v => v.startsWith('Other:'))
        : (typeof currentAnswer === 'string' && currentAnswer.startsWith('Other:'));
    }
    return Array.isArray(currentAnswer) ? currentAnswer.includes(val) : currentAnswer === val;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col pb-16">
      <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-800 mb-2 leading-tight text-center md:text-left">
        {question.title}
      </h2>
      
      {question.subtitle && (
        <p className="text-stone-500 mb-8 text-lg text-center md:text-left">{question.subtitle}</p>
      )}

      <div className="space-y-3 mb-4 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
        {question.options.map((option, idx) => {
          const selected = isSelected(option.value);
          const hotkey = idx + 1;
          
          return (
            <div key={option.value} className="relative">
              <button
                onClick={() => question.type === 'multiSelect' ? handleMultiSelect(option.value) : handleSingleSelect(option.value)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between
                  ${selected 
                    ? 'border-stone-800 bg-stone-50 text-stone-800 ring-4 ring-stone-800/5' 
                    : 'border-stone-100 bg-white hover:border-stone-300 text-stone-600'
                  }`}
              >
                <div className="flex items-center gap-4">
                   <span className={`flex items-center justify-center min-w-[24px] h-6 rounded border text-[10px] font-bold transition-colors
                     ${selected ? 'bg-stone-800 border-stone-800 text-white' : 'bg-white border-stone-200 text-stone-400'}
                   `}>
                     {hotkey}
                   </span>
                   <span className="text-lg font-medium">{option.label}</span>
                </div>
                {question.type === 'multiSelect' && selected && (
                   <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center animate-in zoom-in-50 duration-200">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                   </div>
                )}
              </button>

              {option.value === 'Other' && selected && (
                <div className="mt-3 px-1 animate-in slide-in-from-top-2 duration-300">
                  <input
                    type="text"
                    value={otherText}
                    onChange={handleOtherChange}
                    autoFocus
                    placeholder="Tell us more..."
                    className="w-full bg-transparent border-b-2 border-stone-800 py-2 text-lg focus:outline-none transition-all placeholder:text-stone-300"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
