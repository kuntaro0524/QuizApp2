import React, { memo } from "react";
import { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { useCycleNum } from "../hooks/useCycleNum";
import { useResult } from "../hooks/useResult";
import { useNcorr } from "../hooks/useNcorr";
import { useNtry } from "../hooks/useNtrial";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { useTable } from "../hooks/useTable";

export const ScoreTable: VFC = memo(() => {
  const {
    ncycle,
    ntrial_total,
    ncorr_total,
    setCycle,
    setNtrialTotal,
    setNcorrTotal,
  } = useTable();

  let correct_ratio = "0.0";

  if (ntrial_total != 0) {
    correct_ratio = ((ncorr_total / ntrial_total) * 100.0).toFixed(2.0);
  }
  return (
    <>
      <Table size="md" variant="striped" colorScheme="blue">
        <TableCaption>現状のまとめ</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">これまでの問題数</Th>
            <Th textAlign="center">これまでの正答数</Th>
            <Th textAlign="center" isNumeric>
              これまでの正答率（％）
            </Th>
            <Th textAlign="center"> 現在のサイクル数</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize="20px" textAlign="center">
              {ntrial_total}
            </Td>
            <Td fontSize="20px" textAlign="center">
              {ncorr_total}
            </Td>
            <Td fontSize="20px" textAlign="center" isNumeric>
              {correct_ratio}
            </Td>
            <Td fontSize="20px" textAlign="center" isNumeric>
              {ncycle}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
});
