
import React from 'react';

interface TransitionScreenProps {
  message: string;
  cta: string;
  onContinue: () => void;
  isIntro?: boolean;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ message, cta, onContinue, isIntro }) => {
  return (
    <div className="text-center max-w-xl mx-auto flex flex-col items-center">
      {isIntro && (
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-10 overflow-hidden shadow-inner border border-stone-200">
           <img src="https://picsum.photos/seed/anmol/200/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      )}
      
      <h1 className={`text-4xl md:text-5xl font-serif font-medium text-stone-800 mb-12 leading-tight ${!isIntro ? 'italic' : ''}`}>
        {message}
      </h1>
      
      <button
        onClick={onContinue}
        className="px-10 py-4 bg-stone-800 text-white rounded-full font-semibold text-xl shadow-xl hover:bg-stone-900 transition-all hover:scale-105 active:scale-95 group flex items-center gap-3"
      >
        {cta}
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default TransitionScreen;
