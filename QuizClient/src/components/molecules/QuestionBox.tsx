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
import { useTable } from "../hooks/useTable";

type Props = {
  isFilter: boolean;
  filter_ratio: number;
  subject: string;
};

export const QuestionBox = (props: Props) => {
  const { quizArray, setQuizArray } = useQuiz();
  const { isFilter, filter_ratio, subject } = props;

  console.log("SUBJECT=" + subject);

  // const { ncycle, setCycle } = useCycleNum();
  // const [ncycle, setCycle] = useState(0);
  // const [nAns, setNans] = useState(0);
  // const [nCorrTotal, setNcorrTotal] = useState(0);

  const {
    ncycle,
    ntrial_total,
    ncorr_total,
    setCycle,
    setNtrialTotal,
    setNcorrTotal,
  } = useTable();

  // 各回答についてはQuestionBoxで寿命があるので良いかと
  const [userAnswer, setUserAnswer] = useState("");
  const [qindex, setQindex] = useState(0);

  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // このときの問題文
  let currQ = quizArray[qindex];

  const onClickCheckAnswer = () => {
    // この問題の答え
    let correctAnswer = currQ.answer;

    if (userAnswer === correctAnswer) {
      console.log("Correct answer!");
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsAnswered(true);
  };

  const updateDB = () => {
    console.log(typeof quizArray);
    quizArray.map((eachquiz) => {
      console.log(eachquiz._id);
      console.log(eachquiz.ntrial);
      const quiz_id = eachquiz._id;
      // let quiz_url = `http://192.168.99.123:9201/${category}/${quiz_id}`;
      // let quiz_url = `http://192.168.99.123:9201/${category}/${quiz_id}`;
      let quiz_url = `http://10.10.122.179:9201/${subject}/${quiz_id}`;
      axios
        .patch<Array<QuizInfo>>(quiz_url, eachquiz, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
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
    });
  };

  const onClickEnd = () => {
    updateDB();
  };

  const filterQuizes = (corr_threshold: number) => {
    console.log(`Filtered!! ${corr_threshold}`);
    const filtered_quiz = quizArray.filter(function (quiz) {
      console.log(quiz.corr_ratio);
      return quiz.ntrial < 2 || quiz.corr_ratio < corr_threshold;
      // return quiz.corr_ratio < corr_threshold;
    });
    console.log("<<<< before >>>>>");
    console.log(quizArray);
    console.log("<<<< after >>>>>");
    setQuizArray(filtered_quiz);
    console.log(quizArray);
  };

  // 次のクイズボタンを押したらインデックスが変わる
  const onClickNextQuestion = () => {
    console.log("Button was pushed");
    console.log("Correct Flag=" + isCorrect);

    // 各設問に対する成績を埋めていくわけです
    // この問題の成績を更新する
    const new_ntry = currQ.ntrial + 1;
    let new_ncorr = currQ.ncorr;
    console.log("new_ncorr:" + new_ncorr);
    if (isCorrect) {
      new_ncorr = new_ncorr + 1;
      console.log(new_ncorr);

      // 全体の正解数も記録更新
      setNcorrTotal(ncorr_total + 1);
    }
    // この問題の正答率を計算しておく
    let tmp_corr_ratio = (new_ncorr / new_ntry) * 100.0;
    let copy_to_change = {
      ...currQ,
      ntrial: new_ntry,
      ncorr: new_ncorr,
      corr_ratio: tmp_corr_ratio,
    };

    console.log("###### この要素を置換する #####3");
    console.log(copy_to_change);
    console.log("############################3");

    let copy_quizes = [...quizArray];

    copy_quizes.splice(qindex, 1, copy_to_change);
    console.log("新しい配列としてセットします。");
    // console.log(copy_quizes);
    setQuizArray(copy_quizes);
    console.log("新しい配列としてセットします");

    // クイズのインデックスをインクリメント
    let nextIndex = qindex + 1;
    console.log(`クイズサイズ ${quizArray.length} 次 ${nextIndex}`);

    // もしもすべてのクイズが終わったら
    if (quizArray.length === nextIndex) {
      console.log("next index is reset to 0.");
      nextIndex = 0;
      setCycle(ncycle + 1);
      setQindex(0);
      // ここでフィルターフラグがあればフィルターしてしまう;
      filterQuizes(filter_ratio);
      updateDB();
    } else {
      // 今回何問問題をやっているか
      setQindex(qindex + 1);
    }
    setNtrialTotal(ntrial_total + 1);
    console.log(`サイクル数 ${ncycle}`);
    console.log(`今までにやった問題数 ${ntrial_total}`);
    console.log(quizArray);

    setIsAnswered(false);
    setIsCorrect(false);
    setUserAnswer("");
  };

  return (
    <div>
      <h1>
        この問題の過去の正答率:
        {currQ.ntrial != 0
          ? ((currQ.ncorr / currQ.ntrial) * 100.0).toFixed(2)
          : " no results"}
        :
      </h1>
      <Flex bg="darkgreen.100">
        <Box h={50}>
          <Stack spacing={5}>
            {/* <Text fontSize="3xl"> This is it </Text> */}
            <Box h={100}>
              <Text fontSize="3xl"> {currQ.question} </Text>
            </Box>
            <Input
              value={userAnswer}
              fontSize="3xl"
              placeholder="ここに答えを書く"
              onChange={onChangeInput}
            />
            <AnswerBox
              answer={currQ.answer}
              isAnswered={isAnswered}
              isCorrect={isCorrect}
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
                <MyButton
                  isDisabled={true}
                  onClick={onClickEnd}
                  colorScheme="red"
                >
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
