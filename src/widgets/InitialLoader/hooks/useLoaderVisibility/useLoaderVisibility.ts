"use client";

import { useEventListener } from "@/shared/lib/utils/useEventListener/useEventListener";
import { useCallback, useState } from "react";
import { INITIAL_LOADER_HIDE_EVENT } from "../../model/constants/constants";

export const useLoaderVisibility = (delay: number = 50) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleEvent = useCallback(() => {
    setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  useEventListener(INITIAL_LOADER_HIDE_EVENT, handleEvent);

  return isVisible;
};
