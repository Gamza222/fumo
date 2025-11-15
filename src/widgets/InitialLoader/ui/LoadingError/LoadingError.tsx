"use client";

import { memo } from "react";
import styles from "./LoadingError.module.scss";
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button";
import { Error } from "@/shared/ui/Error";
import { classNames } from "@/shared/lib/utils/classNames";

interface LoadingErrorProps {
  errorMessage: string;
  handleRetry: () => void;
  className?: string;
}

export const LoadingError = memo((props: LoadingErrorProps) => {
  const { errorMessage, handleRetry, className } = props;

  return (
    <div className={classNames(styles.loadingError || "", {}, [className])}>
      <Error errorMessage={errorMessage} />
      <Button
        size={ButtonSize.SM}
        variant={ButtonVariant.SECONDARY}
        className={styles.retryButton}
        onClick={handleRetry}
      >
        Try again
      </Button>
    </div>
  );
});

LoadingError.displayName = "LoadingError";
