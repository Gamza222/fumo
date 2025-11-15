"use client";

import React from "react";
import styles from "./ErrorIcon.module.scss";
import { classNames } from "@/shared/lib/utils/classNames";

interface ErrorIconProps {
  size?: number;
  className?: string;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({
  size = 32,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={classNames(styles.ErrorIcon || "", {}, [className])}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3D Inset Border Effect */}
      <defs>
        {/* Light highlight for top-left */}
        <linearGradient
          id="borderHighlight"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Dark shadow for bottom-right */}
        <linearGradient id="borderShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Main red circle */}
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="#ff0000"
        stroke="url(#borderHighlight)"
        strokeWidth="1"
      />

      {/* Inset border effect */}
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="url(#borderShadow)"
        strokeWidth="1"
      />

      {/* White cross (X) */}
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
        {/* First diagonal line */}
        <line x1="10" y1="10" x2="22" y2="22" />
        {/* Second diagonal line */}
        <line x1="22" y1="10" x2="10" y2="22" />
      </g>
    </svg>
  );
};

export default ErrorIcon;
