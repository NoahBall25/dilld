---
name: Brine Shock
colors:
  surface: '#f1fde7'
  surface-dim: '#d1dec8'
  surface-bright: '#f1fde7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf8e1'
  surface-container: '#e5f2db'
  surface-container-high: '#dfecd6'
  surface-container-highest: '#dae6d0'
  on-surface: '#141e11'
  on-surface-variant: '#454837'
  inverse-surface: '#293324'
  inverse-on-surface: '#e8f5de'
  outline: '#767965'
  outline-variant: '#c6c8b2'
  surface-tint: '#526600'
  primary: '#526600'
  on-primary: '#ffffff'
  primary-container: '#c2e05a'
  on-primary-container: '#4f6200'
  inverse-primary: '#b5d24e'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fddb54'
  on-secondary-container: '#735f00'
  tertiary: '#49663c'
  on-tertiary: '#ffffff'
  tertiary-container: '#bcdeaa'
  on-tertiary-container: '#45633a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1ef67'
  primary-fixed-dim: '#b5d24e'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4c00'
  secondary-fixed: '#ffe16f'
  secondary-fixed-dim: '#e5c53f'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#caedb8'
  tertiary-fixed-dim: '#aed09d'
  on-tertiary-fixed: '#062102'
  on-tertiary-fixed-variant: '#324e27'
  background: '#f1fde7'
  on-background: '#141e11'
  surface-variant: '#dae6d0'
typography:
  display-hero:
    fontFamily: Luckiest Guy
    fontSize: 84px
    fontWeight: '400'
    lineHeight: 84px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  label-lg:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels an unapologetic collision between gas station refrigerator chaos and high-energy streetwear drops. It targets adventurous Gen Z/Millennial consumers who appreciate internet irony, extreme flavors, and loud visual identities. The experience evokes curiosity, sensory shock, and a "dare-you-to-try-it" bravado.

The aesthetic leans heavily into **High-Contrast Neo-Brutalist Pop**:
- Massive, condensed headline scales commanding maximum canvas attention.
- Playful tactile elements: tilted sticker badges, barcode aesthetics, and stark offset box shadows.
- Loud, acidic color clashing against deep brine shadows to simulate cold, electric hydration.

## Colors

The palette leverages a light-first environment anchored in clean daylight, punctuated by radioactive greens and brine yellows.

- **Primary (`#C2E05A` - Acid Lime):** Main visual driver. Used for primary CTA buttons, high-priority status indicators, and marquee text.
- **Secondary (`#F2D14B` - Brine Neon Yellow):** Highlighting accents, strike-through deals, discount callouts, and secondary action targets.
- **Tertiary (`#18330F` - Deep Pickle Green):** Mid-tone surface containers, card backings, and structured module borders that anchor the light canvas.
- **Neutral Base (`#0D170A` - Charcoal Brine):** Primary dark text and heavy typography drop elements.
- **Neutral Accent (`#FAF9F5` - Crisp Off-White):** High-readability copy, crisp borders, and inverted stickers.

## Typography

Typography delivers aggressive visual contrast:
- **Display & Headlines:** Set in `Luckiest Guy`. Strict uppercase rendering across headers, section callouts, and product names creates an in-your-face, posterized presence.
- **Body & Labels:** Set in `Poppins`. Balances high-energy editorial boldness with clean, contemporary legibility suited for ingredient profiles, nutritional callouts, and checkout systems.

## Layout & Spacing

The layout is built on a 12-column fluid grid system that consolidates to 6 columns on tablet and 4 columns on mobile devices:
- **Desktop (1024px+):** 12 columns with `margin: 2rem` and `gutter: 1.5rem`.
- **Tablet (768px - 1023px):** 6 columns with `margin: 1.5rem` and `gutter: 1.25rem`.
- **Mobile (<768px):** 4 columns with `margin: 1rem` and `gutter: 1rem`.

Rhythm is fast and compact. Spacing prioritizes tight-packed shelf displays mimicking convenience-store coolers, utilizing `space-md` for standard card interiors and `space-xl` between sections to allow massive display typography to breathe.

## Elevation & Depth

Depth is established through hard-edge, directional neo-brutalist offset shadows rather than soft atmospheric blurs:

- **Surface Levels:** 
  - Canvas base: `#FAF9F5`.
  - Elevated containers & shelves: `#18330F` with crisp 1px borders in `#C2E05A` at 20% opacity.
- **Shadow Profile:**
  - **Flat / Interactive Default:** `3px 3px 0px #0D170A`.
  - **Elevated Cards / Floating Badges:** `6px 6px 0px #0D170A`.
  - **Active / Pressed:** `0px 0px 0px #0D170A` with a simultaneous `translate(3px, 3px)` for an immediate tactile click.
- **Overlay Panels & Cart Drawer:** High-contrast solid borders (2px solid `#C2E05A`) backed by solid `#0D170A` to ensure legibility against busy backgrounds.

## Shapes

The shape system blends heavy organic curves with industrial cuts:
- Standard interactive elements, input fields, and product cards utilize Level 2 roundedness (`0.5rem` / `8px` base, `1rem` / `16px` for containers).
- Badges, price pills, and flavor chips break standard rules to embrace full cylindrical pills (`9999px`) to evoke retail refrigerator stickers.
- Select floating graphic assets utilize a -2deg to +4deg rotational offset to simulate slapped-on physical decals.

## Components

### Buttons
- **Primary Button:** Acid Lime (`#C2E05A`) solid fill, text in `#0D170A` using `label-lg` uppercase. Heavy 2px solid `#0D170A` border with a `3px 3px 0px #0D170A` hard drop shadow. Transitions to flat on press.
- **Secondary Button:** Brine Neon Yellow (`#F2D14B`) background with identical border and shadow styling.
- **Ghost / Utility:** Transparent fill, Charcoal Brine (`#0D170A`) 1.5px border, dark uppercase text.

### Badges & Stickers
- Rendered as chunky pills or canted rectangles (-3deg skew).
- Uses neon fills (`#F2D14B` or `#C2E05A`) with dark bold micro-copy (`label-sm`).
- Used for sodium content callouts, limited drop notifications, and sour rating scales.

### Product Cards
- Background: `#18330F`.
- Border: 2px solid `#C2E05A` (or `#0D170A` at 15% opacity for standard variants).
- Radius: `1rem` (`rounded-lg`).
- Shadow: `6px 6px 0px #0D170A`.
- Imagery: Product cans float centered with harsh drop shadows behind the can silhouette.
- Footer: Contains flavor profile tags, price display, and an immediate full-width primary button.

### Form Inputs & Checkboxes
- **Inputs:** `#FAF9F5` fill, 2px border in `#0D170A` (focus state transitions to `#C2E05A` with a 2px outer glow). Placeholder text in muted dark tones.
- **Checkboxes:** Square with `0.25rem` radius, thick 2px borders. Checked state fills with `#C2E05A` featuring a chunky `#0D170A` checkmark.

### Pack Pickers & Flavor Toggles
- Segmented pill controls. Unselected state rests in muted `#18330F`; active state flips to solid `#C2E05A` with high-contrast black typography.