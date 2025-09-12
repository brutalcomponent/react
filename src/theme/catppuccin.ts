/**
 * @file src/theme/catppuccin.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Optional Catppuccin integration - only loaded if explicitly imported
 */
export const loadCatppuccin = async (flavor: string = "mocha") => {
  try {
    const { flavors } = await import("@catppuccin/palette");
    const selectedFlavor = flavors[flavor as keyof typeof flavors];

    if (!selectedFlavor) {
      console.warn(`Catppuccin flavor "${flavor}" not found`);
      return null;
    }

    // Map to our theme structure
    return {
      colors: {
        background: selectedFlavor.colors.base.hex,
        foreground: selectedFlavor.colors.text.hex,
        surface: {
          base: selectedFlavor.colors.base.hex,
          raised: selectedFlavor.colors.surface0.hex,
          sunken: selectedFlavor.colors.surface1.hex,
          overlay: selectedFlavor.colors.surface2.hex,
        },
        text: {
          primary: selectedFlavor.colors.text.hex,
          secondary: selectedFlavor.colors.subtext0.hex,
          muted: selectedFlavor.colors.subtext1.hex,
          disabled: selectedFlavor.colors.overlay0.hex,
        },
        accent: {
          primary: selectedFlavor.colors.pink.hex,
          secondary: selectedFlavor.colors.blue.hex,
          tertiary: selectedFlavor.colors.green.hex,
        },
        success: selectedFlavor.colors.green.hex,
        warning: selectedFlavor.colors.yellow.hex,
        danger: selectedFlavor.colors.red.hex,
        info: selectedFlavor.colors.blue.hex,
      },
    };
  } catch (error) {
    console.error("Failed to load Catppuccin:", error);
    return null;
  }
};
