import { filter } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState, VFC } from "react";
import { DiagnosticCategory } from "typescript";
import { AllQuizContext } from "../providers/QuizProvider";
import { QuizInfo } from "../types/api/quizinfo";
import { useMessage } from "./useMessage";

// useContextを利用していることをカプセル化するためのクラス（らしい）

// import { NtrialContext, NtrialContextType } from "../providers/QuizProvider";

type Props = {
  subject: string;
  start_page: number;
  end_page: number;
  category: string;
};

type Props2 = {
  subject: string;
  id: string;
  newQuiz: QuizInfo;
};

export const useQuiz = () => {
  const { quizArray, setQuizArray } = useContext(AllQuizContext);
  // (NtrialContextType) => useContext(AllQuizContext);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [qNum, setQnum] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_port = process.env.REACT_APP_SERVER_PORT;

  const patchQuiz = (props2: Props2) => {
    console.log("patchQuiz was called.");

    setIsCorrect(true);
    let { subject, id, newQuiz } = props2;
    let quiz_url = `http://${server_url}:${server_port}/${subject}/${id}`;
    axios
      .patch<Array<QuizInfo>>(quiz_url, newQuiz, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Success to update :" + id);

        setIsCorrect(false);
      })
      .catch(function (error) {
        console.log("ERROR?");
        console.log(error.config);
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
  };

  type Props3 = {
    subject: string;
  };

  const updateDB = (props3: Props3) => {
    console.log("updateDB was called.");

    let { subject } = props3;
    quizArray.map((eachquiz) => {
      const id = eachquiz._id;
      patchQuiz({ subject, id, newQuiz: eachquiz });
    });
  };

  const useDBs = (props: Props) => {
    const { start_page, end_page, subject, category } = props;
    const { showMessage } = useMessage();


    useEffect(() => {
      axios
        .get<Array<QuizInfo>>(`http://${server_url}:${server_port}/${subject}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log("<<<< BEFORE >>>>>");
          console.log(res.data);

          const filtered_quiz = res.data.filter(
            (quiz) =>
              quiz.page >= start_page &&
              quiz.page <= end_page &&
              quiz.category === category
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

  return { quizArray, setQuizArray, useDBs, isRead, qNum, patchQuiz, updateDB };
};
