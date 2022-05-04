import React, { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
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
import { ResultInfo } from "../types/api/cycleresultinfo";
import { filter } from "lodash";

type Props = {
  isFilter: boolean;
  filter_ratio: number;
  subject: string;
  quizMatchID: string;
};

export const QuestionBox = (props: Props) => {
  const {
    quizArray,
    setQuizArray,
    updateDB,
    selectRandomQuizes,
    selQuizArray,
  } = useQuiz();
  const { resultArray, setResultArray, checkCurrentResult, updateResult } = useCycleResult();
  const { isFilter, filter_ratio, subject, quizMatchID } = props;
  const { selectedUser } = useUser();
  const { showMessage } = useMessage();

  // console.log("Top of QuestionBox: SUBJECT=" + subject);
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

  // 結果を表示するかどうかのリスト
  let passed_quizes: string[] = [];

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

    // クイズマッチIDと教科を渡せばなんとかなりそう
    navigate(`/results?quizmatchID=${quizMatchID}&subject=${subject}`);
  };

  const filterQuizes = () => {
    console.log(`Filtered!! ${filter_ratio}`);
    const filtered_quiz = quizArray.filter(function (quiz) {
      // これまでに合格したリストに乗っていないものを選択する
      return !passed_quizes.includes(quiz._id);
    });
    // もしも合格したリストに
    if (filtered_quiz.length != 0) {
      console.log("<<<< before >>>>>");
      console.log(quizArray);
      console.log("<<<< after >>>>>");
      setQuizArray(filtered_quiz);
    } else {
      setQuizArray([]);
    }
    console.log(quizArray);
  };

  const checkResult = (currentQ: QuizInfo) => {
    console.log("このクイズについて結果を評価します");

    // 回答数を保存されている配列から調査し、今回の結果を追加してアップデートする
    // 現在のクイズIDと整合する過去の結果を抜き出す
    let filter_result = resultArray.filter(
      (elem) => elem.q_id === currentQ._id
    );
    let ncorr = 0;
    let ntrial = 0;

    // これまでの回答数＋１がこの問題を含めた回答数＝サイクル数
    ntrial = filter_result.length + 1;
    // 正答数を数える
    // これまでの分＋今回の分
    let corr_result = filter_result.filter((elem) => elem.isCorrect === true);

    if (isCorrect) {
      ncorr = corr_result.length + 1;
    } else {
      ncorr = corr_result.length;
    }
    // 正答率の計算 (%)
    let corr_ratio = (ncorr / ntrial) * 100.0;
    return { ntrial: ntrial, ncorr: ncorr, corr_ratio: corr_ratio };
  };

  type PPProps = {
    currResultArray: ResultInfo[];
  };

  // 次のクイズボタンを押したらインデックスが変わる
  const useClickNextQuestion = () => {
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

    // このクイズの結果を結果DBへ登録するために結果配列へ格納
    let { ntrial, ncorr, corr_ratio } = checkResult(currQ);
    console.log(ntrial, ncorr, corr_ratio);

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
      corr_ratio: corr_ratio,
    };

    let new_result_array = [...resultArray, aresult];
    setResultArray(new_result_array);

    console.log("> Current result array #1");
    console.log(new_result_array);
    console.log("< Current result array #1");

    // クイズのインデックスをインクリメント
    let nextIndex = qindex + 1;

    console.log(`クイズサイズ ${quizArray.length} 次 ${nextIndex}`);

    // もしもこのサイクルが終わったら
    if (quizArray.length === nextIndex) {
      // これまでの回答リストを評価して「正答率によって」残すクイズを選択する
      // 具体的には正答率がしきい値未満のものだけを残している
      // この配列は出題のときのセレクションとして利用したい
      // なんでこんなことしているかっていうと useState で Contextで管理している
      // クイズリストを「切ったりはったりする」ことがままならないから
      // ままならない＝操作をしても更新のタイミングでしか配列の変更が適用されないので
      // 思ったような挙動にならないことが原因
      // 根本的な解決ができたらこれもなくしたら良いと思う
      passed_quizes = checkCurrentResult({
        currResultArray: new_result_array,
        filterRatio: filter_ratio
      });

      console.log(passed_quizes.length);
      console.log(quizArray.length);

      if (passed_quizes.length == quizArray.length) {
        const title = "すべての問題を完了しました!!!";
        const status = "success";
        showMessage({ title, status });
        // 結果をアップデートしてみる
        updateResult({ subject });
        // クイズマッチIDと教科を渡せばなんとかなりそう
        navigate(`/results?quizmatchID=${quizMatchID}&subject=${subject}`);
      }
      console.log("One cycle was finished.");
      console.log("The quiz index is reset to 0.");
      nextIndex = 0;

      // サイクル数をインクリメント
      setCycle(ncycle + 1);
      // Quizインデックスを０にする
      setQindex(0);
      // ここでフィルターフラグがあればフィルターしてしまう;
      filterQuizes();
      updateDB({ subject: subject });
    } else {
      // 今回何問問題をやっているか
      setQindex(qindex + 1);
    }
    setNtrialTotal(ntrial_total + 1);
    console.log(`サイクル数 ${ncycle}`);
    console.log(`今までにやった問題数 ${ntrial_total}`);
    console.log(quizArray);

    // クイズ配列を編集してみる

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
                <MyButton onClick={useClickNextQuestion} colorScheme="blue">
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
