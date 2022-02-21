import { useContext } from "react";

// useContextを利用していることをカプセル化するためのクラス（らしい）

import {
  CycleContext,
  CycleContextType,
} from "../providers/CycleIndexProvider";

import {
  NtrialContext,
  NtrialContextType,
} from "../providers/NumTrialProvider";

import { NcorrContext, NcorrContextType } from "../providers/NumCorrProvider";

export const useTable = () => {
  const { ncycle, setCycle } = useContext(CycleContext);
  const { ntrial_total, setNtrialTotal } = useContext(NtrialContext);
  const { ncorr_total, setNcorrTotal } = useContext(NcorrContext);
  return {
    ncycle,
    ntrial_total,
    ncorr_total,
    setCycle,
    setNtrialTotal,
    setNcorrTotal,
  };
};
