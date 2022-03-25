import { Box, Center, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { forEachLeadingCommentRange } from "typescript";
import { useCycleResult } from "../hooks/useCycleResult";

export const Results = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const subject = searchParams.get("subject");

  console.log("Username=" + username);
  console.log("Subject =" + subject);
  const { getResult, dbResultArray } = useCycleResult();

  useEffect(() => {
    getResult(props);
  }, []);
  const props = { username: "kuntaro", subject: "english", category: "papa" };
  console.log("UNKOUNKO");

  console.log(dbResultArray);

  //   ユーザ名と科目名で結果配列から適合するものを抽出
  const theResult = dbResultArray.filter(function (item, index) {
    if (item.user == username && item.subject === subject) return true;
  });

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

  const correctResults = theResult.filter(function (item, index) {
    return item.isCorrect;
  });

  //   クイズに回答した回数
  const ntrials = theResult.length;
  const ncorrs = correctResults.length;
  console.log("試行数:" + ntrials);
  console.log("正答数:" + ncorrs);

  return (
    <>
      <h1> Hello {username}</h1>
      <h1> Your quiz results of {subject}</h1>
      <Box>
        <Center background={"teal.100"}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>トライした問題の数</Th>
                <Th>正答数</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{ntrials}</Td>
                <Td>{ncorrs}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Center>
      </Box>
    </>
  );
};
