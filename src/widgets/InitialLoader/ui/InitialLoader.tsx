"use client";

import { memo, useMemo } from "react";

// Widget-specific logic
import { useFadeAnimation, formatStepName } from "../lib/lib";

// Widget-specific loading adapter
import { useInitialLoaderLoading } from "../lib/loadingAdapter";

// Shared utilities
import { classNames } from "@/shared/lib/utils/classNames";
import { Mods } from "@/shared/lib/utils/classNames/classNames";

// Styles
import styles from "./InitialLoader.module.scss";

// Components
import { Window } from "@/shared/ui/Window";
import { ProgressBar } from "@/widgets/ProgressBar";
import { LoadingError } from "./LoadingError/LoadingError";

export interface InitialLoaderProps {
  className?: string;
  loadingMessage?: string;
  showProgress?: boolean;
  animationTimeout?: number;
}

export const InitialLoader = memo<InitialLoaderProps>(
  ({
    className,
    loadingMessage,
    showProgress = true,
    animationTimeout = 400,
  }) => {
    // Use loading adapter for minimal interface
    const loadingState = useInitialLoaderLoading();

    const { isFadingOut, isVisible, handleAnimationEnd } = useFadeAnimation({
      isOverallLoading: loadingState.isOverallLoading || false,
      timeoutMs: animationTimeout,
    });

    // const isFadingOut = false;
    // const isVisible = true;
    // const handleAnimationEnd = () => {
    //   return;
    // };

    // Simple business logic
    const displayMessage = useMemo(
      () =>
        loadingMessage ||
        (loadingState.progress >= 100
          ? "Ready!"
          : formatStepName(loadingState.currentStep)),
      [loadingMessage, loadingState.progress, loadingState.currentStep]
    );

    if (loadingState.shouldSkipLoader) return null;
    if (!isVisible) return null;

    // Your Mods logic preserved
    const initialLoaderMods: Mods = {
      [styles.fadeOut || ""]: isFadingOut,
    };

    return (
      <div
        className={classNames(
          styles.initialLoader || "",
          { ...initialLoaderMods },
          [className]
        )}
        role="progressbar"
        aria-valuenow={loadingState.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading application"
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.overlay} />
        <div className={styles.content}>
          <Window
            className={styles.loadingWindow}
            title="Fumo loading window"
            showCloseButton
          >
            {loadingState.hasError ? (
              <LoadingError
                className={styles.loadingError}
                errorMessage={loadingState.errorMessage || ""}
                handleRetry={loadingState.restart}
              />
            ) : (
              <ProgressBar
                progress={loadingState.progress}
                message={displayMessage}
                showPercentage={showProgress}
              />
            )}
          </Window>
        </div>
      </div>
    );
  }
);

InitialLoader.displayName = "InitialLoader";
