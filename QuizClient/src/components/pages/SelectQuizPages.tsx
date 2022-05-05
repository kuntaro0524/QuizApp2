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
  useQuery,
  useTabsDescendantsContext,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState, VFC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setConstantValue } from "typescript";
import { useMessage } from "../hooks/useMessage";
import { useQuiz } from "../hooks/useQuiz";

// import { PageSelection } from "../atoms/PageSelection";

type Props = {
  username: string;
};

export const SelectQuizPages: VFC<Props> = (props) => {
  // どういう問題選定にするかのフラグ
  let [subject, setSubject] = useState("");
  let [isPage, setIsPage] = useState(false);
  // isCatというのをなくする必要がある
  let [isCat, setIsCat] = useState(false);
  let [startPage, setStartPage] = useState(0);
  let [endPage, setEndPage] = useState(999999);
  let [categories, setCategories] = useState<Array<string>>([]);
  // 最終的なカテゴリ
  let [category, setCategory] = useState<string>("");
  // 問題数を限定するためのフックス
  let [nQuestion, setNquestion] = useState(10);

  // ボタンを押してリンク先へ移動したい
  const navigate = useNavigate();
  // メッセージ表示用のフックス
  const { showMessage } = useMessage();

  const { selectRandomQuizes } = useQuiz();

  const howto_select = [
    { subject: "english", categories: ["papa", "textbook", "exam"] },
    { subject: "shakai", categories: ["jiyujizai", "correction"] },
    { subject: "science", categories: ["jiyujizai", "correction"] },
  ];

  // 教科を選択したらカテゴリー主体かページ主体かを選択できる
  const getHowToSelect = (subject_name: string) => {
    let result = howto_select.filter(
      (item) => item.subject === subject_name
    )[0];
    // 教科をフックスに登録
    setSubject(result.subject);
    setCategories(result.categories);
    return true;
  };

  const { username } = props;
  console.log(`あなたは${username}さんですね`);

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const designated_subject = e.target.value;
    getHowToSelect(designated_subject);
    console.log(subject);

    if (subject === "english") {
      showMessage({ title: "英語のときはページ数関係ないからね", status: "success" });
    }
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    if (subject === "") {
      alert("最初に教科を選択してください")
      return
    }
    setCategory(e.target.value);
  };

  const onChangeSelectCat = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onClickGen = () => {
    console.log("Generate button was pushed.");
    // ここで今回やるクイズのリストを作る。
    // すでに/quiz に対してRouteは設定してあるのでクエリパラメタでクイズ選定に必要なパラメータを渡している
    navigate("/quiz", {
      state: {
        username: username,
        subject: subject,
        start_page: startPage,
        end_page: endPage,
        category: category,
        isCat: isCat,
        nQuestion: nQuestion
      }
    });
    // `/quiz?username=${username}&subject=${subject}&start_page=${startPage}&end_page=${endPage}&category=${category}&isCat=${isCat}&nQuestion=${nQuestion}`
    // );
  };

  return (
    <Flex>
      <VStack>
        <Box gap={1} bg="white" color="white">
          // ここから新型のやつを実装してみる // まずは教科を選択する
          <Select
            textAlign="center"
            fontSize={"25px"}
            width="250px"
            color="black"
            placeholder="Select option"
            bg={"teal.200"}
            onChange={onChangeSelect}
          >
            <option value="shakai">社会</option>
            <option value="english">英語</option>
            <option value="science">理科</option>
          </Select>
          test
          <Select
            textAlign="center"
            fontSize={"25px"}
            width="250px"
            color="black"
            placeholder="カテゴリを選択しましょう"
            bg={"teal.200"}
            onChange={onChangeCategory}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}> {cat} </option>)
            )}
          </Select>
          <Box color={"green"}>
            <Grid templateColumns='repeat(4, 1fr)' gap={1}>
              <Text m={3}>ページを選択</Text>
              <NumberInput m={3}
                width={"150px"}
                onChange={(valueString) =>
                  setStartPage(parseInt(valueString))
                }
                value={startPage}
                defaultValue={1}
                min={1}
                max={600}
              >
                <NumberInputField />
              </NumberInput>
              <Text m={3}>To</Text>
              <NumberInput m={3}
                width={"150px"}
                value={endPage}
                onChange={(valueString) => setEndPage(parseInt(valueString))}
                defaultValue={100}
                min={1}
                max={600}
              >
                <NumberInputField />
              </NumberInput>
            </Grid>
          </Box>
          <Flex>
            <Text color="blue">問題数を限定する</Text>
            <NumberInput
              width={"150px"}
              value={nQuestion}
              onChange={(valueString) => setNquestion(parseInt(valueString))}
              defaultValue={100}
              color={"brown"}
            >
              <NumberInputField />
            </NumberInput>
          </Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel color="black" htmlFor="email-alerts" mb="0">
              本気モード
            </FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
          <Button colorScheme={"teal"} onClick={onClickGen}>
            問題を作成する
          </Button>
        </Box >
      </VStack >
    </Flex >
  );
};
