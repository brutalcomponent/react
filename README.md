# @brutalcomponent/react

Brutalist React components

## Philosophy

-  **Brutal by default** - Sharp edges, bold borders, harsh shadows  
-  **Mobile first** - Every component works on phones  
-  **Accessible** - Proper ARIA labels, keyboard navigation  
-  **Tree-shakeable** - Import only what you need  
-  **TypeScript first** - Full type safety, great DX  
-  **Flexible** - Components, not layouts. Build what you want.

## Installation

npm install @brutalcomponent/react tailwindcss

## Setup

Add to your tailwind.config.(js|ts):

```ts
/* ESM (Tailwind v4, recommended) */
import brutalPreset from "@brutalcomponent/react/tailwind-preset";
/** @type {import('tailwindcss').Config} */
export default {
  presets: [brutalPreset],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/@brutalcomponent/react/dist/**/*.{js,mjs}"
  ]
};

/* CommonJS (if you need it) */
module.exports = {
  presets: [require("@brutalcomponent/react/tailwind-preset")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/@brutalcomponent/react/dist/**/*.{js,mjs}"
  ]
};
```

## File Structure

> This visual is incomplete, and it's purpose is to serve as an example.

```
@brutalcomponent/react/
├─ package.json
├─ tsconfig.json
├─ tsup.config.ts
├─ tailwind-preset.js
├─ README.md (you are HERE)
└─ src/
   ├─ index.ts
   │
   ├─ components/
   │  ├─ core/
   │  │  ├─ index.ts
   │  │  ├─ Text/
   │  │  │  ├─ Text.tsx
   │  │  │  └─ Heading.tsx
   │  │  ├─ Button/
   │  │  │  └─ Button.tsx
   │  │  └─ Modal/
   │  │     └─ Modal.tsx
   │  │
   │  ├─ motion/
   │  │  ├─ index.ts
   │  │  └─ MotionWrapper/
   │  │     └─ MotionWrapper.tsx
   │  │
   │  └─ patterns/
   │     ├─ index.ts
   │     └─ FilterControls/
   │        └─ FilterControls.tsx
   │
   ├─ modules/
   │  ├─ blog/
   │  │  ├─ index.ts
   │  │  └─ PostHeader/
   │  │     └─ PostHeader.tsx
   │  ├─ commerce/
   │  │  ├─ index.ts
   │  │  └─ ProductCard/
   │  │     └─ ProductCard.tsx
   │  └─ legal/
   │     ├─ index.ts
   │     └─ PrivacyPolicy/
   │        └─ PrivacyPolicy.tsx
   │
   ├─ hooks/
   │  ├─ index.ts
   │  └─ useClipboard.ts
   │
   ├─ providers/
   │  ├─ index.ts
   │  └─ ThemeProvider.tsx
   │
   ├─ utils/
   │  ├─ index.ts
   │  ├─ text.utils.ts
   │  └─ date.utils.ts
   │
   └─ types/
      ├─ index.ts
      └─ common.types.ts
```

## Basic Usage
```tsx
import { Button, Card, Heading } from "@brutalcomponent/react";

function App() {
  return (
    <Card variant="raised" accent="pink">
      <Heading as="h1" skew="left">
        Brutal Design
      </Heading>
      <Button variant="primary" brutal>
        Click Me
      </Button>
    </Card>
  );
}
```
## Tree-shaking and Subpath Imports
```tsx
// Core (root or core both tree-shakeable)
import { Button } from "@brutalcomponent/react";
import { Card } from "@brutalcomponent/react/core";

// Modules (use subpath imports)
import { BlogCard } from "@brutalcomponent/react/blog";
import { ProductCard } from "@brutalcomponent/react/commerce";
import { PrivacyPolicy } from "@brutalcomponent/react/legal";
```
## Hooks

-  useClipboard — Copy to clipboard with feedback
-  useClickOutside — Detect clicks outside element
-  useDebounce — Debounce values
-  useLocalStorage — Persist state to localStorage
-  useMediaQuery — Responsive media queries
-  useBreakpoint — Responsive breakpoint helpers
-  useKeyPress — Keyboard shortcut handling
-  useFocusTrap — Trap focus for modals

## Utilities

-  Text: slugify, truncate, capitalize, emphasizeText
-  Date: formatDate, formatRelativeTime, formatDuration, parseLooseDate, addDays
-  Validation: validateEmail, validatePhone, validatePassword, validateUsername
-  Format: formatCurrency, formatPhone, formatFileSize, formatNumber, formatPercentage, formatCreditCard
-  Tech: getTechIcon, normalizeTechName
-  Classnames: cn

## Theming

Monochrome core palette with soft pastel accents. Tokens are exposed via Tailwind preset (recommended).  
If you need raw CSS variables, the preset provides:
```css
--brutal-white, --brutal-black, --brutal-gray-50 … --brutal-gray-900  
--brutal-pink, --brutal-peach, --brutal-yellow, --brutal-mint, --brutal-sky, --brutal-lavender, --brutal-coral
```
## Icons

We use react-icons for flexibility:
```tsx
import { Button } from "@brutalcomponent/react";
import { FaRocket } from "react-icons/fa";

<Button leftIcon={FaRocket}>Launch</Button>;
```
## TypeScript

Full TypeScript support with exported types:
```tsx
import type { ButtonProps, CardProps } from "@brutalcomponent/react";
const MyButton: React.FC<ButtonProps> = (props) => <Button {...props} />;
```
## Accessibility

All components follow WCAG 2.1 guidelines:
-  Proper ARIA labels and roles
-  Keyboard navigation support
-  Focus trap for modals
-  Screen reader announcements
-  High contrast color ratios

## License

MIT © David Heffler (https://dvh.sh)


