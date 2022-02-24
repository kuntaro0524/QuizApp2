import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, Link } from "react-router-dom";
import { QuizSelection } from "./components/atoms/About";
import { Contact } from "./components/atoms/Contact";
import { Home } from "./components/atoms/Home";

import { QuizLayout } from "./components/pages/QuizLayout";
import { CycleIndexProvider } from "./components/providers/CycleIndexProvider";
import { NcorrProvider } from "./components/providers/NumCorrProvider";
import { NtrialProvider } from "./components/providers/NumTrialProvider";
import { AllQuizProvider } from "./components/providers/QuizProvider";

function App() {
  return (
    <ChakraProvider>
      <CycleIndexProvider>
        <AllQuizProvider>
          <NcorrProvider>
            <NtrialProvider>
              <h1> Ibuki Quiz app ver 1.0 2021/12/24 </h1>
              <Link to="/english"> 教科書のやつ </Link>
              <Link to="/english_papa"> パパ問題集 </Link>
              <Link to="/english_work"> ワークのやつ </Link>
              {/* <Link to="/quiz">Quiz</Link> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/english"
                  element={
                    <QuizSelection subject={"english"} category={"textbook"} />
                  }
                />
                <Route
                  path="/english_papa"
                  element={
                    <QuizSelection subject={"english"} category={"papa"} />
                  }
                />
                <Route
                  path="/english_work"
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
