import React, { useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";

import { ScoreTable } from "../atoms/ScoreTable";
import { useRecoilValue } from "recoil";
import { QuestionBox } from "../molecules/QuestionBox";
import axios from "axios";
import { useRecoilState } from "recoil";
import { QuizInfo } from "../types/api/quizinfo";
import { useQuiz } from "../hooks/useQuiz";
// import { useResult } from "../hooks/useResult";

export const QuizLayout = () => {
  // axiosを利用してクイズをすべて読み込んでいる
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const { quizArray, setQuizArray } = useQuiz();
  let first_read = false;

  useEffect(() => {
    axios
      .get<Array<QuizInfo>>("http://localhost:9201/quiz", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setQuizArray(res.data);
        console.log(quizArray);
        first_read = true;
      })
      .catch(function (error) {
        console.log("ERROR?");
        console.log(error.config);
        for (let key of Object.keys(error)) {
          console.log(key);
          console.log(error[key]);
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  return (
    <>
      <h1> Hello world </h1>
      {/* <ScoreTable /> */}
      <QuestionBox />
    </>
  );
};
