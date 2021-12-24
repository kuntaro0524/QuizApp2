import React from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  colorScheme: string;
};

export const MyButton: VFC<Props> = (props) => {
  const { children, onClick, colorScheme } = props;
  return (
    <Button m={50} w={150} h={50} colorScheme={colorScheme} onClick={onClick}>
      {children}
    </Button>
  );
};
