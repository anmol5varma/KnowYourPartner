
import { useState, useEffect, useMemo, useCallback } from 'react';
import { QUESTIONS, SECTION_TRANSITIONS } from '../data/questions';
import { Step, Answers, Question } from '../types';
import { shouldShowQuestion } from '../utils/logic';

const STORAGE_KEY = 'marriage_starter_v1';

export const useQuestionnaire = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { answers: savedAnswers, currentIndex: savedIndex } = JSON.parse(saved);
        setAnswers(savedAnswers || {});
        setCurrentIndex(savedIndex || 0);
      } catch (e) {
        console.error("Error loading state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex }));
    }
  }, [answers, currentIndex, isLoaded]);

  // Generate steps based on logic
  const steps: Step[] = useMemo(() => {
    const s: Step[] = [];
    
    // Initial Intro
    const intro = SECTION_TRANSITIONS.find(t => t.id === 'start');
    if (intro) {
      s.push({ type: 'intro', id: 'intro', message: intro.message, cta: intro.cta });
    }

    // Iterate through sections and questions
    for (let i = 1; i <= 6; i++) {
      if (i > 1) {
        const transition = SECTION_TRANSITIONS.find(t => t.targetSectionNumber === i);
        if (transition) {
          s.push({ 
            type: 'transition', 
            id: transition.id, 
            message: transition.message, 
            cta: transition.cta,
            sectionNumber: i
          });
        }
      }

      const sectionQuestions = QUESTIONS.filter(q => q.sectionNumber === i);
      sectionQuestions.forEach(q => {
        if (shouldShowQuestion(q.showIf, answers)) {
          s.push({ type: 'question', question: q });
        }
      });
    }

    s.push({ type: 'summary', id: 'summary' });
    return s;
  }, [answers]);

  // Safety: If steps change and currentIndex is now out of bounds, adjust it.
  useEffect(() => {
    if (steps.length > 0 && currentIndex >= steps.length) {
      setCurrentIndex(steps.length - 1);
    }
  }, [steps.length, currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    steps,
    currentStep: steps[currentIndex] || steps[0],
    currentIndex,
    totalSteps: steps.length,
    answers,
    handleAnswer,
    goToNext,
    goToPrev,
    autoAdvance,
    setAutoAdvance,
    reset,
    isLoaded
  };
};
