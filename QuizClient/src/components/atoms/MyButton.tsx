import React from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  colorScheme: string;
  isDisabled?: boolean;
};

export const MyButton: VFC<Props> = (props) => {
  const { children, onClick, colorScheme, isDisabled } = props;
  return (
    <Button
      isDisabled={isDisabled}
      mt={2}
      mb={1}
      mr={2}
      ml={2}
      w={150}
      h={10}
      colorScheme={colorScheme}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
