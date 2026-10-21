# Project Design Language

## 1. Design System Overview
The **Documentation Native** design language (derived from the Drizzle ORM design system) establishes an engineering-first, high-density utilitarian aesthetic tailored for technical products, developer platforms, and data-intensive interfaces. It deliberately eschews marketing fluff, saturated brand gradients, and ornamental graphic devices in favor of structural clarity, information density, and typographical precision.

- **Aesthetic Movement:** High-Density Utilitarian Minimalism / Engineering-Grade Specification.
- **Achromatic Discipline:** The visual surface runs almost entirely on a cool charcoal-to-white gray ladder. The system possesses **no declared primary brand color** in its custom properties; its identity is defined by visual restraint, stark contrast, and precision alignment.
- **Atmosphere & Density:** Reads like an impeccably formatted interactive technical specification or documentation workspace rather than a conventional marketing portal. High text density, small label tiers, and hairline-partitioned data grids dominate the visual hierarchy.
- **Intended Experience:** Communicates uncompromising technical authenticity and reliability. Users evaluate data, code snippets, and structural findings without decorative friction.

---

## 2. Design Principles

1. **Achromatic Restraint as Brand Identity:**  
   Color saturation is withheld by design. The interface relies on a multi-tiered gray scale (`#0a0a0a` to `#ffffff`) rather than loud brand accents, directing complete focus to data structures, code syntax, and documentation.
2. **Platform & System Authenticity:**  
   Avoid heavy web fonts. The interface leverages the platform's native `system-ui` stack for prose and two distinct monospace font tiers (`Menlo` at 9.75px and system monospace at 12px) for technical markers, integrating seamlessly into developer and workstation operating systems.
3. **Planar Boundary Hierarchy:**  
   Avoid faux depth, skeuomorphic bevels, or deep drop shadows. Separation is achieved through crisp 1px hairline borders (`#cfd9de` / `#e8e8e8`) flush against the `#ffffff` canvas.
4. **Information Density & Label Dominance:**  
   Prioritize compact information over excessive vertical whitespace. The workhorse typography level is `label-sm` (12px / 500 weight), allowing dense navigation trees, benchmark panels, and data tables to remain compact and readable.
5. **Functional Chromatic Signaling:**  
   Cobalt blue (`#006be6`) is the sole chromatic accent, strictly reserved for external reference links and anchor navigation. It is never used as a generic button fill or surface tint.

---

## 3. Visual Identity

- **Canvas & Surface Character:** Pure white `#ffffff` canvas with recessed utility items using `#e8e8e8` (Surface-1). Cards, tables, and sidebars sit flush on the canvas without elevation, bounded by 1px hairline strokes.
- **Shape Language:** Strictly 8px-dominant (`rounded-lg`) for structural containers, buttons, panels, and input fields. Inline code annotations and micro-syntax tags utilize a tight 2px radius (`rounded-xxs`) to avoid disrupting body text line boxes. Modals use 12px (`rounded-xl`), and avatar elements use 50% (`rounded-full`).
- **Contrast & Hierarchy:** High-contrast text rendering featuring dark charcoal ink (`#0a0a0a` / `#222222`) against white surfaces, balanced by muted slate text (`#444444`, `#71767b`, `#909090`) for secondary metadata and disabled states.

---

## 4. Color System

### 4.1 Structural & Ink Palette

| Token | Hex Value | Role | Usage | Observed On |
|---|---|---|---|---|
| `color.ink-dark` | `#0a0a0a` | Deepest Ink | Primary CTA button fills, tightest headline weight, checked states | Primary buttons, hero titles |
| `color.ink-primary` | `#222222` | Primary Text | Standard display headings, primary body headers, editor text | Section headings, card headers, code editor |
| `color.ink-mid` | `#282b3b` | Structural Dark Gray | Sidebar tree navigation, documentation body copy | Sidebar items, directory file trees |
| `color.ink-muted` | `#444444` | Secondary Text | Workhorse body paragraph copy, code punctuation, neutral borders | Body copy, table subtext |
| `color.ink-secondary` | `#4b5563` | Tertiary Text | Metadata labels, timestamp markers, footer subtext | Captions, card metadata |
| `color.ink-tertiary` | `#71767b` | Muted Ink | Secondary timestamps, contributor handles, minor labels | Card footers, version tags |
| `color.ink-faint` | `#909090` | Disabled / Placeholder | Form input placeholders, disabled buttons, inactive markers | Search input placeholder |
| `color.canvas` | `#ffffff` | Base Floor / Surface | Primary page background, card surfaces, dialog backgrounds | Page floor, card interiors |
| `color.surface-1` | `#e8e8e8` | Recessed Utility Surface | Search box background, release badge background, light borders | Code chip fills, release badges |
| `color.surface-muted` | `#808080` | Mid-Tone Surface | Secondary chart fills, neutral track indicators | Performance bar tracks |
| `color.surface-dark` | `#333333` | Dark Surface Variant | Changelog timeline markers, terminal chrome | Timeline nodes, code header chrome |
| `color.hairline` | `#cfd9de` | Structural Border | Standard 1px card separators, input borders, chip outlines | Card borders, table dividers |
| `color.shadow` | `#000000` | Shadow Ink | Pure-black shadow tone for low-opacity modal overlays & halos | Modal drop-shadows |

