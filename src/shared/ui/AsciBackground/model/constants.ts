export const CHARS: Record<string, string> = {
  standard: " `10~10 1.0`",
};

export const CONFIGS: Record<
  string,
  { frames: number; blur: number; char: string }
> = {
  default: { frames: 2000, blur: 100, char: "standard" },
};

// No colors - all white
export const COLORS: Record<string, Record<string, string> | null> = {
  default: null,
};
