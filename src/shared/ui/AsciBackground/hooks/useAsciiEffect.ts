import { useEffect, useRef, useCallback } from "react";
import { AsciiEngine } from "../lib/ascii";
import { CHARS, CONFIGS, COLORS } from "../model/constants";

export const useAsciiEffect = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  enableMouse: boolean
) => {
  const engineRef = useRef<AsciiEngine | null>(null);
  const rafRef = useRef<number>(0);

  const resize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set actual canvas size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Calculate font size (0.7vw equivalent)
    const fontSize = rect.width * 0.007;
    ctx.font = `100 ${fontSize}px "IBM Plex Mono", monospace`;
    ctx.textBaseline = "top";

    // Measure character dimensions
    const metrics = ctx.measureText("@");
    const charWidth = metrics.width;
    const charHeight = fontSize * 1.05; // line-height

    const w = Math.max(20, Math.floor(rect.width / charWidth));
    const h = Math.max(10, Math.floor(rect.height / charHeight));

    const config = CONFIGS.default;
    const chars = CHARS[config?.char ?? "standard"] ?? "";

    if (!engineRef.current) engineRef.current = new AsciiEngine();
    engineRef.current.setCanvas(ctx, charWidth, charHeight);
    engineRef.current.init(
      w,
      h,
      chars,
      config?.frames ?? 2000,
      config?.blur ?? 100
    );
  }, [canvasRef]);

  const animate = useCallback(() => {
    if (!engineRef.current) return;

    engineRef.current.update();
    engineRef.current.render(COLORS.default ?? null, "#ffffff");

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!engineRef.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      engineRef.current.setMouse(x, y);
    },
    [canvasRef]
  );

  const handleMouseLeave = useCallback(() => {
    engineRef.current?.clearMouse();
  }, []);

  useEffect(() => {
    resize();
    animate();

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resize, animate]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !enableMouse) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableMouse, handleMouseMove, handleMouseLeave, canvasRef]);
};
