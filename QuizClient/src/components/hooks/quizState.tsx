import { atom } from "recoil";

import { QuizInfo } from "../types/api/quizinfo";

export const quizState = atom<Array<QuizInfo>>({
  key: "quizState",
  default: [],
});

export const readState = atom({
  key: "readState",
  default: { isRead: false },
});

export const answerState = atom({
  key: "answerState",
  default: {
    isAnswered: false,
    currentIndex: 0,
    inputAnswer: "",
    isCorrect: false,
  },
});
