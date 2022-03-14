import { filter } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState, VFC } from "react";
import { DiagnosticCategory } from "typescript";
import { CycleResultContext } from "../providers/CycleResultProvider";
import { ResultInfo } from "../types/api/cycleresultinfo";
import { useMessage } from "./useMessage";

// useContextを利用していることをカプセル化するためのクラス（らしい）

type Props2 = {};

export const useCycleResult = () => {
  const { resultArray, setResultArray } = useContext(CycleResultContext);

  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_port = process.env.REACT_APP_SERVER_PORT;

  type Props = { username: string; subject: string; category: string };

  const useResult = (props: Props) => {
    const { subject, category } = props;

    useEffect(() => {
      axios
        .put<Array<ResultInfo>>(
          `http://${server_url}:${server_port}/results/${subject}`, resultArray,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          console.log("Success?");
          console.log(res.data);
        })
        .catch(function (error) {
          console.log("ERROR?");
          console.log(error.config);
          console.log(error);
          for (let key of Object.keys(error)) {
            console.log(key);
            console.log(error[key]);
          }
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }, []);
  };

  return { resultArray, setResultArray, useResult };
};
