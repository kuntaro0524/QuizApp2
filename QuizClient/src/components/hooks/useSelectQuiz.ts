import { useCallback, useState } from "react";
import { QuizInfo } from "../types/api/quizinfo";

type Props = {
  id: string;
  // ユーザ情報の配列なので
  quizArray: Array<QuizInfo>;
  onOpen: () => void;
};

// モーダルに現在選択されているクイズ情報を渡してあげるためのカスタムフック

export const useSelectQuiz = () => {
  // 選択されたくいずの情報を格納
  const [selectedQuiz, setSelectedQuiz] = useState<QuizInfo>({
    _id: "UNKO",
    question: "test",
    answer: "test",
    page: 133,
    made_date: "2022/02/22",
    ncorr: 0,
    ntrial: 3,
    corr_ratio: 33.3,
    category: "test",
    grade: 1
  });
  // 選択されたクイズの情報を取得する関数
  // 引数→ユーザのID番号、ユーザの一覧
  const onSelectQuiz = useCallback((props: Props) => {
    const { id, quizArray, onOpen } = props;
    // 受け取った配列の中に指定したIDと一致するユーザを targetUser として設定
    const targetQuiz: QuizInfo = quizArray.find((quiz) => quiz._id === id)!;
    // カスタムフック内部の変数に格納する
    setSelectedQuiz(targetQuiz);
    onOpen();
  }, []);

  return { selectedQuiz, onSelectQuiz };
};
