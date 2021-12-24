import React, { useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";

import { ScoreTable } from "../atoms/ScoreTable";
import { useRecoilValue } from "recoil";
import { readState } from "../hooks/quizState";
import { QuestionBox } from "../molecules/QuestionBox";
// import { useResult } from "../hooks/useResult";

export const QuizLayout = () => {
  // const read_flag = useRecoilValue(readState);
  // console.log(read_flag);
  // JSONで一気にやってみたかったけど分けてステート管理するのを実装してみる
  const readInfo = useRecoilValue(readState);

  // パラメタの初期化
  // const { all_result, setResult } = useResult();

  // useEffect(() => {
  //   setResult({ n_question: 0, n_corr: 0, corr_ratio: 0.0 });
  // });

  // console.log(all_result);

  return (
    <>
      <ScoreTable />
      {readInfo.isRead ? <QuestionBox /> : null}
    </>
  );
};
