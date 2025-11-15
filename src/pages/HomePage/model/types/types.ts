// pages/HomePage/types/types.ts
export interface HomePageAnimationConfig {
  delay?: number;
  duration?: number;
  easing?: string;
}

export interface HomePageProps {
  className?: string;
  animationConfig?: HomePageAnimationConfig;
  showWelcome?: boolean;
}
