import { useContext } from "react";

// useContextを利用していることをカプセル化するためのクラス（らしい）

import { NcorrContext, NcorrContextType } from "../providers/NumCorrProvider";

export const useNcorr = (): NcorrContextType => useContext(NcorrContext);
