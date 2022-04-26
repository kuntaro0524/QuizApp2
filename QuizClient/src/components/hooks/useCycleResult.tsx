import { filter } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState, VFC } from "react";
import { DiagnosticCategory } from "typescript";
import { CycleResultContext } from "../providers/CycleResultProvider";
import { ResultInfo } from "../types/api/cycleresultinfo";
import { useMessage } from "./useMessage";

// useContextを利用していることをカプセル化するためのクラス（らしい）

export const useCycleResult = () => {
  const { resultArray, setResultArray } = useContext(CycleResultContext);
  const [dbResultArray, setDBresultArray] = useState<Array<ResultInfo>>([]);

  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_port = process.env.REACT_APP_SERVER_PORT;

  type Props = {
    subject: string;
  }


  // resultArrayを解析していろいろとやる
  type Props2 = {
    currResultArray: ResultInfo[];
    filterRatio: number;
  };

  const checkCurrentResult = (props: Props2) => {
    // すでに合格したものを登録していく方式をとる
    let passed_results_local: string[] = [];
    // 調査したことがあるかどうかのフラグ的な配列
    let checked_list: string[] = [];
    const { currResultArray, filterRatio } = props;
    console.log("Current length of results=" + currResultArray);

    currResultArray.forEach((elem) => {
      // 検討を進めている結果のIDについて
      let target_id = elem.q_id;
      console.log("検討しているTargetIDです" + target_id);

      // これまでにチェックしたリストに入っていたら見ない
      if (checked_list.includes(target_id)) {
        console.log("すでに検討しました。スキップします");
        // return って関数を終えるものではないのか。危ない
        return;
      }
      // これまでチェックリストに入っていないかどうかを確認する
      let duplicated_results = currResultArray.filter(
        (elem2) => elem2.q_id === target_id
      );

      // 比較関数：オブジェクトの配列のソートに利用する
      // a,b のメンバ変数である datetime によりソートをする
      // 数値が大きい順に並べたいので大きいときに -1 を返すようにした
      function compare(a: ResultInfo, b: ResultInfo) {
        let rtn_value = 0;
        if (a.datetime > b.datetime) {
          rtn_value = -1;
        } else if (b.datetime > a.datetime) {
          rtn_value = 1;
        }
        return rtn_value;
      }

      // 日付でソートしたデータ：最新版が一番上にくる
      // ここでは「あるクイズID」についての結果で最新版だけを取得している
      let latest_result = duplicated_results.sort(compare)[0];
      if (latest_result != null) {
        // チェックリストにこのクイズIDを入れておく：以降調査をしない
        checked_list.push(latest_result.q_id);
        console.log(
          `ID=${latest_result.q_id} Correction ratio=${latest_result.corr_ratio}`
        );

        // 最新の結果に記載してある正答率によってフィルタをかけるようにする
        // 合格したものを登録するという仕様に切り替え→初期配列をなしにするほうが簡単なので
        if (latest_result.corr_ratio >= filterRatio) {
          passed_results_local.push(latest_result.q_id);
        }
      }
    });
    console.log("すでに合格した結果");
    console.log(passed_results_local);

    return passed_results_local;
  };

  const getLatestResult = (props: Props2) => {
    let passed_results_local = checkCurrentResult(props)
    console.log(passed_results_local);
  }

  // 単純に配列を登録している
  const updateResult = (props: Props) => {
    const { subject } = props;
    axios
      .post<Array<ResultInfo>>(
        `http://${server_url}:${server_port}/results/${subject}`,
        resultArray,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
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
  };

  const getResult = (props: Props) => {
    const { subject } = props;
    axios
      .get<Array<ResultInfo>>(
        `http://${server_url}:${server_port}/results/${subject}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setDBresultArray(res.data);
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
  };

  return { resultArray, setResultArray, updateResult, getResult, dbResultArray, checkCurrentResult, getLatestResult }

}