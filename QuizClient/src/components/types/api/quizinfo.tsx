export type QuizInfo = {
  _id: string;
  question: string;
  answer: string;
  page: number;
  category: string;
  made_date: string;
  ntrial: number;
  ncorr: number;
  corr_ratio: number;
};
