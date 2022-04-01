import React, { ChangeEvent, useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MyButton } from "../atoms/MyButton";
import { AnswerBox } from "../atoms/AnswerBox";
import { useCycleNum } from "../hooks/useCycleNum";
import { useNtry } from "../hooks/useNtrial";
import { useNcorr } from "../hooks/useNcorr";
import { useQuiz } from "../hooks/useQuiz";
import axios from "axios";
import { QuizInfo } from "../types/api/quizinfo";
import { useTable } from "../hooks/useTable";
import { CorrectModal } from "../organisms/CorrectModal";
import { useSelectQuiz } from "../hooks/useSelectQuiz";
import { useMessage } from "../hooks/useMessage";
import { useMyImage } from "../hooks/useImage";
import { useCycleResult } from "../hooks/useCycleResult";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

type Props = {
  isFilter: boolean;
  filter_ratio: number;
  subject: string;
  quizMatchID: string;
};

export const QuestionBox = (props: Props) => {
  const { quizArray, setQuizArray, updateDB, selectRandomQuizes, selQuizArray } = useQuiz();
  const { resultArray, setResultArray, useResult } = useCycleResult();
  const { isFilter, filter_ratio, subject, quizMatchID } = props;
  const { selectedUser } = useUser();
  const { showMessage } = useMessage();

  console.log("Top of QuestionBox: SUBJECT=" + subject);
  const navigate = useNavigate();

  const {
    ncycle,
    ntrial_total,
    ncorr_total,
    setCycle,
    setNtrialTotal,
    setNcorrTotal,
  } = useTable();

  // Modalを利用するための手順
  let { isOpen, onOpen, onClose } = useDisclosure();
  // Modalを利用するために作ったカスタムフック
  const { selectedQuiz, onSelectQuiz } = useSelectQuiz();

  // イメージを表示するためのフックス
  const { displayJudgeImage } = useMyImage();

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

  const useClickEnd = () => {
    console.log("PUSSSSSSSSSSSSSSSSS");
    console.log(selectedUser.name);

    useResult({
      username: selectedUser.name,
      subject: subject,
      category: "test",
    });

    navigate(`/results?username=${selectedUser.name}&subject=${subject}`);
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

  const checkResult = (currentQ: QuizInfo) => {
    console.log("このクイズについて結果を評価します");
    console.log(isAnswered, isCorrect);

    let filter_result = resultArray.filter((elem) => elem.q_id === currentQ._id);

    // 回答数を配列から調査
    if (filter_result.length == 0) {
      console.log('まだ回答されていないので1にします。');
      return { ntrial: 1, ncorr: 0 }
    } else {
      console.log(`これまでに${filter_result.length}回、回答されています`);
      // 正解したやつを選択する
      let corr_result = filter_result.filter((elem) => elem.isCorrect === true);
      if (corr_result.length === 0) {
        console.log("正解したクイズがないですね");
      } else {
        console.log(`これまでに${corr_result.length}回正答しています！`)
      }
      let ntrial = filter_result.length;
      let ncorr = corr_result.length;
      return { ntrial: ntrial, ncorr: ncorr }
    }
  }

  // 次のクイズボタンを押したらインデックスが変わる
  const onClickNextQuestion = () => {
    console.log("Button was pushed");
    console.log("Correct Flag=" + isCorrect);

    if (!isAnswered) {
      const title = "まだ答えていないのではないですか？";
      const status = "error";
      showMessage({ title, status });
      return;
    }

    // 各設問に対する成績を埋めていく
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

    // 現時点のクイズのID
    const quizid = currQ._id;
    // データベースで見て計算しやすいようにunix timeで格納する
    const dtime = new Date().getTime() / 1000.0;

    console.log("> Current result array");
    console.log(resultArray);
    console.log("< Current result array");

    // このクイズの結果を結果DBへ登録するために結果配列へ格納
    let { ntrial, ncorr } = checkResult(currQ);

    const aresult = {
      user: selectedUser.name,
      quizMatchID: quizMatchID,
      cycle: ncycle,
      subject: subject,
      q_id: quizid,
      isCorrect: isCorrect,
      datetime: dtime,
      ntrial: ntrial,
      ncorr: ncorr,
      corr_ratio: tmp_corr_ratio,
    };

    setResultArray([...resultArray, aresult]);

    // クイズのインデックスをインクリメント
    let nextIndex = qindex + 1;
    console.log(`クイズサイズ ${quizArray.length} 次 ${nextIndex}`);

    // もしもこのサイクルが終わったら
    if (quizArray.length === nextIndex) {
      console.log("One cycle was finished.");
      console.log("The quiz index is reset to 0.");
      nextIndex = 0;
      // サイクル数をインクリメント
      setCycle(ncycle + 1);
      // Quizインデックスを０にする
      setQindex(0);
      // ここでフィルターフラグがあればフィルターしてしまう;
      filterQuizes(filter_ratio);
      updateDB({ subject: subject });
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

  const onClickCorrect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value;
    onSelectQuiz({ id, quizArray, onOpen });
    console.log(e.currentTarget.value);
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
              width={800}
              onChange={onChangeInput}
            />
            <AnswerBox
              answer={currQ.answer}
              isAnswered={isAnswered}
              isCorrect={isCorrect}
            />
            <Flex h={50}>
              <Box>
                <MyButton onClick={onClickCheckAnswer} colorScheme="teal">
                  Check the answer
                </MyButton>
                <MyButton onClick={onClickNextQuestion} colorScheme="blue">
                  Next question.
                </MyButton>
                <MyButton onClick={useClickEnd} colorScheme="red">
                  Finish this quiz.
                </MyButton>
              </Box>
            </Flex>
            <Flex m={1}>
              <Box w={500} m={5}>
                {displayJudgeImage({ isCorrect, isAnswered })}
              </Box>
              <Box>
                <Button
                  value={currQ._id}
                  onClick={onClickCorrect}
                  colorScheme={"yellow"}
                  m={50}
                  w={150}
                  h={10}
                >
                  Correct this quiz.
                </Button>
              </Box>
            </Flex>
            <CorrectModal
              isOpen={isOpen}
              onClose={onClose}
              isAdmin={false}
              quiz={selectedQuiz}
            />
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};
