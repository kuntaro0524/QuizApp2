import { memo, useEffect, VFC } from "react";
import { useQuiz } from "../hooks/useQuiz";

export const ViewQuiz: VFC = () => {
  const { getQuizes, quizArr, setQarr } = useQuiz();

  useEffect(() => getQuizes(), [quizArr]);
  console.log(quizArr);

  let copy_quizes = [...quizArr];
  let copy_to_change = { ...quizArr[0], ntrial: 15, ncorr: 12 };
  console.log(copy_to_change);

  copy_quizes.splice(0, 1, copy_to_change);
  console.log(copy_quizes);
  setQarr(copy_quizes);

  return (
    <>
      <h1>hello</h1>
    </>
  );
};
