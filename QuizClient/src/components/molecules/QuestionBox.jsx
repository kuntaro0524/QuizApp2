import React, { useCallback, useState } from "react";
import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { MyButton } from "../atoms/MyButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { answerState, quizState, readState } from "../hooks/quizState";

import { AnswerBox } from "../atoms/AnswerBox";
import { useCycleNum } from "../hooks/useCycleNum";
import { useNtry } from "../hooks/useNtrial";
import { useNcorr } from "../hooks/useNcorr";

export const QuestionBox = (props) => {
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const [quizInfo, setQuizInfo] = useRecoilState(quizState);
  // JSONで一気にやってみたかったけど分けてステート管理するのを実装してみる
  const readInfo = useRecoilValue(readState);
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const [answerInfo, setAnswerInfo] = useRecoilState(answerState);

  // Providerで定義したサイクル数のフックス
  const { ncycle, setCycle } = useCycleNum();

  // Providerで定義したこれまでのトライ回数
  const { ntrial_total, setNtrialTotal } = useNtry();

  // Providerで定義したこれまでのトライ回数
  const { ncorr_total, setNcorrTotal } = useNcorr();

  console.log("NCORR_TOTAL=" + ncorr_total);

  const onChangeInput = useCallback((e) => {
    let userAnswer = e.target.value;
    setAnswerInfo({ ...answerInfo, inputAnswer: userAnswer });
    // console.log(answerInfo);
  });
  // このときの問題文
  let current_question = quizInfo[answerInfo.currentIndex];
  console.log(current_question.question);

  const onClickCheckAnswer = () => {
    // この問題の答え
    let correctAnswer = current_question.answer;
    console.log("CORRECT_ANSWER=" + correctAnswer);
    console.log("User_ANSWER=" + answerInfo.inputAnswer);

    setAnswerInfo({
      ...answerInfo,
      isAnswered: true,
      isCorrect: correctAnswer === answerInfo.inputAnswer,
    });
    console.log(answerInfo.isCorrect);
  };

  // 次のクイズボタンを押したらインデックスが変わる
  const onClickNextQuestion = useCallback((e) => {
    // 各設問に対する成績を埋めていくわけです
    // この問題の成績を更新する
    const new_ntry = current_question.ntrial + 1;
    let new_ncorr = current_question.ncorr;
    console.log("new_ncorr:" + new_ncorr);
    console.log("isCorrect:" + answerInfo.isCorrect);
    if (answerInfo.isCorrect) {
      new_ncorr = new_ncorr + 1;
      // 全体の正解数も記録更新
      setNcorrTotal(ncorr_total + 1);
    }
    let copy_to_change = {
      ...current_question,
      ntrial: new_ntry,
      ncorr: new_ncorr,
    };

    let copy_quizes = [...quizInfo];

    copy_quizes.splice(answerInfo.currentIndex, 1, copy_to_change);
    console.log(copy_quizes);
    setQuizInfo(copy_quizes);

    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    console.log(quizInfo);
    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    console.log("######################");
    console.log(copy_quizes);
    console.log("######################");

    console.log(
      "Updated object:" + copy_quizes[answerInfo.currentIndex].question
    );
    console.log("Updated ncorr:" + copy_quizes[answerInfo.currentIndex].ncorr);
    console.log("Updated ntry:" + copy_quizes[answerInfo.currentIndex].ntrial);

    // クイズのインデックスをインクリメント
    let nextIndex = answerInfo.currentIndex + 1;
    if (quizInfo.length === nextIndex) {
      console.log("next index is reset to 0.");

      nextIndex = 0;
      setCycle(ncycle + 1);
    }
    setAnswerInfo({
      isAnswered: false,
      currentIndex: nextIndex,
      inputAnswer: "",
      isCorrect: false,
    });
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
            <Text fontSize="3xl"> {current_question.question} </Text>
            <Input
              value={answerInfo.inputAnswer}
              fontSize="3xl"
              placeholder="ここに答えを書く"
              onChange={onChangeInput}
            />
            <AnswerBox
              answer={current_question.answer}
              isAnswered={answerInfo.isAnswered}
              isCorrect={answerInfo.isCorrect}
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
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};
