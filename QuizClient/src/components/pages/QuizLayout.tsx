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

export const QuizLayout = () => {
  // axiosを利用してクイズをすべて読み込んでいる
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const { quizArray, setQuizArray, useDBs, isRead, qNum } = useQuiz();
  const [thresh, setThresh] = useState(75.0);

  // const onChangeThresh = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setThresh(parseFloat(e.target.value));
  // };

  // サイクルが一周したときに正答率でフィルタをかけるかどうかのフラグ
  // デフォルトはtrue
  const [isFilter, setFilter] = useState(true);
  const [pageStart, setPageStart] = useState(1);
  const [pageEnd, setPageEnd] = useState(1000);

  let values = { start_page: pageStart, end_page: pageEnd };

  useDBs(values);

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
      {/* <Flex>
        <RangeSlider
          aria-label={["min", "max"]}
          min={0}
          max={1000}
          step={1}
          // value={[200, 800]}
          onChangeEnd={defineRange}
          // onChangeStart={(val) => setPageStart(val[0])}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <p>
          {pageStart} {pageEnd}
        </p>
      </Flex> */}
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
      <QuestionBox isFilter={isFilter} filter_ratio={thresh} />
    </>
  );
};
