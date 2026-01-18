
import React, { useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Progress from './components/Progress';
import QuestionCard from './components/QuestionCard';
import TransitionScreen from './components/TransitionScreen';
import Summary from './components/Summary';
import { useQuestionnaire } from './hooks/useQuestionnaire';

const App: React.FC = () => {
  const {
    steps,
    currentStep,
    currentIndex,
    totalSteps,
    answers,
    handleAnswer,
    goToNext,
    goToPrev,
    autoAdvance,
    reset
  } = useQuestionnaire();

  // Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.key === 'Enter') {
         goToNext();
      }
      return;
    }

    if (e.key === 'Enter') {
      if (currentStep.type === 'question' && currentStep.question.required) {
        const val = answers[currentStep.question.id];
        if (Array.isArray(val) ? val.length > 0 : !!val) {
          goToNext();
        }
      } else {
        goToNext();
      }
    } else if (e.key === 'Backspace' || e.key === 'Escape') {
      goToPrev();
    }

    if (currentStep.type === 'question') {
      const keyNum = parseInt(e.key);
      if (!isNaN(keyNum) && keyNum > 0 && keyNum <= currentStep.question.options.length) {
        const option = currentStep.question.options[keyNum - 1];
        if (currentStep.question.type === 'multiSelect') {
          const currentAnswer = answers[currentStep.question.id];
          let newAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
          if (newAnswers.includes(option.value)) {
            newAnswers = newAnswers.filter(a => a !== option.value);
          } else {
            if (!currentStep.question.maxSelect || newAnswers.length < currentStep.question.maxSelect) {
              newAnswers.push(option.value);
            }
          }
          handleAnswer(currentStep.question.id, newAnswers);
        } else {
          handleAnswer(currentStep.question.id, option.value);
          if (autoAdvance) {
            setTimeout(goToNext, 400);
          }
        }
      }
    }
  }, [currentStep, goToNext, goToPrev, answers, handleAnswer, autoAdvance]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderStep = () => {
    switch (currentStep.type) {
      case 'intro':
        return <TransitionScreen isIntro message={currentStep.message} cta={currentStep.cta} onContinue={goToNext} />;
      case 'transition':
        return <TransitionScreen message={currentStep.message} cta={currentStep.cta} onContinue={goToNext} />;
      case 'question':
        return (
          <div className="w-full">
            <div className="mb-6 text-center">
              <span className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-semibold bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                Non-judgemental space
              </span>
            </div>
            <QuestionCard
              question={currentStep.question}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={goToNext}
              autoAdvance={autoAdvance}
            />
          </div>
        );
      case 'summary':
        return <Summary answers={answers} onReset={reset} />;
      default:
        return null;
    }
  };

  const isQuestionStep = currentStep.type === 'question';
  const hasValue = isQuestionStep ? (
    Array.isArray(answers[currentStep.question.id]) 
      ? (answers[currentStep.question.id] as string[]).length > 0 
      : !!answers[currentStep.question.id]
  ) : true;

  const showNextAsPrimary = isQuestionStep ? hasValue : true;

  return (
    <Layout stepKey={currentStep.type === 'question' ? currentStep.question.id : currentStep.id}>
      {currentStep.type !== 'summary' && (
        <Progress current={currentIndex} total={totalSteps - 1} />
      )}

      <div className="w-full max-w-4xl flex flex-col items-center">
        {renderStep()}
      </div>

      {/* Modern Integrated Navigation Footer - Only shown for Questions to avoid overlap on Transition screens */}
      {isQuestionStep && (
        <div className="fixed bottom-0 left-0 w-full bg-white/60 backdrop-blur-md border-t border-stone-100 px-6 py-4 z-40">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={goToPrev}
              className="group flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors font-medium px-4 py-2"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-6">
              <button
                onClick={goToNext}
                className="text-stone-400 hover:text-stone-600 transition-colors font-medium"
              >
                Skip
              </button>

              <button
                onClick={goToNext}
                disabled={currentStep.question.required && !hasValue}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold transition-all
                  ${showNextAsPrimary 
                    ? 'bg-stone-800 text-white shadow-md hover:bg-stone-900 active:scale-95' 
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed'}
                `}
              >
                {currentStep.question.type === 'multiSelect' ? 'OK' : 'Next'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
