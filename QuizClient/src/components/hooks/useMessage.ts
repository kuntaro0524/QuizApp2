// メッセージ表示の部分をカスタムフックにするという企画

import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  // 以下の文字列しか受け取れないという意味になるらしい
  status: "info" | "warning" | "success" | "error";
};

export const useMessage = () => {
  // chacraUIのToast機能を使っていきます
  const toast = useToast();
  const showMessage = useCallback((props: Props) => {
    const { title, status } = props;
    toast({
      // 変数名と代入する変数名が同じなので最初の２つは省略可能 (:)
      title,
      status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  }, []);

  return { showMessage };
};
