# @brutalcomponent/react

[![npm version](https://badge.fury.io/js/%40brutalcomponent%2Freact.svg)](https://badge.fury.io/js/%40brutalcomponent%2Freact)

A collection of sharp, unapologetic React components for projects that make a statement.

## Core Concepts

-   **Brutal by Default:** Sharp edges, bold borders, and hard shadows are the standard, not the exception.
-   **Fully Typed:** Built with TypeScript from the ground up for a great developer experience.
-   **Accessible:** Keyboard navigation, ARIA attributes, and focus management are built-in.
-   **Tree-Shakeable:** Import only what you need. The library supports subpath imports for granular control.
-   **Flexible:** A core set of primitives (`Card`, `Button`) and feature-specific modules (`auth`, `blog`) to build what you want.

---

## Quick Start

### 1. Installation

```bash
npm install @brutalcomponent/react tailwindcss
```

### 2. Configure Tailwind CSS

Add the brutal preset to your `tailwind.config.ts`. This injects all the necessary fonts, colors, and shadow utilities.

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import brutalPreset from "@brutalcomponent/react/tailwind-preset";

const config: Config = {
  // Use the brutal preset
  presets: [brutalPreset],

  // Add paths to your files
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    // Make sure to include the library's components
    "./node_modules/@brutalcomponent/react/dist/**/*.{js,mjs}",
  ],
};

export default config;
```

<details>
<summary>Using CommonJS? (<code>tailwind.config.js</code>)</summary>

```js
const brutalPreset = require("@brutalcomponent/react/tailwind-preset");

module.exports = {
  presets: [brutalPreset],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/@brutalcomponent/react/dist/**/*.{js,mjs}",
  ],
};
```

</details>

### 3. Import Global Styles

Import the library's base styles into your main CSS file (e.g., `app/globals.css`). This file includes keyframe animations and utility classes.

```css
/* app/globals.css */
@import "@brutalcomponent/react/styles";
@import "tailwindcss";

/* Optional: Set a default brutal font for headings */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    @apply font-mono;
  }
}
```

---

## Basic Usage

Start building with the core components. They are designed to be composed together easily.

```tsx
import { Button, Card, Heading, Text } from "@brutalcomponent/react";

function MyBrutalApp() {
  return (
    <Card variant="raised" accent="pink">
      <Heading as="h1" skew="left">
        Brutal Design
      </Heading>
      <Text>
        This card uses the 'raised' variant with a 'pink' accent.
      </Text>
      <Button variant="primary" className="mt-4">
        Click Me
      </Button>
    </Card>
  );
}
```

## Advanced Usage & Imports

The library is structured for optimal tree-shaking. You can import from the root or use subpaths for specific modules.

```tsx
// Import core components (tree-shakeable)
import { Button, Card } from "@brutalcomponent/react";
import { Table } from "@brutalcomponent/react/core";

// Import from feature-specific modules
import { TOTPSetup } from "@brutalcomponent/react/auth";
import { BlogCard } from "@brutalcomponent/react/blog";
import { PrivacyPolicy } from "@brutalcomponent/react/legal";

// Import hooks and utilities
import { useClipboard } from "@brutalcomponent/react/hooks";
import { cn, formatDate } from "@brutalcomponent/react/utils";
```

## Icons

The library uses `react-icons` for flexibility. Pass the icon component directly as a prop.

```tsx
import { Button } from "@brutalcomponent/react";
import { FaRocket } from "react-icons/fa";

// Note: For some components, the API expects a render function,
// e.g., leftIcon={() => <FaRocket />}
<Button leftIcon={FaRocket}>Launch</Button>
```

## TypeScript

Full TypeScript support with exported types for all components and props.

```tsx
import type { ButtonProps, CardProps } from "@brutalcomponent/react";

const MyButton: React.FC<ButtonProps> = (props) => <Button {...props} />;
```

## License

MIT © David Heffler (https://dvh.sh)

