import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { MyButton } from "../atoms/MyButton";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { answerState, quizState, readState } from "../hooks/quizState";

import { AnswerBox } from "../atoms/AnswerBox";
import { useCycleNum } from "../hooks/useCycleNum";
import { useNtry } from "../hooks/useNtrial";
import { useNcorr } from "../hooks/useNcorr";
import { useQuiz } from "../hooks/useQuiz";
import axios from "axios";
import { QuizInfo } from "../types/api/quizinfo";

export const QuestionBox = () => {
  const { quizArray, setQuizArray } = useQuiz();

  const [ncycle, setCycle] = useState(0);
  const [nAns, setNans] = useState(0);
  const [nCorrTotal, setNcorrTotal] = useState(0);

  // 各回答についてはQuestionBoxで寿命があるので良いかと
  const [userAnswer, setUserAnswer] = useState("");
  const [qindex, setQindex] = useState(0);
  let isCorrect=false;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // このときの問題文
  let currQ = quizArray[qindex];

  const onClickCheckAnswer = () => {
    // この問題の答え
    let correctAnswer = currQ.answer;
    console.log(userAnswer);
    console.log(correctAnswer);
    if (userAnswer === correctAnswer) {
      isCorrect=true;
    } else {
      isCorrect=false;
    }
    console.log(isCorrect);
  };

  const onClickEnd = () => {
    console.log(typeof(quizArray));
    quizArray.map(eachquiz => {
      // console.log(eachquiz._id);
      // console.log(eachquiz.question);
      const quiz_id = eachquiz._id;
      let quiz_url = `http://localhost:9201/quiz/${quiz_id}`;
      axios
        .patch<Array<QuizInfo>>(quiz_url, eachquiz, 
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })
        .then((res) => {
          console.log(res);
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
      })
  }

  // 次のクイズボタンを押したらインデックスが変わる
  const onClickNextQuestion = () => {
    console.log("Button was pushed");
    
    // 各設問に対する成績を埋めていくわけです
    // この問題の成績を更新する
    const new_ntry = currQ.ntrial + 1;
    let new_ncorr = currQ.ncorr;
    console.log("new_ncorr:" + new_ncorr);
    if (isCorrect) {
      new_ncorr = new_ncorr + 1;
      console.log(new_ncorr);
      
      // 全体の正解数も記録更新
      setNcorrTotal(nCorrTotal + 1);
    }
    // この問題の正答率を計算しておく
    let tmp_corr_ratio = new_ncorr / new_ntry * 100.0;
    let copy_to_change = {
      ...currQ,
      ntrial: new_ntry,
      ncorr: new_ncorr,
      corr_ratio: tmp_corr_ratio,
    };

    let copy_quizes = [...quizArray];

    copy_quizes.splice(qindex, 1, copy_to_change);
    setQuizArray(copy_quizes);

    // クイズのインデックスをインクリメント
    let nextIndex = qindex + 1;
    if (quizArray.length === nextIndex) {
      console.log("next index is reset to 0.");
      nextIndex = 0;
      setCycle(ncycle + 1);
    }

    // 今回何問問題をやっているか
    setQindex(qindex+1);
    setNans(nAns + 1);
    console.log(`今までにやった問題数 ${nAns}`);
    console.log(quizArray);

  };

  return (
    <div>
      <h1>
        この問題の過去の正答率
        {currQ.ntrial != 0
          ? ((currQ.ncorr / currQ.ntrial) * 100.0).toFixed(1)
          : 0.0}
        :
      </h1>
      <Flex bg="darkgreen.100" >
        <Box>
          <Stack spacing={3}>
            <Text fontSize="3xl"> This is it </Text>
            <Text fontSize="3xl"> {currQ.question} </Text>
             <Input
              value={userAnswer}
              fontSize="3xl"
              placeholder="ここに答えを書く"
              onChange={onChangeInput}
            />
            <Flex>
              <Box>
                <MyButton onClick={onClickCheckAnswer} colorScheme="teal">
                  Check the answer
                </MyButton>
                <MyButton onClick={onClickNextQuestion} colorScheme="pink">
                  Next question.
                </MyButton>
              </Box>
              <Box>
                <MyButton onClick={onClickEnd} colorScheme="red">
                  Finish this quiz.
                </MyButton>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};
