import { HTMLAttributes } from 'react';

export enum TextVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TextSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextTag;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  className?: string | undefined;
}