### 4.2 Accent & Semantic Colors

| Token | Hex Value | Role | Usage | Observed On |
|---|---|---|---|---|
| `color.cobalt` | `#006be6` | Interactive Anchor Accent | External reference links, documentation citations | Outbound anchor tags |
| `color.cobalt-light` | `#3e7ff0` | Hover Anchor Accent | Hover states on interactive reference links | Active link hover |
| `color.error` | `#ba1a1a` | Semantic Danger / Error | Validation errors, high-risk badges | Error callouts |
| `color.on-error` | `#ffffff` | On-Error Text | Text rendered on error surfaces | Error badge text |
| `color.error-container`| `#ffdad6` | Error Background | Alert container fill for error states | Error banner background |
| `color.on-error-container`| `#93000a`| On-Error Container Text | Heading text on error alert containers | Error alert headings |

---

## 5. Typography System

The typography architecture uses platform-native system font stacks to ensure instantaneous rendering, zero network overhead, and operating-system harmony.

### 5.1 Font Families
- **Primary Sans Stack (`font.sans`):** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Arial, sans-serif`  
  *Behavior:* Resolves to San Francisco on macOS, Segoe UI on Windows, and Noto Sans on Linux.
- **Inline Micro-Mono Stack (`font.mono-sm`):** `Menlo, ui-monospace, SFMono-Regular, Monaco, Consolas, 'Liberation Mono', monospace`  
  *Behavior:* Scaled specifically to 9.75px for dense inline code chips within body prose.
- **Navigation Monospace Stack (`font.mono-md`):** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace`  
  *Behavior:* Scaled to 12px for CLI commands, sidebar tree navigation, and status tags.

### 5.2 Typography Scale & Hierarchy

| Level | Size | Weight | Line Height | Letter Spacing | Font Family | Usage |
|---|---|---|---|---|---|---|
| `display-xl` | 40px | 700 | 48px | `0` | `font.sans` | Hero headlines ("ORM for you to settle") |
| `display-xl-mobile` | 30px | 700 | 38px | `0` | `font.sans` | Hero headlines on mobile viewports ($< 768\text{px}$) |
| `display-lg` | 32px | 600 | 48px | `0` | `font.sans` | Major section titles ("Performance", "Benchmarks") |
| `display-lg-mobile` | 24px | 600 | 32px | `0` | `font.sans` | Section titles on mobile viewports |
| `heading-md` | 20px | 500 | 30px | `0` | `font.sans` | Sub-section labels, category groupings |
| `heading-sm` | 18px | 600 | 27px | `0` | `font.sans` | Feature card headings, panel headers |
| `body-lg` | 16px | 400 | 24px | `0` | `font.sans` | Introductory copy, reading passages |
| `body-md` | 14px | 400 | 21px | `0` | `font.sans` | Workhorse body paragraph copy |
| `body-bold` | 14px | 700 | 21px | `0` | `font.sans` | Inline paragraph emphasis, bold table copy |
| `button-md` | 14px | 600 | 21px | `0` | `font.sans` | Button labels, primary action triggers |
| `label-md` | 14px | 600 | 21px | `0` | `font.sans` | Runtime chip labels, integration names |
| `label-sm` | 12px | 500 | 17px | `0` | `font.sans` | Dominant UI label (navigation, metadata, table rows) |
| `label-upper` | 10px | 600 | 15px | `0.05em` | `font.sans` | Uppercase section dividers, table column headers |
| `mono-sm` | 9.75px | 500 | 14px | `0` | `font.mono-sm` | Inline code chips, micro syntax annotations |
| `mono-md` | 12px | 500 | 16px | `0` | `font.mono-md` | Sidebar tree entries, CLI snippets, version tags |

---

## 6. Spacing System

Spacing is built on an integrated **8px and 12px structural cadence**, creating a compact, rhythmically consistent developer-tool layout.

