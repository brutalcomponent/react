/**
 * @file tsup.config.ts (or tsup.config.mts / tsup.config.js)
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Build configuration for @brutalcomponent/react
 * - Builds root entry and all sub-barrels (core, motion, patterns, hooks, providers, utils, types)
 * - Builds modules/* barrels (auth, blog, commerce, editor, legal)
 * - Emits CJS + ESM + d.ts with splitting
 */

import { defineConfig } from "tsup";

export default defineConfig({
    entry: [
        // Root entry
        "src/index.ts",

        // Core and shared component barrels
        "src/components/core/index.ts",
        "src/components/motion/index.ts",
        "src/components/patterns/index.ts",

        // Hooks, providers, utils, types
        "src/hooks/index.ts",
        "src/providers/index.ts",
        "src/utils/index.ts",
        "src/types/index.ts",

        // Module barrels (feature areas moved to src/modules)
        "src/modules/auth/index.ts",
        "src/modules/blog/index.ts",
        "src/modules/commerce/index.ts",
        "src/modules/editor/index.ts",
        "src/modules/legal/index.ts",
    ],
    format: ["cjs", "esm"],
    dts: {
        resolve: true,
    },
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    target: "es2020",
    // Ensure peers stay external to avoid bundling userland deps
    external: [
        "react",
        "react-dom",
        "react-icons",
        // Optional/peer libs your components conditionally use
        "motion/react",
        "recharts",
        "@catppuccin/palette",
    ],
    esbuildOptions(options) {
        options.banner = {
            js: [
                "/**",
                " * @brutalcomponent/react",
                " * (c) David Heffler (https://dvh.sh)",
                " * Licensed under MIT",
                " */",
            ].join("\n"),
        };
    },
});
