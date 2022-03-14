import React from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { QuizLayout } from "../pages/QuizLayout";

type Props = {
  subject: string;
  category: string;
  isCat: boolean;
};

export const QuizSelection = (props: Props) => {
  const { subject, category, isCat } = props;

  console.log(subject, category);

  return (
    <>
      <QuizLayout
        subject={subject}
        category={category}
        start_page={1}
        end_page={10000}
        isCat={isCat}
      />
    </>
  );
};
