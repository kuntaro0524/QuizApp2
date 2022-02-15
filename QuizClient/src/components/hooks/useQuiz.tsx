import { useContext } from "react";
import { AllQuizContext } from "../providers/QuizProvider";

// useContextを利用していることをカプセル化するためのクラス（らしい）

// import { NtrialContext, NtrialContextType } from "../providers/QuizProvider";

export const useQuiz = () => {
  const { quizArray, setQuizArray } = useContext(AllQuizContext);
  // (NtrialContextType) => useContext(AllQuizContext);

  return { quizArray, setQuizArray };
};
