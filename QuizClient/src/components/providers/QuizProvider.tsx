// クイズ情報をとりあつかうプロバイダ
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { QuizInfo } from "../types/api/quizinfo";

// 保持する変数と設定関数
export type AllQuizType = {
  // クイズ情報を保持する配列
  quizArray: QuizInfo[];
  // useState などの更新関数の型は以下のようになるらしい→おぼえげー
  setQuizArray: Dispatch<SetStateAction<Array<QuizInfo>>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const AllQuizContext = createContext<AllQuizType>({} as AllQuizType);

// childrenすべてに影響があるよーって話だったっけ
export const AllQuizProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // 再レンダリングする規模によっては変数と関数は別にしたほうが良い場合もある
  const [quizArray, setQuizArray] = useState<Array<QuizInfo>>([
    {
      _id: "3",
      question: "This is it?",
      answer: "Yes, that is it.",
      page: 350,
      made_date: "2021/02/15",
      ntrial: 0,
      ncorr: 0,
      corr_ratio: 0.0,
      category: "papa",
      grade: 1
    },
  ]);
  return (
    <AllQuizContext.Provider value={{ quizArray, setQuizArray }}>
      {children}
    </AllQuizContext.Provider>
  );
};
