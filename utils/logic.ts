
import { Answers, ShowIf } from '../types';

/**
 * Evaluates the showIf logic for a question.
 */
export const shouldShowQuestion = (showIf: ShowIf | undefined, answers: Answers): boolean => {
  if (!showIf) return true;

  const { questionId, operator, value } = showIf;
  const answer = answers[questionId];

  if (answer === undefined) return false;

  switch (operator) {
    case '==':
      return answer === value;
    case '!=':
      return answer !== value;
    case 'in':
      if (Array.isArray(answer)) {
        return answer.includes(value);
      }
      return answer === value;
    default:
      return true;
  }
};

/**
 * Formats multi-select answers for copy-to-clipboard.
 */
export const formatSummaryText = (sections: { title: string; questions: { q: string; a: string | string[] }[] }[]) => {
  let text = "Conversation Starter Summary\n\n";
  sections.forEach(sec => {
    text += `[ ${sec.title.toUpperCase()} ]\n`;
    sec.questions.forEach(item => {
      const answerText = Array.isArray(item.a) ? item.a.join(", ") : item.a;
      text += `Q: ${item.q}\nA: ${answerText}\n\n`;
    });
    text += "\n";
  });
  return text;
};
