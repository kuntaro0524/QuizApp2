import { VStack } from "@chakra-ui/react";
import { VFC } from "react";
import { Link } from "react-router-dom";

type Props = {
  username: string;
};

const pages = [
  {
    user: "kuntaro",
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
    <VStack
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      {quizlist.map((quizpage, index) => (
        <Link key={index} to={quizpage.link}>
          {quizpage.title}
        </Link>
      ))}
    </VStack>
  );
};
