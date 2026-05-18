# Master Project Context: Playa Cleaning

## 1. Enterprise Vision & Scale Architecture

### Core Business Identity

- **Entity & Framework:** Playa Cleaning is not a localized mom-and-pop cleaning company. It is built from the ground up as a high-end, hyper-systematized, data-driven "Business-in-a-Box" property care ecosystem designed for federal rollout and multi-state fleet scaling.
- **Parent Corporate Structure:** Managed under **Angara Lab LLC** (the primary corporate entity used for multi-directional cleaning, trades, and invoicing footprints).
- **Service Evolution Runway:** While currently focused on premium general, deep, carpet, and upholstery cleaning, the codebase and architecture are built to horizontally scale into full home service verticals (Licensed Trades, Electrical, Full Renovation, Luxury Wallpaper Installation) using localized DBAs under the parent corporate shield.

### Market Positioning & Brand Voice

- **Target Demographic:** High-Ticket / White-Glove Surface and Structural Care. We cater to affluent residential homeowners, luxury short-term rental managers (Airbnb/Vrbo portfolios), and elite commercial spaces.
- **Brand Tone:** Balances premium craftsmanship, absolute scientific/medical-grade execution, and structural authority. The customer should feel they are dealing with specialized asset preservation technicians, not basic labor.

### National Growth & Geographic Infrastructure

- **Geographic Silos:** Built for nationwide localization. The app utilizes decoupled, slugs-driven dynamic routing (`/locations/[slug]` and `/services/[slug]`) to act locally but dominate nationally.
- **Local Conversion Mechanics:** Leverages dynamic components like localized landing pages, dynamic regional pricing matrixes, and neighbor tickers to establish immediate trust within localized neighborhoods while operating out of a unified repository.

---

## 2. Technical Stack Specification

- **Framework:** Next.js (App Router Architecture, React 19 production build parameters)
- **Styling:** Tailwind CSS v4 (Leveraging native `@import "tailwindcss"` engine and `@theme inline` tokens)
- **Core Design Components:** Custom design elements integrated with Shadcn UI primitives.
- **Backend / Content Management:** Strapi CMS integration via clean API boundary layers.
- **Server Environment:** Highly secure Kamatera cloud instances running Ubuntu, ufw, fail2ban, and Netdata monitoring.
- **Tracking & Analytics Infrastructure:** Global Google Tag Manager (GTM) deployment. Hardcoded `gtag.js` script blocks are strictly banned to prevent script collisions, hydration issues, and data leakage. All tags fire manually via `AW-` and `G-` IDs routed inside GTM.

---

## 3. Strict Development & "Vibecoding" Rules

### Rule 1: Theme Variables & Color Integrity (Tailwind v4 OKLCH)

We strictly use functional, fluid utility variables mapped inside `app/globals.css`.

- **NO HARDCODED COLOR VALUES:** Never write raw hexadecimal strings (`#3478CA`), RGB vectors, or native static Tailwind keywords (`bg-blue-600`, `text-amber-400`) into code files.
- **Semantic Canvas Tokens:**
  - Standard App Background Canvas: `bg-background` / Standard Text Color: `text-foreground`
  - Content Modules, Popovers, & Cards: `bg-card text-card-foreground` or `bg-muted`
  - Layout Grid Seams, Borders, & Lines: `border-border` / Outlines: `outline-ring/50`
- **Brand Theme Mappings:**
  - Primary Corporate Accent Blue: `bg-primary-blue` or `text-primary-blue`
  - Highlighting / Alert Elements: `bg-accent-yellow`, `text-accent-green`
  - Header Blurs & Background Core Gradients: `from-top-blur/50`
- **Vector Assets:** For inline SVGs, mask lines, or slope dividers, colors must link dynamically via CSS properties: `fill="var(--color-background)"` or `stroke="var(--color-border)"`.

### Rule 2: TypeScript Strictness & Type Safety

The repository uses production compilation checkers. Leaving arrays un-typed or using loose `any` statements will fail the verification process and crash deployments.

- **Centralized Domain Types:** Always look into `app/types/` to extract existing layout parameters:
  - Service Data Matrices: Use `ServiceData` from `@/app/types/serviceTypes`
  - Regional Tracking Silos: Use `LocationRecord` from `@/app/types/locationTypes`
- **Component Parameter Declarations:** When passing Vector configurations or component states like Lucide Icons down to child layers, declare precise interface signatures:
  ```tsx
  import { LucideIcon } from "lucide-react"
  interface FeatureProps {
    title: string;
    description: string;
    icon: LucideIcon;
  }
  ```
