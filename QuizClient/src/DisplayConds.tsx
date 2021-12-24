import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useDisclosure } from "@chakra-ui/hooks";
import { Table, TableCaption, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { VFC, useCallback, useState } from "react";

import { Conds } from "./components/types/api/conds";
import { CondModal } from "./components/atoms/CondModal";

type Props = {
  conds: Conds[] | null;
};

export const DisplayConds: VFC<Props> = (props) => {
  const { conds } = props;
  console.log("DisplayConds");
  /* chakra UI modal hooks*/
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* useState -> target condition */
  const [targetCond, setTargetCond] = useState<Conds>();

  const onClickModify = useCallback((e, _id) => {
    console.log("ID=" + _id);

    if (conds != null) {
      const tmpcond = conds.find((cond) => cond._id === _id);
      // console.log(tmpcond);

      if (tmpcond != null) {
        setTargetCond(tmpcond);
      }
    }
    onOpen();
  }, []);

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <TableCaption> ZOO data collection sheet </TableCaption>
        <Tbody>
          <Th>checkBox</Th>
          <Th>PuckID</Th>
          <Th>PinID</Th>
          <Th>Wavelength</Th>
          <Th>Dist(raster)</Th>
          <Th>Max hits</Th>
          <Th>loop size[um]</Th>
          {/* condsは場合によっては（というか最初だけ）はNullの可能性があるのでここで分岐させるのが良い */}
          {conds != null &&
            conds.map((cond) => (
              <Tr key={cond._id}>
                <Checkbox size="md" colorScheme="green" defaultIsChecked />
                <Td>{cond.puckid}</Td>
                <Td>{cond.pinid}</Td>
                <Td>{cond.wavelength}</Td>
                <Td>{cond.dist_raster}</Td>
                <Td>{cond.maxhits}</Td>
                <Td>{cond.loopsize}</Td>
                <Td>
                  <Button
                    onClick={(e) => {
                      onClickModify(e, cond._id);
                    }}
                    colorScheme="blue"
                  >
                    Modify
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {targetCond != null && (
        <CondModal targetCond={targetCond} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
};
