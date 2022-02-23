import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes, Link } from "react-router-dom";
import { About } from "./components/atoms/About";
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
               <Link to='/about'> About </Link>
               <Link to='/contact'> Contact </Link>
               <Link to='/quiz'>Quiz</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<QuizLayout />} />
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