| Token | Rem Value | Pixel Value | Typical Application |
|---|---|---|---|
| `space.xxs` | `0.125rem` | 2px | Micro padding, border offsets |
| `space.xs` | `0.25rem` | 4px | Inline icon-to-text gap, compact chip vertical padding |
| `space.sm` | `0.375rem` | 6px | Tight list item spacing, badge internal padding |
| `space.md` | `0.5rem` | 8px | Vertical component padding (buttons, inputs), grid gaps |
| `space.base` | `0.75rem` | 12px | Horizontal component padding (buttons, chips), card padding |
| `space.lg` | `1rem` | 16px | Standard container gutter, card header gap |
| `space.xl` | `1.25rem` | 20px | Section sub-gap, mobile page margin |
| `space.2xl` | `2.5rem` | 40px | Section vertical separation, desktop page margin |
| `space.3xl` | `4rem` | 64px | Major section breaks, hero vertical breathing room |

- **Container Max-Width:** `1280px` bounded container.
- **Page Margin:** `40px` (`space.2xl`) on desktop, collapsing to `20px` (`space.xl`) on mobile viewports.
- **Component Padding Workhorse:** `8px 12px` (`space.md` vertically $\times$ `space.base` horizontally).

---

## 7. Border Radius System

Corner geometry is standardized around an **8px dominant radius**, paired with a specialized **2px annotation tier** for micro code tokens.

| Token | Value | Typical Component Usage |
|---|---|---|
| `radius.none` | `0px` | Full-bleed editorial containers, top navbar floor |
| `radius.xxs` | `2px` | Inline code annotation chips (`code-inline`), micro syntax tags |
| `radius.xs` | `3px` | Secondary small UI surfaces, micro badges |
| `radius.sm` | `4px` | Form checkboxes, tree navigation active highlight |
| `radius.md` | `5px` | Release progress badges, specialized status chips |
| `radius.lg` | `8px` | **Dominant System Radius:** Standard cards, panels, buttons, text inputs, chip grids |
| `radius.xl` | `12px` | Floating modal dialogs, search overlay panels |
| `radius.full`| `50%` / `9999px` | User avatars, circular radio button indicators |

*Rule:* Buttons never receive pill/full rounding. Buttons strictly match the card default of `8px` (`radius.lg`).

---

## 8. Border System

The visual structure relies on crisp hairline boundaries to organize content without background shading.

- **Hairline Border Color:** `#cfd9de` (`color.hairline`).
- **Internal Divider Color:** `#e8e8e8` (`color.surface-1`).
- **Border Width:** Universally `1px` solid.
- **Component Applications:**
  - Cards, panels, and chips: `1px solid #cfd9de`.
  - Secondary buttons and text inputs: `1px solid #cfd9de`.
  - Panel dividers and table row borders: `1px solid #e8e8e8`.
- **Focus / Active Stroke:** `border-color: #0a0a0a` with an outline of `2px solid rgba(10, 10, 10, 0.1)`.

---

## 9. Elevation and Shadow System

The system operates on an architectural **planar aesthetic**:
1. **Flat Elevation (Level 0):** All editorial sections, card surfaces, panels, and buttons sit flush on the `#ffffff` canvas with zero drop shadow. Boundary definition is 100% border-driven.
2. **Interactive Card Halo (Level 1):** Optional subtle halo for hover feedback on clickable cards:
   ```css
   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
   ```
3. **Modal Overlay (Level 2):** Floating search modals and dialogs break the flat plane using a multi-tiered black shadow at 10% opacity:
   ```css
   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.05);
   ```

---

## 10. Layout System

- **Grid Geometry:** 12-column fluid grid within a `1280px` maximum bounding box.
- **Section Distribution:**
  - **Asymmetrical 2-Column Split (8/4):** Main content or interactive tool pane (66.6%) paired with a sidebar tree/metadata navigation pane (33.3%).
  - **Balanced 2-Column Split (50/50):** Side-by-side performance benchmark cards or comparison panels.
  - **Multi-Column Chip Grids:** Responsive 2 to 4 column grids for runtime integrations and database badges (`grid-cols-2 md:grid-cols-4 gap-3`).
- **Full-Width Studio Panel:** Dedicated 100% width container for data-table exploration with fixed sidebar tree on the left and paginated table on the right.

---

## 11. Responsive System

- **Desktop ($\ge 1024\text{px}$):** Multi-column split layouts, horizontal top navigation, expanded 40px outer page margins, full 12-column grid.
- **Tablet ($768\text{px} - 1023\text{px}$):** 2-column benchmark panels remain side-by-side or collapse based on container width; hero headline scales to 32px.
- **Mobile ($< 768\text{px}$):**
  - Side-by-side benchmark cards and split sections stack into a single vertical column (`flex-col`).
  - Outer page margins collapse from 40px (`space-2xl`) to 20px (`space-xl`).
  - Hero display typography drops from 40px (`display-xl`) to 30px (`display-xl-mobile`).
  - Top navigation collapses into a compact bar or drawer.

