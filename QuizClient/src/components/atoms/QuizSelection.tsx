import React from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { QuizLayout } from "../pages/QuizLayout";
import { useSearchParams } from "react-router-dom";

// 引数ではなくてURLパラメータを読むことにした
// 期待しているURLは以下のような感じ
// 最初にうまくいったURLリンクはこんなの
// 重要なことは""をつけたらややこしいことになるって話かな
// quiz?username="kuntaro"&subject=english&start_page=1&end_page=10000&category=papa&isCat="true"

export const QuizSelection = () => {
  // こういうhooksがある
  const [searchParams] = useSearchParams();
  let isCat = false;

  let username = searchParams.get("username")!;
  let subject = searchParams.get("subject")!;
  let start_page = parseInt(searchParams.get("start_page")!);
  let end_page = parseInt(searchParams.get("end_page")!);
  let category = searchParams.get("category")!;
  let nQuestion = parseInt(searchParams.get("nQuestion")!);
  let tmpIsCat = searchParams.get("isCat")!;
  if (tmpIsCat.includes("true")) {
    isCat = true;
  }

  console.log(subject, start_page, end_page, isCat, nQuestion);

  return (
    <>
      <QuizLayout
        subject={subject}
        category={category}
        start_page={start_page}
        end_page={end_page}
        isCat={isCat}
        nQuestion={nQuestion}
      />
    </>
  );
};
