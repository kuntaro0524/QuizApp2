import React from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { QuizLayout } from "../pages/QuizLayout";
import { useSearchParams } from "react-router-dom";

// 引数ではなくてURLパラメータを読むことにした
// 期待しているURLは以下のような感じ
// `/quiz?username=kuntaro&subject=${subject}`;

export const QuizSelection = () => {
  // こういうhooksがある
  const [searchParams] = useSearchParams();
  let isCat = false;

  let username = searchParams.get("username")!;
  let subject = searchParams.get("subject")!;
  let start_page = parseInt(searchParams.get("start_page")!);
  let end_page = parseInt(searchParams.get("end_page")!);
  let category = searchParams.get("category")!;
  let tmpIsCat = searchParams.get("isCat")!;
  if (tmpIsCat.includes("true")) {
    isCat = true;
  }

  console.log(subject, start_page, end_page, isCat);

  return (
    <>
      <QuizLayout
        subject={subject}
        category={category}
        start_page={start_page}
        end_page={end_page}
        isCat={isCat}
      />
    </>
  );
};
