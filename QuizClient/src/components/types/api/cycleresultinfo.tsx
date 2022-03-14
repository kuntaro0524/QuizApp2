export type ResultInfo = {
  _id?: string;
  q_id: string;
  isCorrect: boolean;
  datetime: Date;
  ntrial: number;
  ncorr: number;
  corr_ratio: number;
};
