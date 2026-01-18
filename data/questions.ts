
import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // Section 1
  {
    id: 'Q1',
    section: 'The vibe & what matters to you',
    sectionNumber: 1,
    title: 'What do you value most in a partner?',
    subtitle: 'Select up to 3 qualities that resonate most with you.',
    type: 'multiSelect',
    maxSelect: 3,
    required: true,
    hasOther: true,
    options: [
      { label: 'Trust / honesty', value: 'Trust / honesty' },
      { label: 'Kindness', value: 'Kindness' },
      { label: 'Ambition', value: 'Ambition' },
      { label: 'Family-oriented', value: 'Family-oriented' },
      { label: 'Independence', value: 'Independence' },
      { label: 'Spirituality', value: 'Spirituality' },
      { label: 'Compatibility / fun', value: 'Compatibility / fun' },
      { label: 'Emotional maturity', value: 'Emotional maturity' },
      { label: 'Other', value: 'Other' }
    ]
  },
  {
    id: 'Q2',
    section: 'The vibe & what matters to you',
    sectionNumber: 1,
    title: 'What helps you feel most secure/loved in a relationship?',
    subtitle: 'Choose up to 2 ways you experience connection.',
    type: 'multiSelect',
    maxSelect: 2,
    required: true,
    options: [
      { label: 'Quality time', value: 'Quality time' },
      { label: 'Words of affirmation', value: 'Words of affirmation' },
      { label: 'Acts of service', value: 'Acts of service' },
      { label: 'Physical affection', value: 'Physical affection' },
      { label: 'Gifts', value: 'Gifts' },
      { label: 'Trust + consistency', value: 'Trust + consistency' }
    ]
  },
  {
    id: 'Q3',
    section: 'The vibe & what matters to you',
    sectionNumber: 1,
    title: 'Your social-life style is usually closest to:',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Quite social / frequent outings', value: 'Quite social' },
      { label: 'Balanced', value: 'Balanced' },
      { label: 'Mostly homebody', value: 'Mostly homebody' },
      { label: 'Depends on workload/phase', value: 'Contextual' }
    ]
  },
  // Section 2
  {
    id: 'Q4',
    section: 'Life setup & priorities',
    sectionNumber: 2,
    title: 'After marriage, what living setup feels most comfortable to you?',
    subtitle: 'Think about the initial phase of your journey.',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Same city as my work', value: 'Same city as work' },
      { label: 'Flexible based on partner’s work', value: 'Flexible' },
      { label: 'Prefer close to parents', value: 'Close to parents' },
      { label: 'Prefer independent setup (separate home)', value: 'Independent setup' },
      { label: 'Open / depends', value: 'Open' }
    ]
  },
  {
    id: 'Q5',
    section: 'Life setup & priorities',
    sectionNumber: 2,
    title: 'Career ambition right now is:',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Very high (growth phase)', value: 'Very high' },
      { label: 'Moderate (balanced)', value: 'Moderate' },
      { label: 'Low (stability > growth)', value: 'Low' },
      { label: 'Depends on life stage', value: 'Fluid' }
    ]
  },
  {
    id: 'Q6',
    section: 'Life setup & priorities',
    sectionNumber: 2,
    title: 'How involved do you imagine families being after marriage?',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Very involved (regular decisions together)', value: 'Very involved' },
      { label: 'Involved for important matters', value: 'Partially involved' },
      { label: 'Mostly independent as a couple', value: 'Mostly independent' },
      { label: 'Depends / discuss', value: 'Discuss' }
    ]
  },
  // Section 3
  {
    id: 'Q7',
    section: 'Money comfort & shared decisions',
    sectionNumber: 3,
    title: 'When it comes to managing money as a couple, what feels most natural?',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Fully joint finances', value: 'Joint' },
      { label: 'Separate + shared household account', value: 'Hybrid' },
      { label: 'Mostly separate', value: 'Separate' },
      { label: 'Open / discuss', value: 'Discuss' }
    ]
  },
  {
    id: 'Q8',
    section: 'Money comfort & shared decisions',
    sectionNumber: 3,
    title: 'Your spending style is closest to:',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Planner / saver', value: 'Planner' },
      { label: 'Balanced', value: 'Balanced' },
      { label: 'Spontaneous spender', value: 'Spontaneous' },
      { label: 'Depends (I splurge but also save)', value: 'Mixed' }
    ]
  },
  {
    id: 'Q9',
    section: 'Money comfort & shared decisions',
    sectionNumber: 3,
    title: 'Comfort with debt/loans is:',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Prefer minimal debt', value: 'Minimal' },
      { label: 'Okay with planned debt (home loan etc.)', value: 'Planned' },
      { label: 'Comfortable if ROI makes sense', value: 'Calculated' },
      { label: 'Need to discuss', value: 'Discuss' }
    ]
  },
  // Section 4
  {
    id: 'Q10',
    section: 'Communication style',
    sectionNumber: 4,
    title: 'When there’s a disagreement, what usually works best for you?',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Talk it out immediately', value: 'Immediate talk' },
      { label: 'Take time and talk later', value: 'Cool down' },
      { label: 'I tend to avoid conflict', value: 'Avoidant' },
      { label: 'Need space + then resolve', value: 'Space then resolve' }
    ]
  },
  // Section 5
  {
    id: 'Q11',
    section: 'Kids & timelines',
    sectionNumber: 5,
    title: 'Do you see yourself wanting children?',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
      { label: 'Unsure / open to discuss', value: 'Unsure' }
    ]
  },
  {
    id: 'Q12',
    section: 'Kids & timelines',
    sectionNumber: 5,
    title: 'What timeline feels right (roughly)?',
    type: 'singleSelect',
    required: true,
    showIf: { questionId: 'Q11', operator: '!=', value: 'No' },
    options: [
      { label: 'Within 1 year', value: 'Within 1 year' },
      { label: '1–3 years', value: '1–3 years' },
      { label: '3–5 years', value: '3–5 years' },
      { label: 'Not sure / depends', value: 'Depends' }
    ]
  },
  {
    id: 'Q13',
    section: 'Kids & timelines',
    sectionNumber: 5,
    title: 'Ideally, how many kids do you see yourself having?',
    type: 'singleSelect',
    required: true,
    showIf: { questionId: 'Q11', operator: '!=', value: 'No' },
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3+', value: '3+' },
      { label: 'Not sure', value: 'Not sure' }
    ]
  },
  // Section 6
  {
    id: 'Q14',
    section: 'Romance, intimacy & comfort',
    sectionNumber: 6,
    title: 'What does romance look like to you?',
    type: 'multiSelect',
    maxSelect: 2,
    required: true,
    options: [
      { label: 'Quality time + dates', value: 'Quality time' },
      { label: 'Emotional conversations', value: 'Deep talks' },
      { label: 'Small surprises / gestures', value: 'Surprises' },
      { label: 'Physical affection', value: 'Physical' },
      { label: 'Travel/experiences together', value: 'Experiences' },
      { label: 'Not a big “romance” person', value: 'Low-key' }
    ]
  },
  {
    id: 'Q15',
    section: 'Romance, intimacy & comfort',
    sectionNumber: 6,
    title: 'How do you prefer to talk about personal needs?',
    subtitle: 'This includes romance and intimacy expectations.',
    type: 'singleSelect',
    required: true,
    options: [
      { label: 'Direct and open', value: 'Direct' },
      { label: 'Slowly, with trust over time', value: 'Gradual' },
      { label: 'I find it hard; prefer partner initiates', value: 'Reactive' },
      { label: 'Prefer not to answer yet', value: 'Prefer not to answer' }
    ]
  }
];

export const SECTION_TRANSITIONS = [
  { id: 'start', type: 'intro', message: 'Anmol wants to know you a little more.', cta: "Let's go", targetSectionNumber: 1 },
  { id: 's2', type: 'transition', message: 'Discuss a little about life setup and priorities', cta: 'Continue', targetSectionNumber: 2 },
  { id: 's3', type: 'transition', message: 'Money matters', cta: 'Continue', targetSectionNumber: 3 },
  { id: 's4', type: 'transition', message: 'Talk english, walk english', cta: 'Continue', targetSectionNumber: 4 },
  { id: 's5', type: 'transition', message: 'Kids, toys and more', cta: 'Continue', targetSectionNumber: 5 },
  { id: 's6', type: 'transition', message: "Let's talk about Physical touch, if you are comfortable", cta: 'Continue', targetSectionNumber: 6 }
];
