export type QuizResponseType = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer?: string;
  incorrect_answers: string[];
};

export type QuizClientType = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  answer: string[];
};
