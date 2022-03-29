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
import { QuizLogin } from "./components/pages/QuizLogin";
import { UserPage } from "./components/pages/UserPage";
import { SelUserProvider } from "./components/providers/UserProvider";
import {
  CycleResultContext,
  CycleResultProvider,
} from "./components/providers/CycleResultProvider";
import { AllResultsContext } from "./components/providers/ResultsProvider";
import { Results } from "./components/atoms/Results";

function App() {
  const navigate = useNavigate();

  const onClickUnko = () => {
    console.log("Navigateするぜ");

    navigate("/english_papa");
  };
  return (
    <ChakraProvider>
      <CycleResultProvider>
        <CycleIndexProvider>
          <AllQuizProvider>
            <NcorrProvider>
              <NtrialProvider>
                <SelUserProvider>
                  <h1> Ibuki Quiz app ver 1.0 2021/12/24 </h1>
                  <Routes>
                    <Route path="/" element={<QuizLogin />} />
                    <Route path="quiz" element={<QuizSelection />} />
                    {/* クエリパラメータを有効にしてみる */}
                    <Route path="/results" element={<Results />} />
                    <Route path="/login" element={<QuizLogin />} />
                    <Route path="/selection" element={<UserPage />} />
                  </Routes>
                </SelUserProvider>
              </NtrialProvider>
            </NcorrProvider>
          </AllQuizProvider>
        </CycleIndexProvider>
      </CycleResultProvider>
    </ChakraProvider>
  );
}

export default App;
