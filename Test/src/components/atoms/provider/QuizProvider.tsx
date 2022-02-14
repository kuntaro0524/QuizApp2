import { createContext, FC, useState } from "react";
import { QuizType } from "../QuizType";

// この名前で別のコンポーネントから参照する
export const QuizContext = createContext();

export const QuizContextProvider: FC = (props) => {
  const { children } = props;

  // ここで共通で利用するコンテキストを定義する
  const [quizItem, setQuizItem] = useState<QuizType[]>([
    {
      _id: "q01",
      question: "Is she a tennis player?",
      answer: "Yes, it is.",
      made_date: "Today",
      page: 100,
      ntrial: 0,
      ncorr: 3,
      corr_ratio: 0.5,
    },
    {
      _id: "q02",
      question: "Is she a basketball player?",
      answer: "Yes, it is.",
      made_date: "Today",
      ntrial: 0,
      page: 200,
      ncorr: 3,
      corr_ratio: 0.5,
    },
    {
      _id: "q03",
      question: "Is she a baseball player?",
      answer: "Yes, it is.",
      made_date: "Today",
      ntrial: 0,
      page: 300,
      ncorr: 3,
      corr_ratio: 0.5,
    },
  ]);

  return (
    <QuizContext.Provider value={{ quizItem, setQuizItem }}>
      {children}
    </QuizContext.Provider>
  );
};
