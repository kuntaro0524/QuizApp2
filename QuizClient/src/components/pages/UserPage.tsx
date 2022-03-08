import { Center, Flex, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SelUserContext } from "../providers/UserProvider";
import { SelectQuizPages } from "./SelectQuizPages";

export const UserPage = () => {
  const { selectedUser, setSelectedUser } = useContext(SelUserContext);

  console.log(selectedUser);

  return (
    <>
      <Center
        m={3}
        borderRadius={15}
        fontSize="24px"
        padding={3}
        bg="tomato"
        color="white"
      >
        {selectedUser.name}さんが選択できるクイズ
      </Center>
      <SelectQuizPages username={selectedUser.name} />
    </>
  );
};
