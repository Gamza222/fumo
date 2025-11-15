// src/widgets/VideoBackground/VideoBackground.tsx
"use client";

import { memo } from "react";

//styles
import styles from "./VideoBackground.module.scss";
import { classNames } from "@/shared/lib/utils/classNames";

interface VideoBackgroundProps {
  src: string; // Animated WebP file
  fallback?: string; // Static fallback image
  className?: string;
}

export const VideoBackground = memo<VideoBackgroundProps>((props) => {
  const { src, fallback, className } = props;

  return (
    <div className={classNames(styles.videoBackground || "", {}, [className])}>
      <picture>
        <source srcSet={src} type="image/webp" />

        <img
          src={fallback || src}
          alt="Animated background"
          className={styles.backgroundImage}
        />
      </picture>
    </div>
  );
});

VideoBackground.displayName = "VideoBackground";
