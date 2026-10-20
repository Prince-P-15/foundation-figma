---
name: "York Foundation — Enterprise Operating System"
version: "2.0.0"
viewport:
  default: "1440px"
  desktop: "1440px"
  grid: "12-column"
  maxWidth: "1440px"

colors:
  dark:
    bgBase: "#0B0F19"
    bgSurface: "#121829"
    bgSurfaceElevated: "#1B2238"
    bgCard: "rgba(18, 24, 40, 0.85)"
    bgCardHover: "rgba(25, 34, 56, 0.96)"
    line: "rgba(255, 255, 255, 0.09)"
    lineStrong: "rgba(255, 255, 255, 0.16)"
    textMain: "#F8FAFC"
    textMuted: "#94A3B8"
    textSubtle: "#64748B"
    primary: "#2563EB"
    primaryLight: "#60A5FA"
    accentCyan: "#06B6D4"
    accentEmerald: "#10B981"
    accentViolet: "#8B5CF6"
    accentAmber: "#F59E0B"
  light:
    bgApp: "#F8FAFC"
    bgCard: "#FFFFFF"
    bgPill: "#FFFFFF"
    bgPillHover: "#F1F5F9"
    bgSubtle: "#F8FAFC"
    line: "#E2E8F0"
    lineStrong: "#CBD5E1"
    textMain: "#0F172A"
    textMuted: "#475569"
    textSubtle: "#64748B"
    primary: "#1D4ED8"
    accentEmerald: "#059669"

typography:
  fontFamily:
    main: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    mono: "JetBrains Mono, ui-monospace, monospace"
  scale:
    h1:
      fontSize: "44px"
      lineHeight: "1.15"
      fontWeight: 800
      letterSpacing: "-0.025em"
    h2:
      fontSize: "28px"
      lineHeight: "1.25"
      fontWeight: 700
      letterSpacing: "-0.02em"
    h3:
      fontSize: "20px"
      lineHeight: "1.3"
      fontWeight: 600
      letterSpacing: "-0.015em"
    bodyLarge:
      fontSize: "16px"
      lineHeight: "1.5"
      fontWeight: 400
    bodyMedium:
      fontSize: "14px"
      lineHeight: "1.5"
      fontWeight: 400
    bodySmall:
      fontSize: "12px"
      lineHeight: "1.4"
      fontWeight: 500
    monoCaption:
      fontSize: "11px"
      lineHeight: "1.3"
      fontWeight: 600
      fontFamily: "mono"

layout:
  container: "1440px"
  paddingHorizontal: "60px"
  paddingVertical: "48px"
  gap:
    xs: "8px"
    sm: "12px"
    md: "16px"
    lg: "24px"
    xl: "32px"
    xxl: "48px"
  borderRadius:
    sm: "6px"
    md: "8px"
    lg: "12px"
    xl: "16px"
    pill: "9999px"
---

# York Foundation — Google Stitch Specification (`DESIGN.md`)

This `DESIGN.md` file defines the full design system, layout rules, component hierarchy, and multi-screen specifications for **York Foundation (Operating System v2.0)**. 
Import this file directly into **Google Stitch** via *Settings → Design System → Import DESIGN.md* to generate native Stitch canvas flows and push to Figma.

---

## 1. System Vision & Aesthetic Principles

York Foundation is an Executive Operating System consolidating **22 services** across 5 business verticals: R&D, QA, GTM, Finance, and Capital.

### Design Principles:
1. **1440px Desktop Anchor**: Every screen is optimized for high-density 1440px desktop viewports with balanced responsive auto-layout containers.
2. **Sub-pixel Glass & Precision Borders**: Dark base (`#0B0F19`) surfaces layered with crisp 1px borders (`rgba(255,255,255,0.09)`).
3. **Information Density & Hierarchy**: Direct access to telemetry, manager-level organizational ladders, and real-time operational status.
4. **Dual Theme Compliant**: WCAG AAA compliant in dark mode (`#0B0F19`) and light mode (`#F8FAFC`).

---

## 2. Complete Screen Blueprint Catalogue (1440px)

### Screen 1: Master Landing Page (`index.html`)
* **Viewport**: 1440px width × Auto Height
* **Live Target**: `https://prince-p-15.github.io/foundation-figma/`
* **Layout Structure**:
  1. **Executive Navbar (1440px)**:
     - Left: York.ie brand badge + "FOUNDATION" status pill
     - Center: Nav links (`Overview`, `22 Services`, `LMS Platform`, `Capital & Fuel`)
     - Right: Dual-theme toggle, Sign-In, and primary "Launch Live Console" CTA button.
  2. **Hero Section Version 1 (Interactive Carousel)**:
     - Badge: `ENTERPRISE OPERATING SYSTEM`
     - Headline: `One Console. Twenty-Two Services. Complete Operational Control.`
     - Subtitle: `York.ie runs the entire company across R&D, QA, GTM, Finance, and Capital into a single interface.`
     - Action CTAs: `[⚡ Launch Live Console]` (Primary Blue) + `[Explore 22 Services]` (Subtle Glass).
  3. **Flagship 3-Card Showcase (Equalized 340px Heights)**:
     - **Card 1: York.IE LMS Platform**: Leadership ladders, training tracks, onboarding milestones.
     - **Card 2: Operations Hub**: Real-time cross-functional command center and telemetry.
     - **Card 3: Capital & Fuel**: Headcount runway, burn velocity, and Series A metrics.
  4. **The 22 Services Interactive Matrix**:
     - 5 Category Tabs: `R&D (6)`, `QA & Testing (4)`, `Go-To-Market (5)`, `Finance & Ops (4)`, `Capital & Fuel (3)`.
     - 22 Auto-Layout interactive cards with icon, metric, and service health status.
  5. **Enterprise Global Footer**:
     - 1440px container with legal, security credentials, status ping, and copyright.

