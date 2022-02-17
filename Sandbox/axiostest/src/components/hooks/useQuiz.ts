import axios from "axios";
import { useCallback, useState } from "react";

import { QuizInfo } from "../types/quiz";

export const useQuiz = () => {
  // ユーザの配列として users を定義するということを型指定で明瞭にしておく
  const [quizArr, setQarr] = useState<Array<QuizInfo>>([]);

  const getQuizes = useCallback(() => {
    console.log("TESTTEST");

    axios
      .get<Array<QuizInfo>>("http://localhost:9201/quiz", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res);
        setQarr(res.data);
      })
      .catch(() => {
        console.log("Error reading");
      })
      .finally(() => {
        console.log("Ended");
      });
  }, []);

  return { getQuizes, quizArr, setQarr };
};
