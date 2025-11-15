"use client";

import { memo, useRef } from "react";
import { classNames } from "@/shared/lib/utils/classNames";
import { useAsciiEffect } from "./hooks/useAsciiEffect";
import type { AsciiBackgroundProps } from "./model/types";
import styles from "./AsciBackground.module.scss";

export const AsciBackground = memo<AsciiBackgroundProps>(
  ({ enableMouse = true, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useAsciiEffect(canvasRef, enableMouse);

    return (
      <div className={classNames(styles.container || "", {}, [className])}>
        <canvas ref={canvasRef} className={styles.ascii} />
      </div>
    );
  }
);

AsciBackground.displayName = "AsciBackground";
