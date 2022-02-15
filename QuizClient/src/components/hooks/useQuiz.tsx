import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AllQuizContext } from "../providers/QuizProvider";
import { QuizInfo } from "../types/api/quizinfo";

// useContextを利用していることをカプセル化するためのクラス（らしい）

// import { NtrialContext, NtrialContextType } from "../providers/QuizProvider";

export const useQuiz = () => {
  const { quizArray, setQuizArray } = useContext(AllQuizContext);
  // (NtrialContextType) => useContext(AllQuizContext);
  const [isRead, setIsRead] = useState<boolean>(false);

  const getQuizes = () => {
    useEffect(() => {
      axios
        .get<Array<QuizInfo>>("http://localhost:9201/quiz", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log(quizArray);

          console.log(typeof res.data);
          console.log(typeof quizArray);
          // const newQuizArray = {...quizArray, res.data};
          // console.log(typeof res.data);
          console.log(res.data);

          setQuizArray(res.data);
          console.log(quizArray);
        })
        .catch(function (error) {
          console.log("ERROR?");
          console.log(error.config);
          for (let key of Object.keys(error)) {
            console.log(key);
            console.log(error[key]);
          }
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }, []);
  };

  return { quizArray, setQuizArray, getQuizes };
};
