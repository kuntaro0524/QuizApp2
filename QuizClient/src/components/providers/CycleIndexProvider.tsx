// ログインしたユーザの情報を保持する
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";

// 保持する変数と設定関数
export type CycleContextType = {
  ncycle: number;
  // useState などの更新関数の型は以下のようになるらしい→おぼえげー
  setCycle: Dispatch<SetStateAction<number>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const CycleContext = createContext<CycleContextType>(
  {} as CycleContextType
);

// childrenすべてに影響があるよーって話だったっけ
export const CycleIndexProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // 再レンダリングする規模によっては変数と関数は別にしたほうが良い場合もある
  const [ncycle, setCycle] = useState<number>(0);
  return (
    <CycleContext.Provider value={{ ncycle, setCycle }}>
      {children}
    </CycleContext.Provider>
  );
};
