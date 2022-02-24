import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { QuizSelection } from "./components/atoms/QuizSelection";
import { Contact } from "./components/atoms/Contact";
import { Home } from "./components/atoms/Home";

import { QuizLayout } from "./components/pages/QuizLayout";
import { CycleIndexProvider } from "./components/providers/CycleIndexProvider";
import { NcorrProvider } from "./components/providers/NumCorrProvider";
import { NtrialProvider } from "./components/providers/NumTrialProvider";
import { AllQuizProvider } from "./components/providers/QuizProvider";
import { MyButton } from "./components/atoms/MyButton";

function App() {
  const navigate = useNavigate();

  const onClickUnko = () => {
    console.log("Navigateするぜ");

    navigate("/english_papa");
  };
  return (
    <ChakraProvider>
      <CycleIndexProvider>
        <AllQuizProvider>
          <NcorrProvider>
            <NtrialProvider>
              <h1> Ibuki Quiz app ver 1.0 2021/12/24 </h1>
              <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={6}
                bg="teal.500"
                color="white"
              >
                <Link to="/english"> 教科書のやつ </Link>
                <Link to="/english_papa"> パパ問題集 </Link>
                <Link to="/english_work"> ワークのやつ </Link>
                {/* <MyButton onClick={onClickUnko} colorScheme="yellow"> */}
                {/* UNKO */}
                {/* </MyButton> */}
                {/* <Link to="/quiz">Quiz</Link> */}
              </Flex>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="english"
                  element={
                    <QuizSelection subject={"english"} category={"textbook"} />
                  }
                />
                <Route
                  path="english_papa"
                  element={
                    <QuizSelection subject={"english"} category={"papa"} />
                  }
                />
                <Route
                  path="english_work"
                  element={
                    <QuizSelection subject={"english"} category={"work"} />
                  }
                />
                {/* <Route path="/quiz" element={<QuizLayout />} /> */}
              </Routes>
              {/* <QuizLayout /> */}
            </NtrialProvider>
          </NcorrProvider>
        </AllQuizProvider>
      </CycleIndexProvider>
    </ChakraProvider>
  );
}

export default App;
