import { ChangeEvent, MouseEventHandler, useContext, useState } from "react";
import { MyInput } from "../atoms/MyInput";
import { MyButton } from "../atoms/MyButton";
import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import { useMessage } from "../hooks/useMessage";
import { PasswordInput } from "../atoms/PasswordInput";
import { createModuleBlock } from "typescript";
import { useNavigate } from "react-router-dom";
import { SelUserContext } from "../providers/UserProvider";

export const QuizLogin = () => {
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const { selectedUser, setSelectedUser } = useContext(SelUserContext);

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
    console.log("selectedUser=", selectedUser);

    if (selectedUser === undefined) {
      showMessage({ title: "そんなユーザおらへんがな", status: "error" });
    } else {
      console.log(selectedUser);
      if (selectedUser.pass === passwd) {
        showMessage({
          title: `${selectedUser.name}さんこんにちは！`,
          status: "success",
        });
        setSelectedUser(selectedUser);
        navigate("/selection");
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
        <Box alignContent="center">
          <Heading bg="teal" color="white" borderRadius={35}>
            <Center>ログインしましょう</Center>
          </Heading>
          <Grid templateColumns="repeat(2,1fr)" m={1}>
            <GridItem w="100px">
              <Center>
                <p> User name </p>
              </Center>
            </GridItem>
            <GridItem w="300px">
              <MyInput
                placeholder="Input your rname"
                value={name}
                onChange={onChangeName}
              />
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(2,1fr)" m={1}>
            <GridItem w="100px">
              <Center>
                <p> Password </p>
              </Center>
            </GridItem>
            <GridItem w="300px">
              <PasswordInput
                placeholder="Input your password"
                value={name}
                onChange={onChangePass}
              />
            </GridItem>
          </Grid>
          <MyButton colorScheme="teal" onClick={onClickOK}>
            Confirm
          </MyButton>
        </Box>
      </Container>
    </>
  );
};
