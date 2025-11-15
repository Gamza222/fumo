"use client";

import { memo } from "react";
import styles from "./Error.module.scss";
import { Text, TextSize } from "@/shared/ui/Text";
import { TextColor, TextVariant } from "@/shared/ui/Text/Text.types";
import { ErrorIcon } from "../ErrorIcon";
import { classNames } from "@/shared/lib/utils/classNames";

interface ErrorProps {
  errorMessage: string;
  className?: string;
}

export const Error = memo((props: ErrorProps) => {
  const { errorMessage, className } = props;

  return (
    <div className={classNames(styles.Error || "", {}, [className])}>
      <ErrorIcon size={32} className={styles.errorIcon} />
      <Text
        size={TextSize.SM}
        className={styles.errorMessage}
        color={TextColor.BLACK}
        variant={TextVariant.PRIMARY}
      >
        {errorMessage}
      </Text>
    </div>
  );
});

Error.displayName = "Error";
