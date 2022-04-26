import { Box, Center, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { forEachLeadingCommentRange } from "typescript";
import { useCycleResult } from "../hooks/useCycleResult";
import { useResult } from "../hooks/useResult";

export const Results = () => {
  const [searchParams] = useSearchParams();
  const quizMatchID = searchParams.get("quizmatchID");
  let subject: string | null = searchParams.get("subject");

  console.log("QuizMatchID=" + quizMatchID);
  const { updateResult, resultArray, getResult, dbResultArray, getLatestResult } = useCycleResult();

  if (subject === null) { subject = ""; }

  const props = { subject: subject };

  useEffect(() => {
    updateResult({ subject: subject! });
    getResult({ subject: "english" });
  }, []);

  console.log(dbResultArray);

  //   ユーザ名と科目名で結果配列から適合するものを抽出
  const theResult = dbResultArray.filter(function (item, index) {
    console.log("Item=" + item);

    if (item.quizMatchID === quizMatchID) return true;
  });

  console.log("Brought quizMatchID" + quizMatchID);

  console.log("Selected quizmatchID");
  console.log(theResult);

  //   日付が本日のものを抽出するのだが日付の取扱がよくわからん
  //   とりあえず結果を全部ひょうじしてみる
  theResult.filter(function (item, index) {
    const time_on_db = item.datetime * 1000.0;
    // 今日の日付のやつを選択する
    const todayNow = new Date().getTime();
    // Unix timeから普通の読めるやつへの時間変換
    const convTime = new Date(time_on_db * 1000);

    // 現在からの乖離時間を計算（単位は hours)
    const diff_hours = (todayNow - time_on_db) / 1000.0 / 3600.0;
    console.log(diff_hours);

    if (diff_hours < 24.0) return true;
  });

  console.log(theResult);

  const correctResults = theResult.filter(function (item, index) {
    return item.isCorrect;
  });

  console.log("New function########################3");
  getLatestResult({ currResultArray: resultArray, filterRatio: 0.75 });
  console.log("New function########################3");

  // こなした順に結果を並べたい → カスタムフックに入れるべきなのでは


  //   クイズに回答した回数
  const ntrials = theResult.length;
  const ncorrs = correctResults.length;

  return (
    <>
      <h1> Your quiz results of {subject}</h1>
      <Box>
        <Center background={"teal.100"}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>トライした問題の数</Th>
                <Th>正答数</Th>
                <Th>Start time</Th>
                <Th>End time </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{ntrials}</Td>
                <Td>{ncorrs}</Td>
                <Td>2020/04/19 20:20</Td>
                <Td>2020/04/19 20:35</Td>
              </Tr>
            </Tbody>
          </Table>
        </Center>
      </Box>
    </>
  );
};
