/**
 * ProgressBar Component
 *
 * Reusable progress bar component with smooth animations.
 * Can be moved to shared/ui later if needed elsewhere.
 */

import { memo } from "react";
import styles from "./ProgressBar.module.scss";

import { formatProgress, getProgressBarWidth } from "../lib/lib";

import { classNames } from "@/shared/lib/utils/classNames";
import { Mods } from "@/shared/lib/utils/classNames/classNames";

import { Text } from "@/shared/ui/Text";
import {
  TextColor,
  TextFontWeight,
  TextSize,
  TextVariant,
} from "@/shared/ui/Text/Text.types";

export interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  className?: string;
  message?: string;
}

export const ProgressBar = memo<ProgressBarProps>((props) => {
  const { progress, showPercentage = true, className, message = "" } = props;
  const progressBarWidth = getProgressBarWidth(progress);
  const displayProgress = formatProgress(progress);

  const progressBarMods: Mods = {
    [styles.showMessage || ""]: message,
    [styles.showPercentage || ""]: showPercentage,
  };
  return (
    <div
      className={classNames(styles.progressBar || "", { ...progressBarMods }, [
        className,
      ])}
    >
      <div className={styles.textContainer}>
        <Text
          variant={TextVariant.PRIMARY}
          color={TextColor.BLACK}
          size={TextSize.SM}
          fontWeight={TextFontWeight.BOLD}
          className={styles.message || ""}
        >
          {message}
        </Text>
        <Text
          variant={TextVariant.PRIMARY}
          color={TextColor.BLACK}
          size={TextSize.SM}
          fontWeight={TextFontWeight.BOLD}
          className={styles.percentage}
        >
          {displayProgress}
        </Text>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: progressBarWidth }} />
      </div>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
