import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";

import { Button, Stack, FormLabel, FormControl, Input } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState, VFC } from "react";

import { Conds } from "../types/api/conds";

type Props = {
  targetCond: Conds;
  isOpen: boolean;
  onClose: () => void;
};

export const CondModal: VFC<Props> = (props) => {
  const readonlyFlag = false;
  const { targetCond, isOpen, onClose } = props;

  // console.log("CondModal");

  //   Modal上で編集するパラメータについてhooksを準備して利用する;
  const [rootDir, setRootDir] = useState("");
  // フォーマットする数値としてフィールドに入力すると非常にややこしい
  // 文字列として扱うことにする（方法が明らかになるまで）
  const [WL, setWL] = useState("1.00000");
  const [distRaster, setDistRaster] = useState(0.0);
  const [distDS, setDistDS] = useState(0.0);

  //   Modal上で編集したパラメータをhooksで管理する
  const onChangeRootDir = (e: ChangeEvent<HTMLInputElement>) => {
    setRootDir(e.target.value);
  };
  const onChangeWL = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != null) {
      setWL(e.target.value);
    }
  };
  const onChangeDistRaster = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value != null) setDistRaster(parseFloat(e.target.value));
  };
  const onChangeDistDS = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value != null) setDistDS(parseFloat(e.target.value));
  };

  // Modal上のパラメータをデータベースに反映する
  const onClickUpdate = () => {
    console.log("TESTSETSTEET");
  };

  //   Modal上で編集できるパラメータについてここでuseStateで管理するので初期値を設定して上げる必要がある
  //   useEffectを最初だけ呼んでおく（というかそういう機能
  useEffect(() => {
    setRootDir(targetCond?.root_dir ?? "");
    setWL(targetCond?.wavelength.toFixed(2) ?? "1.0");
    setDistRaster(targetCond?.dist_raster ?? 125.0);
    setDistDS(targetCond?.dist_raster ?? 125.0);
  }, [targetCond]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Target condition from ZOO DB </ModalHeader>
        <ModalCloseButton />
        {/* マージンを調整 */}
        <ModalBody mx={4}>
          {/* 項目を並べるためにStackは入れておこう（配列調整がしやすい） これは */}
          <Stack>
            <FormControl>
              <FormLabel>Root directory</FormLabel>
              <Input
                // useState()で管理している値になった
                value={rootDir}
                // value={targetCond.root_dir}
                isReadOnly={readonlyFlag}
                onChange={onChangeRootDir}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Wavelength</FormLabel>
              <Input
                // value={WL.toFixed(6)}
                value={WL}
                isReadOnly={readonlyFlag}
                onChange={onChangeWL}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Distance(raster)</FormLabel>
              <Input
                value={distRaster}
                isReadOnly={readonlyFlag}
                onChange={onChangeDistRaster}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Distance(data)</FormLabel>
              <Input
                value={distDS}
                isReadOnly={readonlyFlag}
                onChange={onChangeDistDS}
              />
            </FormControl>
          </Stack>
          <Button onClick={onClickUpdate}> Do Unko </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
