import { memo, useEffect, VFC } from "react";
import { useQuiz } from "../hooks/useQuiz";

export const ViewQuiz: VFC = () => {
  const { getQuizes, quizArr, setQarr } = useQuiz();

  getQuizes();

  return (
    <>
      <h1>hello</h1>
    </>
  );
};
