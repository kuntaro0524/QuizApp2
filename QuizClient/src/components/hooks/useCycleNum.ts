import { useContext } from "react";

// useContextを利用していることをカプセル化するためのクラス（らしい）

import {
  CycleContext,
  CycleContextType,
} from "../providers/CycleIndexProvider";

export const useCycleNum = () => {
  const { ncycle, setCycle } = useContext(CycleContext);
  return { ncycle, setCycle };
};
