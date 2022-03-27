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
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { setConstantValue } from "typescript";
// import { PageSelection } from "../atoms/PageSelection";

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



export const SelectQuizPages: VFC<Props> = (props) => {
  // どういう問題選定にするかのフラグ
  let [isPage, setIsPage] = useState(false);
  let [isCat, setIsCat] = useState(false);
  let [startPage, setStartPage] = useState(1);
  let [endPage, setEndPage] = useState(1000);

  const howto_select = [
    { subject: "english", sele_method: "category" },
    { subject: "social", sele_method: "page" },
    { subject: "science", sele_method: "page" },
  ]

  const getHowToSelect = (subject_name: string) => {
    let result = howto_select.filter(item => item.subject === subject_name)[0]
    console.log("選ばれたのは" + result.sele_method);
    if (result.sele_method === "category") {
      setIsCat(true);
      setIsPage(false);

    }
    if (result.sele_method === "page") {
      setIsPage(true);
      setIsCat(false);
    }
    return result.sele_method;
  }

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
          <Box color={"green"} >
            {isPage ?
              <Flex>
                <Text>
                  From
                </Text>
                <NumberInput width={'150px'} onChange={(valueString) => setStartPage(parseInt(valueString))}
                  value={startPage} defaultValue={1} min={1} max={600} >
                  <NumberInputField />
                </NumberInput>
                <Text>
                  To
                </Text>
                <NumberInput width={'150px'} value={endPage} onChange={(valueString) => setEndPage(parseInt(valueString))} defaultValue={100} min={1} max={600} >
                  <NumberInputField />
                </NumberInput>
              </Flex> : null}
          </Box>
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