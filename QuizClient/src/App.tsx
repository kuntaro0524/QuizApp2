import "./App.css";
import axios from "axios";
import { DisplayConds } from "./DisplayConds";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Conds, LogStr } from "./components/types/api/conds";

function App() {
  const [conds, setConds] = useState<Array<Conds>>([]);

  // axiosを利用して測定条件をすべて読み込んでいる
  useEffect(() => {
    axios
      .get<Array<Conds>>("http://localhost:1234/measurements", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Here done");
        setConds(res.data);
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
        <h1> ENSOKU GUI ver 1.0 </h1>
        <DisplayConds conds={conds} />
      </div>
    </ChakraProvider>
  );
}

export default App;
