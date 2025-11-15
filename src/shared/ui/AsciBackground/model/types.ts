export type AsciiEffect =
  | "liquid"
  | "electric"
  | "lava"
  | "water"
  | "love"
  | "burn"
  | "hypnosis"
  | "forest"
  | "earth";

export interface AsciiBackgroundProps {
  effect?: AsciiEffect;
  enableMouse?: boolean;
  className?: string;
}
