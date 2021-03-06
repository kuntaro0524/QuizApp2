import { filter } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { DiagnosticCategory } from "typescript";
import { AllQuizContext } from "../providers/QuizProvider";
import { QuizInfo } from "../types/api/quizinfo";
import { useMessage } from "./useMessage";

// useContextを利用していることをカプセル化するためのクラス（らしい）

type Props2 = {
  subject: string;
  id: string;
  newQuiz: QuizInfo;
};

export const useQuiz = () => {
  const navigate = useNavigate();
  const { quizArray, setQuizArray } = useContext(AllQuizContext);
  // (NtrialContextType) => useContext(AllQuizContext);
  const [isRead, setIsRead] = useState<boolean>(false);
  const [qNum, setQnum] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const [selQuizArray, setSelectQuizArray] = useState<Array<QuizInfo>>([]);

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

  type PropsCorrRatio = {
    corr_ratio_thresh: number;
  };

  const filterCorrRatio = (props: PropsCorrRatio) => {
    const { corr_ratio_thresh } = props;
    const filtered_quiz = quizArray.filter(function (quiz) {
      console.log(quiz.corr_ratio);
      return quiz.ntrial < 2 || quiz.corr_ratio < corr_ratio_thresh;
    });
    console.log("<<<< before corr_ratio threshold filter >>>>>");
    console.log(quizArray);
    console.log("<<<< after  corr_ratio threshold filter >>>>>");
    console.log(quizArray);
  };

  type PropsRand = {
    nQuizes: number;
    qArray: QuizInfo[];
  };

  const selectRandomQuizes = (props: PropsRand) => {
    function intRandom(n_keys: number) {
      return Math.floor(Math.random() * n_keys);
    }
    // corr_ratio_thresh: ％です
    const { nQuizes, qArray } = props;
    let qlength = qArray.length;
    console.log("This is selectRandomQuizes: all quizes=" + qlength);

    let nprep = 0;
    if (nQuizes > qlength) {
      nprep = qlength;
    } else {
      nprep = nQuizes;
    }
    // 次にランダムに要素を抽出する
    // 既出ランダム配列のindexを格納する配列
    let selected_rand: number[] = [];
    // 新しいクイズ配列の格納
    let selected_quizes: QuizInfo[] = [];

    console.log("Making a list of the new quiz:" + nprep);

    for (let i = 0; i < nprep; i++) {
      while (true) {
        var tmpindex = intRandom(qlength);
        console.log("Random index=" + tmpindex);

        if (!selected_rand.includes(tmpindex)) {
          selected_rand.push(tmpindex);
          selected_quizes.push(qArray[tmpindex]);
          console.log(qArray[tmpindex]);
          break;
        }
      }
    }
    console.log("selcted lengths:" + selected_quizes.length);
    console.log(selected_quizes);
    return selected_quizes;
  };

  type Props = {
    subject: string;
    start_page: number;
    end_page: number;
    category: string;
    nQuestion: number;
  };

  const useDBs = (props: Props) => {
    const { start_page, end_page, subject, category, nQuestion } = props;
    const { showMessage } = useMessage();

    console.log("++++useDBs was called.+++++");
    console.log("start_page:" + start_page);
    console.log("end_page:" + end_page);
    console.log("subject:" + subject);
    console.log("category:" + category);
    console.log("nQuestion:" + nQuestion);
    console.log("++++useDBs was called.+++++");

    useEffect(() => {
      axios
        .get<Array<QuizInfo>>(
          `http://${server_url}:${server_port}/${subject}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          // カテゴリによる選定の場合
          let filtered_quiz = null;
          filtered_quiz = res.data.filter(
            (quiz) =>
              quiz.page >= start_page &&
              quiz.page <= end_page &&
              quiz.category === category
          );
          console.log("<<<< useDBs after >>>>>" + filtered_quiz.length);
          if (filtered_quiz.length === 0) {
            showMessage({
              title: "フィルター後のクイズがないよ",
              status: "error",
            });
          } else {
            if (filtered_quiz.length === 0) {
              showMessage({
                title: "フィルター後のクイズがないよ",
                status: "error",
              });
              navigate("/selection");
            } else {
              // カテゴリによる選定ではない場合
              console.log("カテゴリではない選択をするね");
              const new_array = selectRandomQuizes({ nQuizes: nQuestion, qArray: filtered_quiz });
              filtered_quiz = [...new_array];
              console.log("New selected quiz length=" + new_array.length);
            }
          }

          // さらにランダムに指定数だけクイズをせんたくする
          setQuizArray(filtered_quiz);
          setQnum(filtered_quiz.length);
          setIsRead(true);
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

  return {
    quizArray,
    setQuizArray,
    useDBs,
    isRead,
    qNum,
    patchQuiz,
    updateDB,
    selectRandomQuizes,
    selQuizArray
  };
};
