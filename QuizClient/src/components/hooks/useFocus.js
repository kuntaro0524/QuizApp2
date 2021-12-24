// focusを変えるhooks

import { useRef } from "react";

// Gneral Focus Hook
export const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
