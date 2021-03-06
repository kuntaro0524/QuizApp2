import React, { ChangeEvent, useEffect, useState } from "react";
import { ScoreTable } from "../atoms/ScoreTable";
import { QuestionBox } from "../molecules/QuestionBox";
import axios from "axios";
import { QuizInfo } from "../types/api/quizinfo";
import { useQuiz } from "../hooks/useQuiz";
import {
  Checkbox,
  filter,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";

type Props = {
  subject: string;
  start_page: number;
  end_page: number;
  category: string;
  isCat: boolean;
  nQuestion: number;
  quizMatchID: string;
};

export const QuizLayout = (props: Props) => {
  // 引数からパラメータを受け取って格納
  const { subject, start_page, end_page, category, isCat, nQuestion, quizMatchID } = props;
  // axiosを利用してクイズをすべて読み込んでいる
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const { quizArray, setQuizArray, useDBs, isRead, qNum, selQuizArray } = useQuiz();
  const [thresh, setThresh] = useState(75.0);

  // サイクルが一周したときに正答率でフィルタをかけるかどうかのフラグ
  // デフォルトはtrue
  const [isFilter, setFilter] = useState(true);
  const [pageStart, setPageStart] = useState(start_page);
  const [pageEnd, setPageEnd] = useState(end_page);

  let values = {
    start_page: pageStart,
    end_page: pageEnd,
    subject: subject,
    category: category,
    isCat: isCat,
    nQuestion: nQuestion,
  };

  console.log(values);

  console.log("useDBs will be called.");
  useDBs(values);
  console.log("useDBs was called.");

  if (isRead) {
    if (qNum === 0) {
      console.log("Nothingsssssss");
    }
  }

  const [value, setValue] = useState(75);

  const defineRange = (props: number[]) => {
    const [start, end] = props;
    setPageStart(start);
    setPageEnd(end);
    let values = { start_page: start, end_page: end };
  };

  return (
    <>
      {isRead && qNum === 0 ? <h1> Nothing!!! </h1> : null}
      <Flex>
        <Checkbox isChecked={isFilter} onChange={(e) => setFilter(!isFilter)}>
          {isFilter ? <h1>正答率フィルタON </h1> : <h1>正答率フィルタOFF</h1>}
        </Checkbox>
      </Flex>
      <Flex>
        <Slider
          isDisabled={!isFilter}
          defaultValue={75}
          min={0}
          max={100}
          step={25}
          onChange={setThresh}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text textAlign="center">{thresh}%</Text>
      </Flex>
      <ScoreTable />
      <QuestionBox
        isFilter={isFilter}
        filter_ratio={thresh}
        subject={subject}
        quizMatchID={quizMatchID}
      />
    </>
  );
};
