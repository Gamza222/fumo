"use client";

// pages/HomePage/hooks/useHomePageAnimation.ts
import { useLoaderVisibility } from "@/widgets/InitialLoader";
import { useMemo } from "react";
import { HomePageAnimationConfig } from "../../model/types/types";

export const useHomePageAnimation = (config: HomePageAnimationConfig = {}) => {
  const isVisible = useLoaderVisibility(config.delay || 50);
  console.log("isVisible", isVisible);

  return useMemo(
    () => ({
      isVisible,
      style: {
        "--animation-duration": `${config.duration || 500}ms`,
        "--animation-easing": config.easing || "ease-out",
        opacity: isVisible ? 1 : 0,
      } as React.CSSProperties,
    }),
    [isVisible, config]
  );
};
