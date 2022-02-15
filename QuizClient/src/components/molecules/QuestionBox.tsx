import React, { ChangeEvent, useState } from "react";
import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { MyButton } from "../atoms/MyButton";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { answerState, quizState, readState } from "../hooks/quizState";

import { AnswerBox } from "../atoms/AnswerBox";
import { useCycleNum } from "../hooks/useCycleNum";
import { useNtry } from "../hooks/useNtrial";
import { useNcorr } from "../hooks/useNcorr";
import { useQuiz } from "../hooks/useQuiz";

export const QuestionBox = () => {
  const { quizArray, setQuizArray } = useQuiz();

  // Providerで定義したサイクル数のフッcurrQ
  const [ncycle, setCycle] = useState(0);
  const [nAns, setNans] = useState(0);
  const [nCorr, setNcorr] = useState(0);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let userAnswer = e.target.value;
    // setAnswerInfo({ ...answerInfo, inputAnswer: userAnswer });
  };
  // このときの問題文
  const currentIndex = 0;
  let currQ = quizArray[currentIndex];
  console.log(currQ);

  const onClickCheckAnswer = () => {
    // この問題の答え
    let correctAnswer = currQ.answer;
    console.log("CORRECT_ANSWER=" + correctAnswer);
  };

  // 次のクイズボタンを押したらインデックスが変わる
  const onClickNextQuestion = () => {
    // 各設問に対する成績を埋めていくわけです
    // この問題の成績を更新する
    const new_ntry = currQ.ntrial + 1;
    let new_ncorr = currQ.ncorr;
    console.log("new_ncorr:" + new_ncorr);
    // console.log("isCorrect:" + answerInfo.isCorrect);
    // if (answerInfo.isCorrect) {
    //   new_ncorr = new_ncorr + 1;
    //   // 全体の正解数も記録更新
    //   setNcorrTotal(ncorr_total + 1);
    // }
    let copy_to_change = {
      ...currQ,
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
    setNans(nAns + 1);
    console.log(`今までにやった問題数 ${nAns}`);
    // console.log(`今までの正答数 ${ncorr_total}`);
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
      <Flex bg="darkgreen.100" size="400px" w="800px">
        <Box>
          <Stack spacing={3}>
            <Text fontSize="3xl"> This is it </Text>
            <Text fontSize="3xl"> {currQ.question} </Text>
            {/* <Input
              // value={answerInfo.inputAnswer}
              fontSize="3xl"
              placeholder="ここに答えを書く"
              onChange={onChangeInput}
            /> */}
            {/* <AnswerBox
              answer={currQ.answer}
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
