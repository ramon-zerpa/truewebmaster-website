/** Art direction. Changes apply to both locales and all renderer tiers. */
export const heroFlowConfig = {
  speed: 0.16,
  warpStrength: 0.8,
  bandSoftness: 0.36,
  contrast: 1.15,
  opacity: 0.94,
  blurAmount: 0.65,
  highlightIntensity: 0.62,
  pointerStrength: 0.13,
  pointerRadius: 0.38,
  edgeDepth: 0.72,
  calmZoneStrength: 0.86,
  grainAmount: 0.012,
  animationScale: 1.1,
  palette: {
    base: "#111a27",
    shadow: "#092d38",
    teal: "#125c74",
    cyan: "#17a2b8",
    highlight: "#b8d9dd",
  },
  maxDpr: 1.25,
  maxPixels: 720_000,
  fps: 30,
  mobileFps: 24,
  fallbackFps: 18,
};
export type FlowConfig = typeof heroFlowConfig;
