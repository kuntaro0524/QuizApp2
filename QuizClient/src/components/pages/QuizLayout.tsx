import React, { useEffect, useState } from "react";
import { ScoreTable } from "../atoms/ScoreTable";
import { QuestionBox } from "../molecules/QuestionBox";
import axios from "axios";
import { QuizInfo } from "../types/api/quizinfo";
import { useQuiz } from "../hooks/useQuiz";
import {
  Checkbox,
  filter,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export const QuizLayout = () => {
  // axiosを利用してクイズをすべて読み込んでいる
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const { quizArray, setQuizArray, useDBs } = useQuiz();

  let props = { start_page: 350, end_page: 352 };
  useDBs(props);

  // console.log(filtered_quiz);

  // サイクルが一周したときに正答率でフィルタをかけるかどうかのフラグ
  // デフォルトはtrue
  const [isFilter, setFilter] = useState(true);

  return (
    <>
      <Flex>
        <NumberInput size="sm" maxW={20} defaultValue={15} min={10}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Checkbox isChecked={isFilter} onChange={(e) => setFilter(!isFilter)}>
        {isFilter ? (
          <h1> １サイクル終わったら正答率によってフィルタをかける </h1>
        ) : (
          <h1>１サイクル終わったら正答率によってフィルタをかけない</h1>
        )}
      </Checkbox>
      {/* <ScoreTable /> */}
      <QuestionBox isFilter={isFilter} filter_ratio={0.75} />
    </>
  );
};
