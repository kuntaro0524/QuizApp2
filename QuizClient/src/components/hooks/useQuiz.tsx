import { filter } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState, VFC } from "react";
import { AllQuizContext } from "../providers/QuizProvider";
import { QuizInfo } from "../types/api/quizinfo";
import { useMessage } from "./useMessage";

// useContextを利用していることをカプセル化するためのクラス（らしい）

// import { NtrialContext, NtrialContextType } from "../providers/QuizProvider";

type Props = {
  start_page: number;
  end_page: number;
};

export const useQuiz = () => {
  const { quizArray, setQuizArray } = useContext(AllQuizContext);
  // (NtrialContextType) => useContext(AllQuizContext);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [qNum, setQnum] = useState<number>(0);

  const useDBs = (props: Props) => {
    const { start_page, end_page } = props;
    const { showMessage } = useMessage();

    useEffect(() => {
      axios
        // .get<Array<QuizInfo>>("http://localhost:9201/quiz", {
        // .get<Array<QuizInfo>>("http://192.168.99.123:9201/quiz", {
        .get<Array<QuizInfo>>("http://10.10.122.179:9201/english", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log("<<<< BEFORE >>>>>");
          console.log(res.data);

          const filtered_quiz = res.data.filter(
            (quiz) => quiz.page >= start_page && quiz.page <= end_page
          );
          console.log("<<<< AFTER >>>>>" + filtered_quiz.length);
          if (filtered_quiz.length === 0) {
            showMessage({
              title: "フィルター後のクイズがないよ",
              status: "error",
            });
          }
          setQuizArray(filtered_quiz);
          setQnum(filtered_quiz.length);
          setIsRead(true);
          console.log(quizArray);
        })
        .catch(function (error) {
          console.log("ERROR?");
          console.log(error.config);
          console.log(error);
          for (let key of Object.keys(error)) {
            console.log(key);
            console.log(error[key]);
          }
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }, []);
  };

  return { quizArray, setQuizArray, useDBs, isRead, qNum };
};
