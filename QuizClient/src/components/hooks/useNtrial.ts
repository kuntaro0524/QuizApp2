import { useContext } from "react";

// useContextを利用していることをカプセル化するためのクラス（らしい）

import {
  NtrialContext,
  NtrialContextType
} from "../providers/NumTrialProvider";

export const useNtry = (): NtrialContextType => useContext(NtrialContext);
