// JSONを読み込んでからの問題数について記録
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";

// 保持する変数と設定関数
export type NtrialContextType = {
  ntrial_total: number;
  // useState などの更新関数の型は以下のようになるらしい→おぼえげー
  setNtrialTotal: Dispatch<SetStateAction<number>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const NtrialContext = createContext<NtrialContextType>(
  {} as NtrialContextType
);

// childrenすべてに影響があるよーって話だったっけ
export const NtrialProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // 再レンダリングする規模によっては変数と関数は別にしたほうが良い場合もある
  const [ntrial_total, setNtrialTotal] = useState<number>(0);
  return (
    // ContextTypeを定義するときに利用した変数名にしておかないといけないらしい
    <NtrialContext.Provider value={{ ntrial_total, setNtrialTotal }}>
      {children}
    </NtrialContext.Provider>
  );
};