---

## 12. Component System

### 12.1 Button Primary (`button-primary`)
- **Purpose:** Primary call to action (e.g., "Run Analysis", "Get Started").
- **Visuals:** Background `#0a0a0a`, text `#ffffff`, border `0`, border-radius `8px`, height `48px`, padding `8px 16px`, font `button-md` (14px / 600).
- **States:** Hover background transitions to `#222222`. Active state adds slight inset opacity.

### 12.2 Button Secondary (`button-secondary`)
- **Purpose:** Secondary navigation and utility actions (e.g., "Documentation", "Load Sample").
- **Visuals:** Background `#ffffff`, text `#222222`, border `1px solid #cfd9de`, border-radius `8px`, height `40px`, padding `8px 12px`, font `button-md` (14px / 600).
- **States:** Hover shifts border to `#222222` and text to `#0a0a0a`.

### 12.3 Standard Card (`card`)
- **Purpose:** Universal container for content blocks, features, and finding groups.
- **Visuals:** Canvas fill `#ffffff`, border `1px solid #cfd9de`, border-radius `8px`, internal padding `12px`.
- **States:** Static by default; clickable cards receive `box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04)` on hover.

### 12.4 Studio Panel / Data Table (`studio-panel`)
- **Purpose:** High-density data grid and structured threat findings.
- **Visuals:** Canvas fill `#ffffff`, border `1px solid #cfd9de`, border-radius `8px`, padding `0`. Internal rows separated by `1px solid #e8e8e8` horizontal hairlines.

### 12.5 Inline Code Chip (`code-inline`)
- **Purpose:** Compact syntax tags, parameter names, and technical identifiers.
- **Visuals:** Background `#e8e8e8`, text `#222222`, border `1px solid #cfd9de`, border-radius `2px`, padding `1px 3px`, typography `mono-sm` (9.75px / 500).

### 12.6 Integration / Runtime Chip (`runtime-chip`)
- **Purpose:** Display technology integrations, permissions, and categorized tags.
- **Visuals:** Canvas fill `#ffffff`, border `1px solid #cfd9de`, border-radius `8px`, padding `8px 12px`, typography `label-md` (14px / 600). Includes integrated monochromatic icon.

### 12.7 Text Input (`text-input`)
- **Purpose:** Form fields and search inputs.
- **Visuals:** Background `#ffffff`, text `#222222`, placeholder `#909090`, border `1px solid #cfd9de`, border-radius `8px`, height `40px`, padding `8px 12px`, typography `body-md` (14px / 400).
- **Focus State:** `border-color: #0a0a0a`, outline `2px solid rgba(10, 10, 10, 0.1)`.

### 12.8 Checkbox & Radio
- **Checkbox:** $16 \times 16\text{px}$, border `1px solid #cfd9de`, border-radius `4px`, background `#ffffff`. Checked: fill `#0a0a0a`, check glyph `#ffffff`.
- **Radio:** $16 \times 16\text{px}$, circular border `1px solid #cfd9de`, checked: centered `#0a0a0a` dot.

### 12.9 Top Navigation (`top-nav`)
- **Visuals:** Background `#ffffff`, height `48px`, border-bottom `1px solid #cfd9de`, horizontal padding `8px 16px`. Holds logo/wordmark left, links right.

### 12.10 Tree Nav (`tree-nav`)
- **Visuals:** Monospace navigation rows using `mono-md` (12px), text `#282b3b`, interactive padding `4px 8px`, border-radius `4px`. Active selection shifts font weight to 600 with subtle left border accent.

---

## 13. Interaction States

- **Default:** Clean `#ffffff` surface, `#222222` text, `#cfd9de` hairline border.
- **Hover:**
  - Secondary buttons & inputs: border transitions to `#222222`.
  - Primary button: background shifts from `#0a0a0a` to `#222222`.
  - Cobalt links: text transitions to `#3e7ff0`.
- **Focus:** High-visibility outline: `2px solid rgba(10, 10, 10, 0.1)` with `border-color: #0a0a0a`.
- **Disabled:** Background `#ffffff`, text `#909090`, border `#e8e8e8`, cursor `not-allowed`.
- **Selected:** Background `#e8e8e8`, border `#0a0a0a`, text `#0a0a0a`, bold font weight.

---

## 14. Iconography

