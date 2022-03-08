import {
  Center,
  Flex,
  grid,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { VFC } from "react";
import { Link } from "react-router-dom";

type Props = {
  username: string;
};

const pages = [
  {
    user: "kuntaro",
    quizes: [{ title: "教科書問題", link: "/english" }],
  },
  {
    user: "ibuki",
    quizes: [
      { title: "教科書問題", link: "/english" },
      { title: "パパ問題１", link: "/english_papa" },
      { title: "ワークの問題", link: "/english_work" },
    ],
  },
];

export const SelectQuizPages: VFC<Props> = (props) => {
  const { username } = props;
  console.log(`あなたは${username}さんですね`);

  //   pagesに含まれているものからこのユーザが選択できるページを出し分ける
  const user_contents = pages.filter((page) => page.user === username)[0];
  const quizlist = user_contents.quizes;
  console.log(quizlist);

  return (
    <Grid templateColumns="repeat(6,1fr)" gap={1} bg="white" color="white">
      {quizlist.map((quizpage, index) => (
        <GridItem
          key={index}
          h="100"
          w="100%"
          colSpan={1}
          color="white"
          bg="teal"
          borderRadius={35}
        >
          <Link key={index} to={quizpage.link}>
            <Center h="full" textStyle="bold">
              {quizpage.title}
            </Center>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
