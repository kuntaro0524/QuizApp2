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
  quizArray: QuizInfo[] | null;
  // useState などの更新関数の型は以下のようになるらしい→おぼえげー
  setQuizArray: Dispatch<SetStateAction<QuizInfo[] | null>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const AllQuizContext = createContext<AllQuizType>({} as AllQuizType);

// childrenすべてに影響があるよーって話だったっけ
export const AllQuizProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // 再レンダリングする規模によっては変数と関数は別にしたほうが良い場合もある
  const [quizArray, setQuizArray] = useState<QuizInfo[] | null>(null);
  return (
    <AllQuizContext.Provider value={{ quizArray, setQuizArray }}>
      {children}
    </AllQuizContext.Provider>
  );
};
