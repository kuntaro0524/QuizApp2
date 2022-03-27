import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  grid,
  Grid,
  GridItem,
  Select,
  SimpleGrid,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, VFC } from "react";
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
      { title: "ワークの問題", link: "/english_woSelectErk" },
    ],
  },
];

const howto_select = [
  { subject: "english", sele_method: "category" },
  { subject: "social", sele_method: "page" },
  { subject: "science", sele_method: "page" },
]

const getHowToSelect = (subject_name: string) => {
  let result = howto_select.filter(item => item.subject === subject_name)[0]
  console.log(result.sele_method);
  return result.sele_method;
}

export const SelectQuizPages: VFC<Props> = (props) => {
  const { username } = props;
  console.log(`あなたは${username}さんですね`);

  //   pagesに含まれているものからこのユーザが選択できるページを出し分ける
  const user_contents = pages.filter((page) => page.user === username)[0];
  const quizlist = user_contents.quizes;
  console.log(quizlist);

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const designated_subject = e.target.value;
    getHowToSelect(designated_subject);
  }

  return (
    <Flex>
      <VStack>
        <Box gap={1} bg="white" color="white">
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
          // ここから新型のやつを実装してみる
          // まずは教科を選択する
          <Select textAlign='center' fontSize={'25px'} width='250px' color='black' placeholder='Select option' bg={'teal.200'} onChange={onChangeSelect}>
            <option value='social' >社会</option>
            <option value='english'>英語</option>
            <option value='science'>理科</option>
          </Select>
          <FormControl display='flex' alignItems='center'>
            <FormLabel color="black" htmlFor='email-alerts' mb='0'>
              本気モード？
            </FormLabel>
            <Switch id='email-alerts' />
          </FormControl>
          <Button colorScheme={'teal'}>
            問題を作成する
          </Button>
        </Box>
      </VStack>
    </Flex >
  );
};
