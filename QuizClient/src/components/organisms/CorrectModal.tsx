import { ChangeEvent, memo, ReactNode, useEffect, useState, VFC } from "react";

import {
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { QuizInfo } from "../types/api/quizinfo";

// Propsを定義するために必要なインポート
// import { User } from "../../types/api/user";
// import { PrimaryButton } from "../../atoms/button/PrimaryButton";
// import { MyButton } from "../atoms/MyButton";

type Props = {
  // クイズ情報を受け取るのだが、これはnullの可能性もある
  quiz: QuizInfo | null;
  isOpen: boolean;
  // 管理者かどうかのフラグも一緒に受け取る
  isAdmin?: boolean;
  onClose: () => void;
};

export const CorrectModal: VFC<Props> = memo((props) => {
  console.log("CorrectModal was called.");

  // propsで渡されない場合には disabled と loading は　デフォルト false
  // userを引数として受け取り、それを利用して情報を表示する
  const { isOpen, onClose, isAdmin = false, quiz } = props;

  if (quiz !== null) {
    console.log(quiz.answer);
  }

  // 情報を更新するための方法
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // これらは可変なのだが、最初は指定したID番号のユーザ情報を反映すべきなの
  // useEffectは最初のレンダリングのときにだけ呼ばれる
  useEffect(() => {
    setQuestion(quiz?.question ?? "");
    setAnswer(quiz?.answer ?? "");
  }, [quiz]);

  const onClickUpdate = () => alert("更新されました！");

  // 更新する関数：Modalの中のインプットテキストのところに onChange で仕込んでいる関数群
  const onChangeQuiz = (e: ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.target.value);
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    setAnswer(e.target.value);

  return (
    <div>
      {/* モーダルを追加していく */}
      {/* 自動フォーカスがあたってしまっている（modal の close button) */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        {/* padding bottomの設定 */}
        <ModalContent pb={6}>
          <ModalHeader> 内容の編集 </ModalHeader>
          <ModalCloseButton />
          {/* マージンを調整 */}
          <ModalBody mx={4}>
            {/* 項目を並べるためにStackは入れておこう（配列調整がしやすい） これは */}
            <Stack>
              <FormControl>
                <FormLabel> Question </FormLabel>
                {/* nullの可能性があるよ、と指定してあるのでオプショナルチェイニングが発動している */}
                <Input
                  // useState()で管理している値になった
                  value={question}
                  // 管理者でなければこれはTrueになる
                  isReadOnly={false}
                  // 　useState()で管理している情報を反映
                  onChange={onChangeQuiz}
                />
              </FormControl>
              <FormControl>
                <FormLabel> Answer </FormLabel>
                <Input
                  value={answer}
                  isReadOnly={false}
                  onChange={onChangeAnswer}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          {isAdmin && (
            <ModalFooter>
              <Button onClick={onClickUpdate}> UNKO </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
});