---

### Screen 2: Modern Executive Pro Console (`dashboard.html` / `dashboard-v2.html`)
* **Viewport**: 1440px width × 1024px+
* **Live Target**: `https://prince-p-15.github.io/foundation-figma/dashboard.html?preview=true`
* **Layout Structure**:
  1. **Top Telemetry Header (1440px)**:
     - Search command bar (`Cmd + K`), Live Telemetry pill (`🟢 System Operational 99.98%`), Workspace Switcher, Profile.
  2. **Executive KPI Metric Grid (4 Auto Layout Cards)**:
     - **Active Initiatives**: `18 / 22` (+3 this month)
     - **Monthly Burn Rate**: `$142,500` (-4.2% vs budget)
     - **Team Sprint Velocity**: `94.2%` (+6.8% sprint-over-sprint)
     - **Runway Horizon**: `28.4 Months` (Series A Horizon)
  3. **Main Dashboard Dual-Column**:
     - **Left (60% Auto Layout)**: Active Initiatives, Critical Path roadmap, sprint blockers.
     - **Right (40% Auto Layout)**: Capital burn trajectory, resource allocation by team, quick action triggers.
  4. **Quick Launchers Dock**:
     - One-click launch to York LMS, API Console, Billing, and Org Hierarchy.

---

### Screen 3: Organization Directory & Layer 3 Hierarchy Table
* **Viewport**: 1440px width × Auto Height
* **Live Target**: `https://prince-p-15.github.io/foundation-figma/dashboard.html?preview=true#teams`
* **Layout Structure**:
  1. **View Switcher Toolbar**:
     - Toggle between `Department Grid`, `List View`, and `Layer 3 By Manager Hierarchy`.
  2. **Multi-Level Expandable Table**:
     - **Layer 1 (Executive Manager)**: Engineering Director (Alex Vance) — 3 Leads, 14 Engineers.
     - **Layer 2 (Team Leads)**:
       - ↳ Frontend Lead (Marcus Brody)
       - ↳ Backend Lead (Elena Rostova)
       - ↳ QA Lead (Claire Dupont)
     - **Layer 3 (Direct Team Members)**:
       - ↳ Senior Design Technologist (Sarah Chen)
       - ↳ Senior Frontend Engineer (David Patel)
       - Showing capacity score, active tickets, role tags, and direct employee drilldown.

---

### Screen 4: York.IE LMS Platform (`lms.html`)
* **Viewport**: 1440px width × Auto Height
* **Live Target**: `https://prince-p-15.github.io/foundation-figma/lms.html`
* **Layout Structure**:
  1. **LMS Header & Progress Bar**:
     - Global learner status: `82% Completed`, Next certification milestone.
  2. **Learning Pathways Banner**:
     - "Continuous Executive & Technical Learning Pathways for Series A Portfolios."
  3. **Course Module Catalog**:
     - **Track 1**: Leadership & Scaling for High-Growth Startups (6 Modules • 18 Lessons)
     - **Track 2**: Enterprise Microservices & Cloud Scale (12 Modules • 34 Lessons)
     - **Track 3**: Capital Allocation & SaaS Unit Economics (8 Modules • 22 Lessons)
  4. **Action Triggers**:
     - `Resume Track`, `View Syllabus`, `Download Certificate`.

---

### Screen 5: Alternative Executive Console v1 (`dashboard-v1.html`)
* **Viewport**: 1440px width × 1024px+
* **Live Target**: `https://prince-p-15.github.io/foundation-figma/dashboard-v1.html?preview=true`
* **Layout Structure**:
  - Compact operational view with condensed navigation rail, detailed service matrix, and raw telemetry stream.

---

## 3. Stitch Component Definitions & Rules

### Component: FlagshipCard
```yaml
type: frame
layoutMode: vertical
counterAxisSizingMode: fixed
primaryAxisSizingMode: auto
width: 420px
height: 340px
padding: 24px
itemSpacing: 16px
cornerRadius: 12px
fills: [{ type: "solid", color: "{colors.dark.bgSurface}" }]
strokes: [{ type: "solid", color: "{colors.dark.line}", weight: 1 }]
```

### Component: KPICard
```yaml
type: frame
layoutMode: vertical
layoutGrow: 1
padding: 20px
itemSpacing: 8px
cornerRadius: 8px
fills: [{ type: "solid", color: "{colors.dark.bgSurface}" }]
strokes: [{ type: "solid", color: "{colors.dark.line}", weight: 1 }]
```

### Component: HierarchyRow
```yaml
type: frame
layoutMode: horizontal
primaryAxisSizingMode: fixed
counterAxisSizingMode: auto
width: 1360px
height: 48px
paddingLeft: 24px
paddingRight: 24px
counterAxisAlignItems: center
itemSpacing: 16px
strokes: [{ type: "solid", color: "{colors.dark.line}", weight: 1 }]
```

---

## 4. How to Use this File in Google Stitch

1. Open **Google Stitch** (`stitch.withgoogle.com` or your Google Stitch workspace).
2. Create or open your project: **York Foundation Console**.
3. Go to **Settings → Design System → Import DESIGN.md**.
4. Upload or select this [`DESIGN.md`](file:///Users/prince.p/Desktop/Foundation%20Console/Foundation%20figma%20v2/DESIGN.md) file.
5. Google Stitch will automatically:
   - Configure all 1440px screens and design tokens.
   - Generate the live interactive screens across all 5 modules.
   - Provide the 1-click **Export to Figma** button to push native Figma frames directly into your Figma workspace.
