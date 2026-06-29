import { create } from "zustand";

export type FontType = "sans-serif" | "serif" | "monospace" | "handwriting";
export type Font = {
  id: string;
  name: string;
  type: FontType;
};

export type SizeRatio = {
  name: string;
  value: number;
};

export type TypographyStep = {
  size: string;
  weight: number;
  lineHeight: number;
};

export type TypographyScale = {
  config: TypographyConfig;
  steps: TypographyStep[];
};

function calculateLineHeight(fontSize: number): number {
  if (fontSize <= 16) return 1.5;
  if (fontSize <= 24) return 1.4;
  if (fontSize <= 36) return 1.3;
  return 1.2;
}

export const unitNames = ["px", "rem"] as const;
export type Unit = (typeof unitNames)[number];

export function generateScale(
  config: TypographyConfig,
  unit: Unit = "px"
): TypographyScale {
  const { baseSize, ratio } = config;
  const result = [];
  const minSize = 14;

  for (let i = 6; i >= -1; i--) {
    const rawSize = baseSize * Math.pow(ratio, i);
    const size = Math.max(rawSize, minSize);
    const weight = i >= 5 ? 700 : i >= 3 ? 600 : i >= 1 ? 500 : 400;

    const sizeInUnit = unit === "rem" ? rawSize / baseSize : rawSize;

    result.push({
      size: `${Math.round(sizeInUnit * 100) / 100}${unit}`,
      lineHeight: calculateLineHeight(size),
      weight,
    });
  }

  return { config, steps: result };
}

export const ratios: SizeRatio[] = [
  {
    name: "Minor Second",
    value: 1.067,
  },
  {
    name: "Major Second",
    value: 1.125,
  },
  {
    name: "Minor Third",
    value: 1.2,
  },
  {
    name: "Major Third",
    value: 1.25,
  },
  {
    name: "Perfect Fourth",
    value: 1.333,
  },
  {
    name: "Augmented Fourth",
    value: 1.414,
  },
  {
    name: "Perfect Fifth",
    value: 1.5,
  },
  {
    name: "Golden Ratio",
    value: 1.618,
  },
];

export const fonts: Font[] = [
  {
    id: "inter",
    name: "Inter",
    type: "sans-serif",
  },
  {
    id: "geist",
    name: "Geist",
    type: "sans-serif",
  },
  {
    id: "geist-mono",
    name: "Geist Mono",
    type: "monospace",
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    type: "monospace",
  },
  {
    id: "manrope",
    name: "Manrope",
    type: "sans-serif",
  },
  {
    id: "dancing-script",
    name: "Dancing Script",
    type: "handwriting",
  },
];

export type TypographyConfig = {
  font: Font;
  ratio: number;
  baseSize: number;
};

type TypographyStore = {
  config: TypographyConfig;
  updateConfig: (config: Partial<TypographyConfig>) => void;
};

export const useTypographyStore = create<TypographyStore>((set) => ({
  config: {
    font: fonts[0],
    ratio: 1.2,
    baseSize: 16,
  },
  updateConfig: (config) =>
    set((state) => ({
      config: {
        ...state.config,
        ...config,
      },
    })),
}));
