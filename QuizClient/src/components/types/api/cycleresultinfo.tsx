export type ResultInfo = {
  user: string;
  quizMatchID: string;
  cycle: number;
  subject: string;
  _id?: string;
  q_id: string;
  isCorrect: boolean;
  datetime: number;
  ntrial: number;
  ncorr: number;
  corr_ratio: number;
};
