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
} from "@chakra-ui/react";

export const QuizLayout = () => {
  // axiosを利用してクイズをすべて読み込んでいる
  // recoilを利用して quizState.js で設定したグローバル変数と関数へアクセス
  const { quizArray, setQuizArray, useDBs } = useQuiz();
  const [thresh, setThresh] = useState(75.0);

  // const onChangeThresh = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setThresh(parseFloat(e.target.value));
  // };

  let props = { start_page: 42, end_page: 43 };
  
  useDBs(props);

  // console.log(filtered_quiz);

  // サイクルが一周したときに正答率でフィルタをかけるかどうかのフラグ
  // デフォルトはtrue
  const [isFilter, setFilter] = useState(true);

  return (
    <>
      <Flex>
      <Checkbox isChecked={isFilter} onChange={(e) => setFilter(!isFilter)}>
        {isFilter ? (
          <h1> １サイクル終わったら正答率によってフィルタをかける </h1>
        ) : (
          <h1>１サイクル終わったら正答率によってフィルタをかけない</h1>
        )}
      </Checkbox>
      </Flex>
      <FormControl isDisabled={!isFilter}>
        <Flex>
        <FormLabel htmlFor='amount'>正答率しきい値</FormLabel>
          <NumberInput value={thresh} width={100} max={100} min={1} onChange={(valuestring)=>setThresh(parseFloat(valuestring))}>
            <NumberInputField id='amount' />
          <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
          </NumberInputStepper>
          </NumberInput>
        <FormLabel htmlFor='percent'>%</FormLabel>
        </Flex>
        <h1> {thresh} </h1>
        {/* <Flex>
          <RangeSlider aria-label={['min', 'max']} defaultValue={[1, 500]}>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
        </Flex> */}
      </FormControl>
      <ScoreTable />
      <QuestionBox isFilter={isFilter} filter_ratio={30} />
    </>
  );
};
