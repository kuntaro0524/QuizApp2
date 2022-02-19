import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  answer: string;
  isAnswered: boolean;
  isCorrect: boolean;
};

export const AnswerBox = (props: Props) => {
  console.log("AnswerBox is called.");
  
  const { answer, isAnswered, isCorrect } = props;

  let d_color = "";

  if (isCorrect) {
    d_color = "blue";
  } else {
    d_color = "red";
  }

  return (
    <>
      {isAnswered ? (
        <Box fontSize="2xl" bg="yellow.50" color={d_color} w={800}>
          {answer}
        </Box>
      ) : (
        <Box fontSize="2xl" bg="yellow.50" color="gray.100" w={800}>
          Waiting for your answer.
        </Box>
      )}
    </>
  );
};
