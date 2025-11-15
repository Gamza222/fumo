import { HTMLAttributes } from "react";

export enum TextVariant {
  PRIMARY = "primary",
}

export enum TextAlign {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export enum TextSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
}
export enum TextColor {
  WHITE = "white",
  BLACK = "black",
  RED = "red",
}
export enum TextFontWeight {
  THIN = "thin",
  MEDIUM = "medium",
  BOLD = "bold",
}

type TextTag = "h1" | "h2" | "h3" | "p" | "span";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextTag;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  color?: TextColor;
  fontWeight?: TextFontWeight;
  className?: string | undefined;
}
