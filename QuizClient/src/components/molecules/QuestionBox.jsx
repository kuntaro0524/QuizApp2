import React, { useCallback, useState } from "react";
import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { MyButton } from "../atoms/MyButton";
import { useRecoilState, useRecoilValue } from "recoil";
// import { answerState, quizState, readState } from "../hooks/quizState";

import { AnswerBox } from "../atoms/AnswerBox";
import { useCycleNum } from "../hooks/useCycleNum";
import { useNtry } from "../hooks/useNtrial";
import { useNcorr } from "../hooks/useNcorr";
import { useQuiz } from "../hooks/useQuiz";

export const QuestionBox = (props) => {
  const { quizArray, setQuizArray } = useQuiz();

  // Providerで定義したサイクル数のフックス
  const { ncycle, setCycle } = useCycleNum();

  // Providerで定義したこれまでのトライ回数
  const { ntrial_total, setNtrialTotal } = useNtry();

  // Providerで定義したこれまでのトライ回数
  const { ncorr_total, setNcorrTotal } = useNcorr();

  console.log("NCORR_TOTAL=" + ncorr_total);

  const onChangeInput = useCallback((e) => {
    let userAnswer = e.target.value;
    // setAnswerInfo({ ...answerInfo, inputAnswer: userAnswer });
  });
  // このときの問題文
  const currentIndex = 0;
  let current_question = quizArray[currentIndex];
  console.log(current_question.question);

  const onClickCheckAnswer = () => {
    // この問題の答え
    let correctAnswer = current_question.answer;
    console.log("CORRECT_ANSWER=" + correctAnswer);
    // console.log("User_ANSWER=" + answerInfo.inputAnswer);

    // setAnswerInfo({
    //   ...answerInfo,
    //   isAnswered: true,
    //   isCorrect: correctAnswer === answerInfo.inputAnswer,
    // });
    // console.log(answerInfo.isCorrect);
  };

  // 次のクイズボタンを押したらインデックスが変わる
  const onClickNextQuestion = useCallback((e) => {
    // 各設問に対する成績を埋めていくわけです
    // この問題の成績を更新する
    const new_ntry = current_question.ntrial + 1;
    let new_ncorr = current_question.ncorr;
    console.log("new_ncorr:" + new_ncorr);
    // console.log("isCorrect:" + answerInfo.isCorrect);
    // if (answerInfo.isCorrect) {
    //   new_ncorr = new_ncorr + 1;
    //   // 全体の正解数も記録更新
    //   setNcorrTotal(ncorr_total + 1);
    // }
    let copy_to_change = {
      ...current_question,
      ntrial: new_ntry,
      ncorr: new_ncorr,
    };

    let copy_quizes = [...quizArray];

    copy_quizes.splice(currentIndex, 1, copy_to_change);
    console.log(copy_quizes);
    setQuizArray(copy_quizes);

    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    console.log(quizArray);
    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    console.log("######################");
    console.log(copy_quizes);
    console.log("######################");

    console.log("Updated object:" + copy_quizes[currentIndex].question);
    console.log("Updated ncorr:" + copy_quizes[currentIndex].ncorr);
    console.log("Updated ntry:" + copy_quizes[currentIndex].ntrial);

    // クイズのインデックスをインクリメント
    let nextIndex = currentIndex + 1;
    if (quizArray.length === nextIndex) {
      console.log("next index is reset to 0.");

      nextIndex = 0;
      setCycle(ncycle + 1);
    }
    // setAnswerInfo({
    //   isAnswered: false,
    //   currentIndex: nextIndex,
    //   inputAnswer: "",
    //   isCorrect: false,
    // });
    // 今回何問問題をやっているか
    setNtrialTotal(ntrial_total + 1);
    console.log(`今までにやった問題数 ${ntrial_total}`);
    console.log(`今までの正答数 ${ncorr_total}`);
  });

  return (
    <div>
      <h1>
        この問題の過去の正答率
        {current_question.ntry != 0
          ? ((current_question.ncorr / current_question.ntry) * 100.0).toFixed(
              1
            )
          : 0.0}
        :
      </h1>
      <Flex bg="darkgreen.100" size="400px" w="800px">
        <Box>
          <Stack spacing={3}>
            <Text fontSize="3xl"> This is it </Text>
            <Text fontSize="3xl"> {current_question.question} </Text>
            {/* <Input
              // value={answerInfo.inputAnswer}
              fontSize="3xl"
              placeholder="ここに答えを書く"
              onChange={onChangeInput}
            /> */}
            {/* <AnswerBox
              answer={current_question.answer}
              // isAnswered={answerInfo.isAnswered}
              // isCorrect={answerInfo.isCorrect}
            />
            <Flex>
              <Box>
                <MyButton onClick={onClickCheckAnswer} colorScheme="teal">
                  Check the answer
                </MyButton>
                <MyButton onClick={onClickNextQuestion}>
                  Next question.
                </MyButton>
              </Box>
            </Flex> */}
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};
