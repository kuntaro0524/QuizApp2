import { ChangeEvent, MouseEventHandler, useState } from "react";
import { MyInput } from "../atoms/MyInput";
import { MyButton } from "../atoms/MyButton";
import { Box, Button, Center, Container } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import { useMessage } from "../hooks/useMessage";
import { PasswordInput } from "../atoms/PasswordInput";
import { createModuleBlock } from "typescript";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  pass: string;
};

export const QuizLogin = () => {
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");

  //   ログインに成功したらページを自動的に遷移する
  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswd(e.target.value);
  };
  const onClickOK = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(userArray);

    const selectedUser = userArray.find((element) => element.name === name);
    console.log(selectedUser);

    if (selectedUser === undefined) {
      showMessage({ title: "そんなユーザおらへんがな", status: "error" });
    } else {
      console.log(selectedUser);
      if (selectedUser.pass === passwd) {
        showMessage({ title: "認証できました", status: "success" });
        navigate("/english");
      } else {
        showMessage({ title: "パスワードがちがいまんがな", status: "error" });
      }
    }
  };
  console.log(passwd);
  console.log(name);

  const { useUsers, userArray } = useUser();

  console.log("####################");
  useUsers();
  console.log("####################");

  return (
    <>
      <Container>
        <MyInput
          placeholder="Input your rname"
          value={name}
          onChange={onChangeName}
        />
        <PasswordInput
          placeholder="Input your password"
          value={name}
          onChange={onChangePass}
        />
        <MyButton colorScheme="teal" onClick={onClickOK}>
          Common
        </MyButton>
      </Container>
    </>
  );
};
