"use client";

import { memo, ReactNode, useMemo } from "react";

//styles
import styles from "./Window.module.scss";
import { classNames } from "@/shared/lib/utils/classNames";
import { Mods } from "@/shared/lib/utils/classNames/classNames";
import { Text, TextSize, TextVariant } from "../Text";
import { TextColor, TextFontWeight } from "../Text/Text.types";
import { Button, ButtonSize, ButtonVariant } from "../Button";

interface WindowProps {
  title?: string;
  showTitleBar?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  children: ReactNode;
}

export const Window = memo<WindowProps>((props) => {
  const {
    title,
    showTitleBar,
    showCloseButton = false,
    onClose,
    className,
    children,
  } = props;

  // Determine if title bar should be shown
  const shouldShowTitleBar = useMemo(
    () => showTitleBar ?? Boolean(title),
    [showTitleBar, title]
  );

  const windowMods: Mods = {
    [styles.closeButtonHidden || ""]: !showCloseButton,
    [styles.titleBarHidden || ""]: !shouldShowTitleBar,
  };
  return (
    <div
      className={classNames(styles.window || "", { ...windowMods }, [
        className,
      ])}
    >
      <div className={styles.titleBar || ""}>
        <Text
          size={TextSize.SM}
          color={TextColor.WHITE}
          variant={TextVariant.PRIMARY}
          fontWeight={TextFontWeight.BOLD}
          className={styles.title}
        >
          {title}
        </Text>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SM}
          className={styles.closeButton || ""}
          onClick={onClose}
          aria-label="Close window"
          type="button"
        >
          ×
        </Button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
});

Window.displayName = "Window";
