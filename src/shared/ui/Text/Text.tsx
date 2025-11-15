"use client";

import React from "react";
import styles from "./Text.module.scss";
import {
  TextProps,
  TextVariant,
  TextAlign,
  TextSize,
  TextColor,
  TextFontWeight,
} from "./Text.types";
import { cva } from "@/shared/lib/utils/cva/cva";
import { classNames } from "@/shared/lib/utils/classNames/classNames";

const textVariants = cva({
  base: styles.text || "",
  variants: {
    variant: {
      [TextVariant.PRIMARY]: styles.primary || "",
    },
    align: {
      [TextAlign.LEFT]: styles.left || "",
      [TextAlign.CENTER]: styles.center || "",
      [TextAlign.RIGHT]: styles.right || "",
    },
    size: {
      [TextSize.SM]: styles.sm || "",
      [TextSize.MD]: styles.md || "",
      [TextSize.LG]: styles.lg || "",
    },
    color: {
      [TextColor.WHITE]: styles.white || "",
      [TextColor.BLACK]: styles.black || "",
      [TextColor.RED]: styles.red || "",
    },
    fontWeight: {
      [TextFontWeight.THIN]: styles.thin || "",
      [TextFontWeight.MEDIUM]: styles.medium || "",
      [TextFontWeight.BOLD]: styles.bold || "",
    },
  },
  defaultVariants: {
    variant: TextVariant.PRIMARY,
    align: TextAlign.LEFT,
    size: TextSize.SM,
  },
});

export const Text: React.FC<TextProps> = ({
  as: Component = "p",
  variant = TextVariant.PRIMARY,
  align = TextAlign.LEFT,
  size = TextSize.SM,
  color = TextColor.WHITE,
  fontWeight = TextFontWeight.BOLD,
  children,
  className,
  ...props
}) => {
  const classes = classNames(
    textVariants({
      variant,
      align,
      size,
      color,
      fontWeight,
    }).join(" "),
    {},
    [className]
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
