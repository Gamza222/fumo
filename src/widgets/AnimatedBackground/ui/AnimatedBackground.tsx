// src/widgets/VideoBackground/ui/VideoBackground.tsx
"use client";

import { memo } from "react";
//styles
import styles from "./AnimatedBackground.module.scss";

import { VideoBackground } from "@/shared/ui/VideoBackground";
import { AsciBackground } from "@/shared/ui/AsciBackground";
import { classNames } from "@/shared/lib/utils/classNames";

//assets

import cloudsWebP from "@shared/assets/background/clouds.webp";

interface AnimatedBackgroundProps {
  poster?: string; // Fallback image
  className?: string;
}

export const AnimatedBackground = memo<AnimatedBackgroundProps>((props) => {
  const { poster, className } = props;

  return (
    <div
      className={classNames(styles.animatedBackground || "", {}, [className])}
    >
      <VideoBackground src={cloudsWebP.src} className={className} />
      <AsciBackground className={styles.asciiOverlay} effect="love" />
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";
