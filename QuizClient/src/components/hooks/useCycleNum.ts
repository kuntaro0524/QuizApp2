
import { useContext } from "react";

// useContextを利用していることをカプセル化するためのクラス（らしい）

import {
  CycleContext,
  CycleContextType
} from "../providers/CycleIndexProvider";

export const useCycleNum = (): CycleContextType => useContext(CycleContext);