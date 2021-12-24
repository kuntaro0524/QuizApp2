import axios from "axios";
import { DisplayQuiz } from "./DisplayQuiz";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { QuizInfo } from "./components/types/api/quizinfo";

function App() {
  const [quizes, setQuizes] = useState<Array<QuizInfo>>([]);

  // axiosを利用してクイズをすべて読み込んでいる
  useEffect(() => {
    axios
      .get<Array<QuizInfo>>("http://localhost:9201/quiz", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setQuizes(res.data);
      })
      .catch(function (error) {
        console.log("ERROR?");
        console.log(error.config);
        for (let key of Object.keys(error)) {
          console.log(key);
          console.log(error[key]);
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <h1> Ibuki Quiz app ver 1.0 2021/12/24 </h1>
        <DisplayQuiz quizes={quizes} />
      </div>
    </ChakraProvider>
  );
}

export default App;
