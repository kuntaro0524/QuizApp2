import { ChakraProvider } from "@chakra-ui/react";

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
              <QuizLayout />
            </NtrialProvider>
          </NcorrProvider>
        </AllQuizProvider>
      </CycleIndexProvider>
    </ChakraProvider>
  );
}

export default App;
