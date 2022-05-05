import React from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { QuizLayout } from "../pages/QuizLayout";
import { useLocation, useSearchParams } from "react-router-dom";

// 引数ではなくてURLパラメータを読むことにした
// 期待しているURLは以下のような感じ
// 最初にうまくいったURLリンクはこんなの
// 重要なことは""をつけたらややこしいことになるって話かな
// quiz?username="kuntaro"&subject=english&start_page=1&end_page=10000&category=papa&isCat="true"

export const QuizSelection = () => {
  // こういうhooksがある
  const [searchParams] = useSearchParams();
  let isCat = false;

  const location = useLocation();
  const ppp = location.state as {
    username: string,
    subject: string,
    start_page: number,
    end_page: number,
    category: string,
    isCat: boolean,
    nQuestion: number
  }

  console.log(ppp.username);


  const zeropad = (rec_str: Number) => {
    var tmp_str = rec_str.toString().padStart(2, "0")
    return tmp_str
  }

  // クイズマッチIDをここで作成してしまう
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var hours = today.getHours();
  var mins = today.getMinutes();
  // おそらく分のオーダーまで見ていたらクイズマッチは個別のものになるだろう
  let quizMatchID = `${ppp.username}_${ppp.category}_${year}${zeropad(month)}${zeropad(day)}${zeropad(hours)}${zeropad(mins)}`
  console.log("Quiz match ID=" + quizMatchID);

  if (ppp.isCat) {
    isCat = true;
  }

  console.log(ppp.subject, ppp.start_page, ppp.end_page, ppp.isCat, ppp.nQuestion);

  return (
    <>
      <QuizLayout
        subject={ppp.subject}
        category={ppp.category}
        start_page={ppp.start_page}
        end_page={ppp.end_page}
        isCat={isCat}
        nQuestion={ppp.nQuestion}
        quizMatchID={quizMatchID}
      />
    </>
  );
};
