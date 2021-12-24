import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  answer: string;
  isAnswered: false;
};

export const AnswerBox = (props: Props) => {
  const { answer, isAnswered } = props;
  return (
    <>
      {isAnswered ? (
        <Box fontSize="2xl" bg="yellow.50" color="black" w={800}>
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
