// 一回のクイズに関する結果の配列を格納するプロバイダ
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { ResultInfo } from "../types/api/cycleresultinfo";

// 保持する変数と設定関数
export type CycleResultType = {
  // クイズの結果を保持する配列
  resultArray: ResultInfo[];
  // useState などの更新関数の型は以下のようになるらしい→おぼえげー
  setResultArray: Dispatch<SetStateAction<Array<ResultInfo>>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const CycleResultContext = createContext<CycleResultType>(
  {} as CycleResultType
);

// childrenすべてに影響があるよーって話だったっけ
export const CycleResultProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // 再レンダリングする規模によっては変数と関数は別にしたほうが良い場合もある
  const dt = new Date();
  const [resultArray, setResultArray] = useState<Array<ResultInfo>>([
    // {
    //   _id: "3",
    //   q_id: "This is it?",
    //   isCorrect: false,
    //   datetime: dt,
    //   ntrial: 10,
    //   ncorr: 5,
    //   corr_ratio: 0.5,
    // },
  ]);
  return (
    <CycleResultContext.Provider value={{ resultArray, setResultArray }}>
      {children}
    </CycleResultContext.Provider>
  );
};
