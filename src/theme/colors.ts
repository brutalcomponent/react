/**
 * @file src/theme/colors.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal monochrome palette with soft pastel accents
 */
export const brutalColors = {
  // Monochrome base
  white: "#FFFFFF",
  black: "#000000",

  // Grays (true neutral)
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // Soft pastel accents
  pastel: {
    pink: "#FFD6E8", // Soft pink
    peach: "#FFE5D6", // Soft peach
    yellow: "#FFF3D6", // Soft yellow
    mint: "#D6FFE5", // Soft mint
    sky: "#D6EDFF", // Soft sky blue
    lavender: "#E8D6FF", // Soft lavender
    coral: "#FFD6D6", // Soft coral
  },

  // Semantic colors (pastels)
  semantic: {
    success: "#D6FFE5", // Soft mint
    warning: "#FFF3D6", // Soft yellow
    danger: "#FFD6D6", // Soft coral
    info: "#D6EDFF", // Soft sky
  },
};

export const defaultTheme = {
  colors: {
    // Core colors
    background: brutalColors.white,
    foreground: brutalColors.black,

    // Surface levels
    surface: {
      base: brutalColors.white,
      raised: brutalColors.gray[50],
      sunken: brutalColors.gray[100],
      overlay: brutalColors.gray[200],
    },

    // Text colors
    text: {
      primary: brutalColors.black,
      secondary: brutalColors.gray[700],
      muted: brutalColors.gray[500],
      disabled: brutalColors.gray[400],
    },

    // Accent colors (customizable)
    accent: {
      primary: brutalColors.pastel.pink,
      secondary: brutalColors.pastel.sky,
      tertiary: brutalColors.pastel.mint,
    },

    // Semantic
    ...brutalColors.semantic,
  },

  // Brutal specific tokens
  shadows: {
    brutal: "4px 4px 0px 0px rgba(0,0,0,1)",
    brutalHover: "6px 6px 0px 0px rgba(0,0,0,1)",
    brutalActive: "2px 2px 0px 0px rgba(0,0,0,1)",
    brutalXl: "8px 8px 0px 0px rgba(0,0,0,1)",
  },

  borders: {
    thin: "2px solid",
    medium: "3px solid",
    thick: "4px solid",
    brutal: "4px solid #000000",
  },

  transforms: {
    skewSm: "skewX(-2deg)",
    skewMd: "skewX(-4deg)",
    skewLg: "skewX(-6deg)",
    rotateSm: "rotate(-1deg)",
    rotateMd: "rotate(-2deg)",
    rotateLg: "rotate(-3deg)",
  },
};
