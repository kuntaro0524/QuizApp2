import React, { useEffect } from "react";
import { ScoreTable } from "../atoms/ScoreTable";
import { QuestionBox } from "../molecules/QuestionBox";
import axios from "axios";
import { QuizInfo } from "../types/api/quizinfo";
import { useQuiz } from "../hooks/useQuiz";

export const QuizLayout = () => {
  // axiosを利用してクイズをすべて読み込んでいる
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const { quizArray, setQuizArray, getQuizes } = useQuiz();

  getQuizes();
  return (
    <>
      <h1> Hello world </h1>
      {/* <ScoreTable /> */}
      <QuestionBox />
    </>
  );
};