- **Style:** Monochromatic, clean line icons (stroke-based, 1.5px to 2px stroke width).
- **Color:** Matches surrounding text token (`#222222` or `#444444`). Never rendered in saturated colors.
- **Standard Sizing:**
  - Micro / Inline: $12 \times 12\text{px}$ or $14 \times 14\text{px}$
  - Standard Component: $16 \times 16\text{px}$
  - Action / Hero: $20 \times 20\text{px}$
- **Alignment:** Aligned with text baseline with `gap: 6px` or `gap: 8px`.

---

## 15. Imagery & Illustration

- **Restrained Artwork:** Zero 3D illustrations, photographic banners, or gradient meshes.
- **Emoji Stacking (Hero Motif):** Three animated rain/drizzle emoji (💧💧💧) stacked above the headline represent the sole non-gray illustrative element.
- **Avatars:** Contributor and team portraits are strictly circular (`radius.full`), $28 \times 28\text{px}$ or $32 \times 32\text{px}$ with a 1px `#cfd9de` hairline ring.

---

## 16. Accessibility (WCAG 2.1 AA)

- **Contrast Ratios:**
  - `#0a0a0a` and `#222222` against `#ffffff` yield $> 14:1$ contrast ratio (exceeds AAA requirement).
  - Muted text `#444444` against `#ffffff` yields $9.7:1$ contrast ratio.
  - Cobalt `#006be6` against `#ffffff` yields $4.6:1$ contrast ratio (meets AA minimum).
- **Focus Rings:** Distinct 2px focus ring on all interactive elements.
- **Non-Color Indicators:** All status badges pair color with text labels and geometric icons.

---

## 17. Page Composition Rules

1. **Header Area:** Clean 48px top bar flush against canvas, featuring wordmark and compact monospace/label links.
2. **Hero Presentation:** Low-ceremony layout: stacked emoji motif, 40px system-ui headline, immediate integration badge strip, and a two-column distribution.
3. **Data Grid & Panels:** Content-heavy sections transition into 8px-rounded bordered cards or studio panels without full-bleed background tinting.
4. **Footer:** Simple white-canvas footer with 40px vertical padding, hairline divider, and 12px muted metadata text.

---

## 18. Design Do's

- **DO** maintain the strict achromatic palette (`#0a0a0a` to `#ffffff`) for all primary UI components.
- **DO** use system-ui at 40px / weight 700 for top-level display headings.
- **DO** use Menlo at 9.75px for inline code chips and annotation tags.
- **DO** standardize on 8px corner radiuses for cards, panels, inputs, and buttons.
- **DO** use 1px hairline borders (`#cfd9de`) exclusively for surface separation.
- **DO** reserve cobalt blue (`#006be6`) strictly for external links and documentation citations.

---

## 19. Design Don'ts

- **DON'T** introduce saturated brand colors (purple, green, orange, teal) on primary action buttons or containers.
- **DON'T** apply drop shadows to marketing cards or panels.
- **DON'T** use pill/full radius on buttons; buttons must use 8px.
- **DON'T** use the 9.75px monospace tier for standard prose or body text.
- **DON'T** add decorative background gradients or blur glassmorphism behind cards.
- **DON'T** load heavy custom display web fonts; rely on system-ui.

---

## 20. Stitch Screen References

| Screen Name | Screen Resource ID | Purpose | Key Design Contributions |
|---|---|---|---|
| `DESIGN.md` | `projects/253019097841659487/screens/11622129644366656757` | Primary Design System Specification | Defines complete achromatic gray ladder, system-ui scale, 8px radius standard, and 16 component schemas. |
| `drizzle.design.md` | `projects/253019097841659487/screens/11622129644366658723` | Canonical Design System Markdown Export | Provides exact machine-readable tokens, frequency counts, and explicit Do's & Don'ts. |
| `Documentation Native` | `assets/198f7b46b7d34f4ebd379cd4b66d69b4` | Stitch Design System Asset | Establishes token mappings, light-mode palette variables, and component guidelines. |

---

## 21. Design Extraction Notes

- **Directly Observed:** The absence of a declared brand color in CSS custom properties is confirmed by 1,849 occurrences of `#222222` and 978 occurrences of `#444444`, with `#006be6` occurring strictly 20 times on external reference links.
- **Derived Cadence:** The 8px and 12px spacing rhythm and 8px dominant corner radius (141 occurrences) are directly verified from the Stitch screen definitions.
- **Limitations in Stitch Data:** The captured Stitch project is light-mode only. While Drizzle Studio displays dark table interiors, no global dark-mode theme tokens were declared. Secondary navigation hover fills were derived from standard `#e8e8e8` surface tokens.
