/**
 * @file src/providers/ThemeProvider.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Theme provider for brutal component library with multiple theme support
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BrutalTheme {
  name: string;
  label: string;
  colors: {
    // Base colors
    white: string;
    black: string;
    // Gray scale
    gray: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    // Accent colors
    accent: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
    };
    // Semantic
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  shadows: {
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const brutalThemes: Record<string, BrutalTheme> = {
  // Default monochrome + pastels
  default: {
    name: "default",
    label: "Default",
    colors: {
      white: "#FFFFFF",
      black: "#000000",
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
      accent: {
        primary: "#FFD6E8", // pink
        secondary: "#D6EDFF", // sky
        tertiary: "#D6FFE5", // mint
        quaternary: "#FFE5D6", // peach
      },
      success: "#D6FFE5",
      warning: "#FFF3D6",
      danger: "#FFD6D6",
      info: "#D6EDFF",
    },
    shadows: {
      sm: "2px 2px 0px 0px rgba(0,0,0,1)",
      base: "4px 4px 0px 0px rgba(0,0,0,1)",
      md: "6px 6px 0px 0px rgba(0,0,0,1)",
      lg: "8px 8px 0px 0px rgba(0,0,0,1)",
      xl: "12px 12px 0px 0px rgba(0,0,0,1)",
    },
  },

  // Dark mode
  dark: {
    name: "dark",
    label: "Dark",
    colors: {
      white: "#000000",
      black: "#FFFFFF",
      gray: {
        50: "#171717",
        100: "#262626",
        200: "#404040",
        300: "#525252",
        400: "#737373",
        500: "#A3A3A3",
        600: "#D4D4D4",
        700: "#E5E5E5",
        800: "#F5F5F5",
        900: "#FAFAFA",
      },
      accent: {
        primary: "#FF69B4", // hot pink
        secondary: "#00CED1", // dark turquoise
        tertiary: "#32CD32", // lime green
        quaternary: "#FF6347", // tomato
      },
      success: "#32CD32",
      warning: "#FFD700",
      danger: "#DC143C",
      info: "#1E90FF",
    },
    shadows: {
      sm: "2px 2px 0px 0px rgba(255,255,255,1)",
      base: "4px 4px 0px 0px rgba(255,255,255,1)",
      md: "6px 6px 0px 0px rgba(255,255,255,1)",
      lg: "8px 8px 0px 0px rgba(255,255,255,1)",
      xl: "12px 12px 0px 0px rgba(255,255,255,1)",
    },
  },

  // High contrast
  contrast: {
    name: "contrast",
    label: "High Contrast",
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        50: "#FFFFFF",
        100: "#F0F0F0",
        200: "#CCCCCC",
        300: "#999999",
        400: "#666666",
        500: "#333333",
        600: "#1A1A1A",
        700: "#0D0D0D",
        800: "#050505",
        900: "#000000",
      },
      accent: {
        primary: "#FF0000", // pure red
        secondary: "#0000FF", // pure blue
        tertiary: "#00FF00", // pure green
        quaternary: "#FFFF00", // pure yellow
      },
      success: "#00FF00",
      warning: "#FFFF00",
      danger: "#FF0000",
      info: "#0000FF",
    },
    shadows: {
      sm: "3px 3px 0px 0px rgba(0,0,0,1)",
      base: "5px 5px 0px 0px rgba(0,0,0,1)",
      md: "7px 7px 0px 0px rgba(0,0,0,1)",
      lg: "10px 10px 0px 0px rgba(0,0,0,1)",
      xl: "15px 15px 0px 0px rgba(0,0,0,1)",
    },
  },

  // Neon
  neon: {
    name: "neon",
    label: "Neon",
    colors: {
      white: "#0A0A0A",
      black: "#FFFFFF",
      gray: {
        50: "#1A1A1A",
        100: "#2A2A2A",
        200: "#3A3A3A",
        300: "#4A4A4A",
        400: "#5A5A5A",
        500: "#7A7A7A",
        600: "#9A9A9A",
        700: "#BABABA",
        800: "#DADADA",
        900: "#FAFAFA",
      },
      accent: {
        primary: "#FF00FF", // magenta
        secondary: "#00FFFF", // cyan
        tertiary: "#FFFF00", // yellow
        quaternary: "#FF00AA", // pink
      },
      success: "#00FF88",
      warning: "#FFAA00",
      danger: "#FF0055",
      info: "#00AAFF",
    },
    shadows: {
      sm: "2px 2px 0px 0px rgba(255,0,255,0.8)",
      base: "4px 4px 0px 0px rgba(255,0,255,0.8)",
      md: "6px 6px 0px 0px rgba(255,0,255,0.8)",
      lg: "8px 8px 0px 0px rgba(255,0,255,0.8)",
      xl: "12px 12px 0px 0px rgba(255,0,255,0.8)",
    },
  },

  // Newspaper
  paper: {
    name: "paper",
    label: "Newspaper",
    colors: {
      white: "#FFF9E6",
      black: "#1A1611",
      gray: {
        50: "#FFF9E6",
        100: "#F7F1DC",
        200: "#E8DFC8",
        300: "#D4C8AA",
        400: "#B8A887",
        500: "#8B7B61",
        600: "#5F5343",
        700: "#3D352B",
        800: "#2B251D",
        900: "#1A1611",
      },
      accent: {
        primary: "#B8A887", // sepia
        secondary: "#8B4513", // saddle brown
        tertiary: "#2F4F4F", // dark slate gray
        quaternary: "#800020", // burgundy
      },
      success: "#556B2F",
      warning: "#DAA520",
      danger: "#8B0000",
      info: "#483D8B",
    },
    shadows: {
      sm: "2px 2px 0px 0px rgba(26,22,17,0.8)",
      base: "4px 4px 0px 0px rgba(26,22,17,0.8)",
      md: "6px 6px 0px 0px rgba(26,22,17,0.8)",
      lg: "8px 8px 0px 0px rgba(26,22,17,0.8)",
      xl: "12px 12px 0px 0px rgba(26,22,17,0.8)",
    },
  },
};

interface ThemeContextValue {
  theme: BrutalTheme;
  themeName: string;
  setTheme: (themeName: string) => void;
  accentColor: keyof BrutalTheme["colors"]["accent"];
  setAccentColor: (color: keyof BrutalTheme["colors"]["accent"]) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

/**
 * @component ThemeProvider
 * @description Provider for brutal theme management
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "default",
  storageKey = "brutal-theme",
}) => {
  const [themeName, setThemeName] = useState(defaultTheme);
  const [accentColor, setAccentColor] =
    useState<keyof BrutalTheme["colors"]["accent"]>("primary");
  const [mounted, setMounted] = useState(false);

  const theme = brutalThemes[themeName] || brutalThemes.default;

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem(storageKey);
    const savedAccent = localStorage.getItem(
      `${storageKey}-accent`,
    ) as keyof BrutalTheme["colors"]["accent"];

    if (savedTheme && brutalThemes[savedTheme]) {
      setThemeName(savedTheme);
    }

    if (
      savedAccent &&
      ["primary", "secondary", "tertiary", "quaternary"].includes(savedAccent)
    ) {
      setAccentColor(savedAccent);
    }

    setMounted(true);
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to CSS variables
    const root = document.documentElement;

    // Base colors
    root.style.setProperty("--brutal-white", theme.colors.white);
    root.style.setProperty("--brutal-black", theme.colors.black);

    // Gray scale
    Object.entries(theme.colors.gray).forEach(([key, value]) => {
      root.style.setProperty(`--brutal-gray-${key}`, value);
    });

    // Accent colors
    Object.entries(theme.colors.accent).forEach(([key, value]) => {
      root.style.setProperty(`--brutal-accent-${key}`, value);
    });

    // Current accent
    root.style.setProperty("--brutal-accent", theme.colors.accent[accentColor]);

    // Semantic colors
    root.style.setProperty("--brutal-success", theme.colors.success);
    root.style.setProperty("--brutal-warning", theme.colors.warning);
    root.style.setProperty("--brutal-danger", theme.colors.danger);
    root.style.setProperty("--brutal-info", theme.colors.info);

    // Shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--brutal-shadow-${key}`, value);
    });

    // Save to localStorage
    localStorage.setItem(storageKey, themeName);
    localStorage.setItem(`${storageKey}-accent`, accentColor);
  }, [theme, themeName, accentColor, mounted, storageKey]);

  const handleSetTheme = (newThemeName: string) => {
    if (brutalThemes[newThemeName]) {
      setThemeName(newThemeName);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme: handleSetTheme,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
