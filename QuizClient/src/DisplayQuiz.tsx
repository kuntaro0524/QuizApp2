import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useDisclosure } from "@chakra-ui/hooks";
import { Table, TableCaption, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { VFC, useCallback, useState } from "react";

import { QuizInfo } from "./components/types/api/quizinfo";

type Props = {
  quizes: QuizInfo[] | null;
};

export const DisplayQuiz: VFC<Props> = (props) => {
  const { quizes } = props;

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <TableCaption> ZOO data collection sheet </TableCaption>
        <Tbody>
          <Th>Question</Th>
          <Th>Answer</Th>
          <Th>N trials</Th>
          <Th>N correct</Th>
          <Th>Correction ratio</Th>
          {quizes != null &&
            quizes.map((quiz) => (
              <Tr key={quiz._id}>
                <Checkbox size="md" colorScheme="green" defaultIsChecked />
                <Td>{quiz.question}</Td>
                <Td>{quiz.answer}</Td>
                <Td>{quiz.ntrial}</Td>
                <Td>{quiz.ncorr}</Td>
                <Td>{quiz.corr_ratio}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
};
