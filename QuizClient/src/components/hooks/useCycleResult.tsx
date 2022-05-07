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
  type Props3 = {
    currResultArray: ResultInfo[],
    filterRatio: number
  }

  // 現在の結果配列から重複したものを取り除く機能
  const getFlatResult = (props: Props3) => {
    // 調査したことがあるかどうかのフラグ的な配列
    let checked_list: string[] = [];
    console.log("<getFlatResult>");

    console.log("Current length of results=" + resultArray);

    const { filterRatio, currResultArray } = props;

    currResultArray.forEach((elem) => {
      // 検討を進めている結果のIDについて
      let target_id = elem.q_id;
      console.log("検討しているTargetIDです" + target_id);

      // これまでにチェックしたリストに入っていたらスキップする
      if (checked_list.includes(target_id)) {
        console.log("すでに検討しました。スキップします");
        // return って関数を終えるものではないのか。危ない
        return;
      }
      // 結果配列の中に同じ「クイズID」のものが含まれている場合配列を抽出
      let duplicated_results = currResultArray.filter(
        (elem2) => elem2.q_id === target_id
      );

      console.log("Duplicated results");
      console.log(duplicated_results);

      if (duplicated_results.length != 0) {
        // 登録日で結果配列をソートする
        // ここでは「あるクイズID」についての結果で最新版だけを取得している
        let latest_result = duplicated_results.sort(compareTime)[0];
        // チェックリストにこのクイズIDを入れておく：以降調査をしない
        checked_list.push(latest_result.q_id);
        console.log(
          `ID=${latest_result.q_id} Correction ratio=${latest_result.corr_ratio}`
        );
      }
    })
    console.log("</getFlatResult>");
    return checked_list
  };


  const checkCurrentResult = (props: Props3) => {
    const { filterRatio, currResultArray } = props;
    // すでに合格したものを登録していく方式をとる
    let passed_results_local: string[] = [];
    // 調査したことがあるかどうかのフラグ的な配列
    let checked_list: string[] = [];
    console.log("Current length of results=" + currResultArray);

    checked_list = getFlatResult({ filterRatio, currResultArray });

    console.log(">>> checkCurrentResult: checked_list <<<<");
    console.log(checked_list);

    console.log("重複しているものをなくしてクイズIDごとのチェックをする");

    checked_list.forEach((elem) => {
      const target_qid = elem;
      const target_result = currResultArray.find((v) => v.q_id === target_qid);
      console.log("今調査しているのは");
      console.log(target_result);
      console.log("フィルターかけるよ");

      if (target_result != null) {
        if (target_result.corr_ratio >= filterRatio) {
          console.log("合格したよ！" + target_result.corr_ratio);
          passed_results_local.push(target_result.q_id);
        } else {
          console.log("まだ合格していないよ" + target_result.corr_ratio);
        }
      }
    });
    console.log("すでに合格した結果");
    console.log(passed_results_local);

    return passed_results_local;
  };

  // 受け取った ResultInfoに含まれる時間を比較してソートする比較関数
  // 比較関数：オブジェクトの配列のソートに利用する
  // a,b のメンバ変数である datetime によりソートをする
  // 数値が大きい順に並べたいので大きいときに -1 を返すようにした
  function compareTime(a: ResultInfo, b: ResultInfo) {
    let rtn_value = 0;
    if (a.datetime > b.datetime) {
      rtn_value = -1;
    } else if (b.datetime > a.datetime) {
      rtn_value = 1;
    }
    return rtn_value;
  }

  const getLatestResult = (props: Props3) => {
    let passed_results_local = checkCurrentResult(props)
    console.log(passed_results_local);
    console.log("*************************************8");
  }

  // 単純に配列を登録している
  const updateResult = (props: Props) => {
    console.log("<<< updateResult >>> is running.");
    console.log(resultArray);

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

  return { resultArray, setResultArray, updateResult, getResult, dbResultArray, checkCurrentResult, getLatestResult, getFlatResult }

}