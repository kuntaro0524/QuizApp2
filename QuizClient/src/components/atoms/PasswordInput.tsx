import { Button, Input } from "@chakra-ui/react";
import { VFC } from "react";

type Props = {
  placeholder: string;
  onChange: any;
  value: string;
};

export const PasswordInput: VFC<Props> = (props) => {
  const { value, placeholder, onChange } = props;
  return (
    <Input placeholder={placeholder} onChange={onChange} type="password" />
  );
};
