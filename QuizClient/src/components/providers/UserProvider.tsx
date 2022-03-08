// ログインしているユーザを保持するためのコンテキスト
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { UserInfo } from "../types/api/userinfo";

// 保持する変数と設定関数
export type SelectedUserType = {
  // クイズ情報を保持する配列
  selectedUser: UserInfo;
  // useState などの更新関数の型は以下のようになるらしい→おぼえげー
  setSelectedUser: Dispatch<SetStateAction<UserInfo>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const SelUserContext = createContext<SelectedUserType>(
  {} as SelectedUserType
);

// childrenすべてに影響があるよーって話だったっけ
export const SelUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // 再レンダリングする規模によっては変数と関数は別にしたほうが良い場合もある
  const [selectedUser, setSelectedUser] = useState<UserInfo>({
    _id: "3",
    name: "kuntaro",
    pass: "kunio335",
  });
  return (
    <SelUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelUserContext.Provider>
  );
};
