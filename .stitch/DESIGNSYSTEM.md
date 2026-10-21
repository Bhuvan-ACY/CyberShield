# Design System

## 1. Design System Metadata
- **System Name:** Documentation Native Design System
- **Origin & Basis:** Drizzle ORM Specification ([`DESIGN.md`](file:///c:/Users/Bhuvan%20A/OneDrive/Desktop/project/projectt/.stitch/DESIGN.md))
- **Source Stitch Project ID:** `253019097841659487`
- **Design Paradigm:** High-Density Utilitarian Minimalism / Developer Specification
- **Primary Aesthetic:** Achromatic Gray Scale, Planar Boundary Hierarchy, System Font Native
- **Version:** 1.0.0
- **Target Platform:** Web (Desktop, Tablet, Mobile) / Developer & Security Utilities

---

## 2. Design Tokens

### 2.1 Colors

| Token Name | Value | Purpose | Usage | Source in DESIGN.md |
|---|---|---|---|---|
| `color.ink.dark` | `#0a0a0a` | Deepest Ink | Primary action button fills, tightest headline weight | Section 4.1 |
| `color.ink.primary` | `#222222` | Primary Foreground | Display headings, primary body titles, code editor text | Section 4.1 |
| `color.ink.mid` | `#282b3b` | Structural Slate | Sidebar tree navigation, documentation body copy | Section 4.1 |
| `color.ink.muted` | `#444444` | Secondary Text | Workhorse body paragraph copy, code punctuation | Section 4.1 |
| `color.ink.secondary` | `#4b5563` | Tertiary Text | Metadata labels, timestamp markers, captions | Section 4.1 |
| `color.ink.tertiary` | `#71767b` | Muted Ink | Secondary timestamps, contributor handles | Section 4.1 |
| `color.ink.faint` | `#909090` | Disabled / Placeholder | Form input placeholders, disabled buttons | Section 4.1 |
| `color.canvas` | `#ffffff` | Base Canvas | Primary page background, card surfaces, dialog interiors | Section 4.1 |
| `color.surface.1` | `#e8e8e8` | Recessed Utility | Search box fill, release badges, inline code tags | Section 4.1 |
| `color.surface.muted` | `#808080` | Mid-Tone Surface | Secondary chart tracks, neutral progress indicators | Section 4.1 |
| `color.surface.dark` | `#333333` | Dark Accent Surface | Changelog timeline markers, terminal chrome | Section 4.1 |
| `color.hairline` | `#cfd9de` | Structural Stroke | Standard 1px card separators, input borders, chip outlines | Section 4.1 |
| `color.shadow` | `#000000` | Shadow Foundation | Pure-black shadow ink for low-opacity modal overlays | Section 4.1 |
| `color.cobalt` | `#006be6` | External Anchor Accent | External reference links, documentation citations | Section 4.2 |
| `color.cobalt.light` | `#3e7ff0` | Hover Anchor Accent | Hover states on interactive reference links | Section 4.2 |
| `color.error` | `#ba1a1a` | Semantic Error | Validation error messages, critical alert badges | Section 4.2 |
| `color.error.container`| `#ffdad6`| Error Background | Fill color for error alert callouts | Section 4.2 |
| `color.error.on` | `#93000a` | Error Foreground | Text rendered on error containers | Section 4.2 |

### 2.2 Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Source in DESIGN.md |
|---|---|---|---|---|---|---|
| `font.display.xl` | `font.family.sans` | 40px | 700 | 48px | `0` | Section 5.2 |
| `font.display.xl.mobile` | `font.family.sans` | 30px | 700 | 38px | `0` | Section 5.2 |
| `font.display.lg` | `font.family.sans` | 32px | 600 | 48px | `0` | Section 5.2 |
| `font.display.lg.mobile` | `font.family.sans` | 24px | 600 | 32px | `0` | Section 5.2 |
| `font.heading.md` | `font.family.sans` | 20px | 500 | 30px | `0` | Section 5.2 |
| `font.heading.sm` | `font.family.sans` | 18px | 600 | 27px | `0` | Section 5.2 |
| `font.body.lg` | `font.family.sans` | 16px | 400 | 24px | `0` | Section 5.2 |
| `font.body.md` | `font.family.sans` | 14px | 400 | 21px | `0` | Section 5.2 |
| `font.body.bold` | `font.family.sans` | 14px | 700 | 21px | `0` | Section 5.2 |
| `font.button.md` | `font.family.sans` | 14px | 600 | 21px | `0` | Section 5.2 |
| `font.label.md` | `font.family.sans` | 14px | 600 | 21px | `0` | Section 5.2 |
| `font.label.sm` | `font.family.sans` | 12px | 500 | 17px | `0` | Section 5.2 |
| `font.label.upper` | `font.family.sans` | 10px | 600 | 15px | `0.05em` | Section 5.2 |
| `font.mono.sm` | `font.family.mono.sm` | 9.75px | 500 | 14px | `0` | Section 5.2 |
| `font.mono.md` | `font.family.mono.md` | 12px | 500 | 16px | `0` | Section 5.2 |

#### Font Stacks:
- `font.family.sans`: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Arial, sans-serif`
- `font.family.mono.sm`: `Menlo, ui-monospace, SFMono-Regular, Monaco, Consolas, 'Liberation Mono', monospace`
- `font.family.mono.md`: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace`

### 2.3 Spacing

| Token Name | Rem Value | Pixel Value | Typical Application | Source in DESIGN.md |
|---|---|---|---|---|
| `space.xxs` | `0.125rem` | 2px | Micro gaps, border offsets | Section 6 |
| `space.xs` | `0.25rem` | 4px | Icon-to-text gap, compact tag vertical padding | Section 6 |
| `space.sm` | `0.375rem` | 6px | Tight list spacing, chip vertical padding | Section 6 |
| `space.md` | `0.5rem` | 8px | Vertical component padding (buttons, inputs), grid gaps | Section 6 |
| `space.base` | `0.75rem` | 12px | Horizontal component padding, card internal padding | Section 6 |
| `space.lg` | `1rem` | 16px | Container gutter, card header separation | Section 6 |
| `space.xl` | `1.25rem` | 20px | Section sub-gap, mobile page margin | Section 6 |
| `space.2xl` | `2.5rem` | 40px | Section vertical separation, desktop page margin | Section 6 |
| `space.3xl` | `4rem` | 64px | Major section breaks, hero spacing | Section 6 |

### 2.4 Border Radius

| Token Name | Value | Purpose | Component Usage | Source in DESIGN.md |
|---|---|---|---|---|
| `radius.none` | `0px` | Square Edge | Full-bleed hero banners, top navigation floor | Section 7 |
| `radius.xxs` | `2px` | Micro Radius | Inline code chips (`code-inline`), syntax badges | Section 7 |
| `radius.xs` | `3px` | Sub-Component | Secondary small UI surfaces | Section 7 |
| `radius.sm` | `4px` | Form Controls | Form checkboxes, tree navigation active pill | Section 7 |
| `radius.md` | `5px` | Badges | Release progress chips, status tags | Section 7 |
| `radius.lg` | `8px` | **Dominant Token**| Standard cards, panels, buttons, text inputs | Section 7 |
| `radius.xl` | `12px` | Overlay Radius | Floating modal dialogs, search overlay panels | Section 7 |
| `radius.full` | `50%` / `9999px` | Circular | User avatars, circular radio dots | Section 7 |

### 2.5 Borders

| Token Name | Color Value | Width | Style | Usage | Source in DESIGN.md |
|---|---|---|---|---|---|
| `border.hairline` | `#cfd9de` | `1px` | Solid | Standard cards, panels, chip outlines, inputs | Section 8 |
| `border.divider` | `#e8e8e8` | `1px` | Solid | Internal panel rows, table dividers, code badges | Section 8 |
| `border.active` | `#0a0a0a` | `1px` | Solid | Focused inputs, active selected states | Section 8 |
| `border.focus.outline`| `rgba(10, 10, 10, 0.1)`| `2px` | Solid | High-visibility focus ring on interactive items | Section 8 |

### 2.6 Shadows and Elevation

| Token Name | Value | Purpose | Usage | Source in DESIGN.md |
|---|---|---|---|---|
| `elevation.flat` | `none` | Planar Hierarchy | Default for all cards, panels, buttons, tables | Section 9 |
| `elevation.halo` | `0 1px 2px 0 rgba(0, 0, 0, 0.04)` | Interactive Hover | Subtle hover feedback on clickable cards | Section 9 |
| `elevation.modal`| `0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.05)` | Floating Dialog | Search dialogs, documentation modals | Section 9 |

### 2.7 Breakpoints
- `breakpoint.sm`: `640px`
- `breakpoint.md`: `768px` (Primary collapse threshold: 2-column benchmark panels stack to 1 column)
- `breakpoint.lg`: `1024px` (Desktop multi-column layouts, expanded navigation)
- `breakpoint.xl`: `1280px` (Maximum bounded container width)

### 2.8 Z-Index
- `z.base`: `0` (Standard canvas surfaces)
- `z.card`: `1` (Interactive cards and panels)
- `z.sticky`: `10` (Persistent top navigation bar)
- `z.dropdown`: `20` (Dropdown menus, popovers)
- `z.modal.backdrop`: `40` (Backdrop veil)
- `z.modal`: `50` (Search modals, dialog overlays)

---

## 3. Layout System

### 3.1 Container Architecture
- **Max Width:** `1280px` bounded container (`max-w-7xl mx-auto`).
- **Desktop Margin:** `40px` (`space.2xl` / `px-10`).
- **Mobile Margin:** `20px` (`space.xl` / `px-5`).

### 3.2 Grid Patterns
1. **Asymmetrical 2-Column Split (8/4):**
   - Left Column (66.6% / 8 cols): Interactive submission form, benchmark data, or main threat analysis report.
   - Right Column (33.3% / 4 cols): Directory navigation tree, sample scenarios loader, or emergency escalation quick-dial card.
2. **Balanced 2-Column Split (50/50):**
   - Side-by-side comparative panels (e.g., Performance Benchmark cards, Before/After scam indicators).
3. **Multi-Column Chip Grid:**
   - 2 columns on mobile, scaling to 4 columns on desktop (`grid grid-cols-2 md:grid-cols-4 gap-3`) for runtime technology chips and permission metadata tags.

---

## 4. Component System

### 4.1 Buttons

#### A. Button Primary (`button-primary`)
- **Purpose:** Highest-priority action (e.g., "Run Analysis", "Submit Threat").
- **Anatomy:** Container + Label Text.
- **Visuals:** Background `color.ink.dark` (`#0a0a0a`), text `color.canvas` (`#ffffff`), border `0`, radius `radius.lg` (`8px`), height `48px`, padding `8px 16px`, typography `font.button.md` (14px / 600).
- **States:**
  - *Hover:* Background transitions to `color.ink.primary` (`#222222`).
  - *Active:* Inset background opacity (`opacity: 0.9`).
  - *Disabled:* Background `color.surface.1` (`#e8e8e8`), text `color.ink.faint` (`#909090`), cursor `not-allowed`.
- **Usage Rule:** Maximum one primary button per functional view.

#### B. Button Secondary (`button-secondary`)
- **Purpose:** Supporting and utility actions (e.g., "Load Sample", "Documentation", "Clear").
- **Anatomy:** Container + Border + Label Text.
- **Visuals:** Background `color.canvas` (`#ffffff`), text `color.ink.primary` (`#222222`), border `1px solid color.hairline` (`#cfd9de`), radius `radius.lg` (`8px`), height `40px`, padding `8px 12px`, typography `font.button.md` (14px / 600).
- **States:**
  - *Hover:* Border transitions to `color.ink.primary` (`#222222`), text shifts to `color.ink.dark` (`#0a0a0a`).
  - *Focus:* Outline `2px solid rgba(10, 10, 10, 0.1)`, border `color.ink.dark`.

### 4.2 Inputs

#### Text Input & Textarea (`text-input`)
- **Purpose:** Accepts text message inputs, URLs, and search queries.
- **Anatomy:** Label + Input Surface + Border + Placeholder + Counter / Helper Text.
- **Visuals:** Background `color.canvas` (`#ffffff`), text `color.ink.primary` (`#222222`), placeholder `color.ink.faint` (`#909090`), border `1px solid color.hairline` (`#cfd9de`), radius `radius.lg` (`8px`), height `40px` (or multi-row textarea), padding `8px 12px`, typography `font.body.md` (14px / 400).
- **States:**
  - *Focus:* Border `color.ink.dark` (`#0a0a0a`), outline `2px solid rgba(10, 10, 10, 0.1)`.
  - *Error:* Border `color.error` (`#ba1a1a`), error message below in `font.label.sm` and `color.error`.

### 4.3 Forms
- **Vertical Spacing:** Form groups separated by `space.lg` (16px).
- **Labels:** Rendered in `font.label.md` (14px / 600), text `color.ink.primary` (`#222222`), with `space.xs` (4px) bottom margin to the input.
- **Helper Text:** Rendered in `font.label.sm` (12px / 500), text `color.ink.secondary` (`#4b5563`).

### 4.4 Cards

#### Standard Card (`card`)
- **Purpose:** Primary content block, finding card, and metric container.
- **Visuals:** Background `color.canvas` (`#ffffff`), border `1px solid color.hairline` (`#cfd9de`), radius `radius.lg` (`8px`), internal padding `space.base` (`12px`).
- **Interactive Variant:** When card is clickable, hover activates `elevation.halo` (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04)`).

### 4.5 Navigation

#### Top Navigation (`top-nav`)
- **Visuals:** Background `color.canvas` (`#ffffff`), height `48px`, border-bottom `1px solid color.hairline` (`#cfd9de`), horizontal padding `8px 16px`. Holds logo/title left, navigation links right.
- **Links (`nav-link`):** Background transparent, text `color.ink.primary` at `font.label.sm` (12px / 500), padding `4px 8px`. Hover shifts text to `color.ink.dark`.

### 4.6 Tabs
- **Visuals:** Tab bar bounded by `1px solid color.hairline` (`#cfd9de`), radius `radius.lg` (`8px`), height `40px`, background `color.canvas`.
- **Tab Item:** Padding `8px 12px`, font `font.button.md` (14px / 600), text `color.ink.muted`. Active tab fills `color.surface.1` (`#e8e8e8`) with text `color.ink.dark` (`#0a0a0a`).

### 4.7 Badges & Chips

#### A. Inline Code Chip (`code-inline`)
- **Visuals:** Background `color.surface.1` (`#e8e8e8`), text `color.ink.primary` (`#222222`), border `1px solid color.hairline` (`#cfd9de`), radius `radius.xxs` (`2px`), padding `1px 3px`, typography `font.mono.sm` (9.75px / 500).

#### B. Runtime / Integration Chip (`runtime-chip`)
- **Visuals:** Background `color.canvas` (`#ffffff`), border `1px solid color.hairline` (`#cfd9de`), radius `radius.lg` (`8px`), padding `8px 12px`, typography `font.label.md` (14px / 600).

#### C. Release / Version Badge (`release-badge`)
- **Visuals:** Background `color.surface.1` (`#e8e8e8`), text `color.ink.dark` (`#0a0a0a`), radius `radius.md` (`5px`), padding `8px 10px`, height `48px`, typography `font.mono.sm` (9.75px / 500).

### 4.8 Alerts & Callouts
- **Structure:** Container with `1px` border, internal padding `12px 16px`, radius `radius.lg` (`8px`).
- **Error Alert:** Background `color.error.container` (`#ffdad6`), border `1px solid color.error` (`#ba1a1a`), heading text `color.error.on` (`#93000a`), body text `color.error` (`#ba1a1a`).
- **Advisory / Info Alert:** Background `color.canvas`, border `1px solid color.hairline`, heading text `color.ink.primary`, body text `color.ink.muted`.

### 4.9 Tables & Data Panels (`studio-panel`)
- **Structure:** Bounded container `1px solid color.hairline`, radius `radius.lg` (`8px`), padding `0`.
- **Header Row:** Background `color.canvas`, border-bottom `1px solid color.hairline`, typography `font.label.upper` (10px / 600 / uppercase), padding `8px 12px`, text `color.ink.secondary`.
- **Data Rows:** Background `color.canvas`, border-bottom `1px solid color.divider` (`#e8e8e8`), padding `8px 12px`, typography `font.label.sm` (12px / 500), text `color.ink.primary`.

### 4.10 Modals & Dialogs
- **Backdrop:** Background `rgba(0, 0, 0, 0.4)` with `z.modal.backdrop`.
- **Dialog Container:** Background `color.canvas` (`#ffffff`), border `1px solid color.hairline` (`#cfd9de`), radius `radius.xl` (`12px`), shadow `elevation.modal`, internal padding `24px`.

### 4.11 Dropdowns
- **Container:** Background `color.canvas`, border `1px solid color.hairline`, radius `radius.lg` (`8px`), shadow `elevation.halo`, padding `4px`.
- **Item:** Padding `6px 10px`, radius `radius.sm` (`4px`), typography `font.label.sm`. Hover state fills `color.surface.1`.

### 4.12 Lists & Navigation Trees (`tree-nav`)
- **Rows:** Monospace navigation entries using `font.mono.md` (12px / 500), text `color.ink.mid` (`#282b3b`), padding `4px 8px`, radius `radius.sm` (`4px`).
- **Active State:** Shifts text to `color.ink.primary` (`#222222`), bold weight 600, with a faint left hairline accent stroke.

### 4.13 Loading States
- **Skeleton Shimmer:** Background `color.surface.1` (`#e8e8e8`), radius matching the target component (`radius.lg` for cards, `radius.sm` for text lines). Subtle pulse opacity animation ($0.6 \to 1.0$).

### 4.14 Empty States
- **Container:** Standard card with dashed border `1px dashed color.hairline`, center-aligned, padding `32px`, typography `font.body.md` in `color.ink.secondary`.

### 4.15 Error States
- **Input Error:** Highlighted border `1px solid color.error` (`#ba1a1a`), accompanied by helper error message in `font.label.sm` below the input.

---

## 5. Interaction States

| State | Background | Text Color | Border | Shadow / Outline |
|---|---|---|---|---|
| **Default** | `color.canvas` (`#ffffff`) | `color.ink.primary` (`#222222`)| `1px solid color.hairline` (`#cfd9de`) | `none` |
| **Hover (Button Primary)**| `color.ink.primary` (`#222222`)| `color.canvas` (`#ffffff`) | `0` | `none` |
| **Hover (Button Secondary)**| `color.canvas` (`#ffffff`) | `color.ink.dark` (`#0a0a0a`) | `1px solid color.ink.primary` (`#222222`)| `none` |
| **Hover (Clickable Card)**| `color.canvas` (`#ffffff`) | `color.ink.primary` (`#222222`)| `1px solid color.hairline` (`#cfd9de`) | `elevation.halo` |
| **Focus** | Unchanged | Unchanged | `1px solid color.ink.dark` (`#0a0a0a`)| `2px solid rgba(10, 10, 10, 0.1)` |
| **Disabled** | `color.canvas` | `color.ink.faint` (`#909090`)| `1px solid color.divider` (`#e8e8e8`) | `none` |
| **Active / Selected** | `color.surface.1` (`#e8e8e8`)| `color.ink.dark` (`#0a0a0a`) | `1px solid color.ink.dark` (`#0a0a0a`)| `none` |

---

## 6. Responsive Rules

1. **Mobile Stacking ($< 768\text{px}$):**
   - 2-column benchmark panels and 8/4 split layouts collapse into a single vertical column (`flex flex-col`).
   - Page margins decrease from `40px` (`space.2xl`) to `20px` (`space.xl`).
   - Hero headlines scale down from `40px` (`font.display.xl`) to `30px` (`font.display.xl.mobile`).
2. **Touch Targets:**
   - All interactive controls on mobile viewports must maintain minimum touch targets of $44 \times 44\text{px}$.
3. **Typography Resizing:**
   - Display headings automatically adapt via mobile typography tokens (`display-xl-mobile`, `display-lg-mobile`).

---

## 7. Accessibility Rules

- **Contrast Compliance:** All text tokens meet or exceed WCAG 2.1 Level AA requirements:
  - Deep Ink (`#0a0a0a` / `#222222`) on Canvas (`#ffffff`): $> 14:1$ (AAA).
  - Muted Ink (`#444444`) on Canvas (`#ffffff`): $9.7:1$ (AAA).
  - Cobalt Anchor (`#006be6`) on Canvas (`#ffffff`): $4.6:1$ (AA).
- **Focus Rings:** Mandatory 2px high-visibility focus outline (`focus-visible:ring-2 focus-visible:ring-black/10`).
- **Non-Color Significance:** Threat categories must always display textual labels and icons in addition to color tokens.

---

## 8. Iconography

- **Style:** Monochromatic, clean line icons (1.5px to 2px stroke width).
- **Color:** Strict inheritance from parent text token (`#222222` or `#444444`). Saturated colored icons are prohibited.
- **Sizes:** Micro ($12\text{px}$), Standard ($16\text{px}$), Action/Hero ($20\text{px}$).

---

## 9. Imagery

- **Restraint:** No photographic marketing imagery, abstract 3D shapes, or colorful gradients.
- **Illustrative Motif:** Triple animated drizzle emoji (💧💧💧) above the hero headline.
- **Avatars:** Circular portraits (`radius.full`), $28 \times 28\text{px}$ or $32 \times 32\text{px}$ with a 1px `#cfd9de` hairline ring.

---

## 10. Page Patterns

### 10.1 Threat Triage Page (`/analyze`)
- **Structure:** 2-column split (8 cols left / 4 cols right).
- **Left Column:** Category tab bar, multi-line text input with character counter, "Run Threat Analysis" primary button.
- **Right Column:** "Load Fictional Sample" selector card, quick tips chip grid, and privacy notice badge.

### 10.2 Analysis Results Page (`/analyze/results`)
- **Structure:** Top risk score summary panel, followed by a 2-column or stacked layout.
- **Components:** Radial score gauge (0–100), severity badge, itemized findings accordion (`studio-panel` style), actionable checklist card, and plain-text copy report button.

### 10.3 Threat Awareness Center (`/awareness`)
- **Structure:** Search input bar, category filter pills, responsive 2-column card grid (`grid-cols-1 md:grid-cols-2 gap-4`).
- **Cards:** Hairline-bordered cards with read-time metadata chips and clean editorial typography.

---

## 11. Component Usage Rules

- **DO** use `card` as the default container for all content groupings.
- **DO** use `code-inline` (2px radius, 9.75px Menlo mono) for technical parameter references and syntax tokens.
- **DO** use `button-primary` (`#0a0a0a` fill) exclusively for primary execution triggers.
- **DO NOT** use `color.cobalt` (`#006be6`) for buttons or container backgrounds; reserve it strictly for outbound links.
- **DO NOT** apply pill radius to buttons or inputs; adhere strictly to `8px` (`radius.lg`).

---

## 12. Design Consistency Rules

- **Consistency Check:** When rendering any new card or table, verify that borders use `#cfd9de` (`color.hairline`) and internal dividers use `#e8e8e8` (`color.surface.1`).
- **No Background Tinting:** Never add soft pastel background tints behind cards. The canvas remains pure `#ffffff`.

---

## 13. Stitch Generation Rules

When creating future screens via Stitch MCP:
1. **Enforce Palette Tokens:** Future screens must use the defined achromatic gray scale (`#0a0a0a`, `#222222`, `#444444`, `#ffffff`, `#cfd9de`).
2. **Apply Established Typography:** Use `system-ui` for prose and headings; use `Menlo` at 9.75px for code tags; use 12px mono for trees.
3. **Maintain 8px Dominance:** Cards, buttons, inputs, and chips must consistently apply 8px corner radiuses.
4. **Follow Planar Layering:** Avoid adding drop shadows or gradient fills to marketing cards.

---

## 14. Source and Traceability

```text
Source Stitch Project ID:
253019097841659487

Source Stitch Project Name:
Drizzle Design System

Reference Screens Inspected:
- Screen 1: DESIGN.md (projects/253019097841659487/screens/11622129644366656757)
- Screen 2: drizzle.design.md (projects/253019097841659487/screens/11622129644366658723)
- Stitch Design System Asset: Documentation Native (assets/198f7b46b7d34f4ebd379cd4b66d69b4)

Primary Design Language Documentation:
.stitch/DESIGN.md

Design System Tokens & Specifications:
.stitch/DESIGNSYSTEM.md
```
