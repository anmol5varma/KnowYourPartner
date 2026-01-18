
export type QuestionType = 'singleSelect' | 'multiSelect';

export interface Option {
  label: string;
  value: string;
}

export interface ShowIf {
  questionId: string;
  operator: '==' | '!=' | 'in';
  value: any;
}

export interface Question {
  id: string;
  section: string;
  sectionNumber: number;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options: Option[];
  maxSelect?: number;
  required: boolean;
  showIf?: ShowIf;
  hasOther?: boolean;
}

export interface SectionTransition {
  id: string;
  type: 'transition' | 'intro';
  message: string;
  cta: string;
  targetSectionNumber: number;
}

export type Step = 
  | { type: 'intro'; id: 'intro'; message: string; cta: string }
  | { type: 'question'; question: Question }
  | { type: 'transition'; id: string; message: string; cta: string; sectionNumber: number }
  | { type: 'summary'; id: 'summary' };

export type Answers = Record<string, string | string[]>;

export interface QuestionnaireState {
  currentIndex: number;
  answers: Answers;
  autoAdvance: boolean;
}
