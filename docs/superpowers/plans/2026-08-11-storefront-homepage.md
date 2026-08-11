# Storefront Homepage Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the Pedra Mania homepage into a category-first storefront that prioritizes product discovery and add-to-cart actions.

**Architecture:** Keep the existing App composition, cart context, product API, and page routing. Replace the homepage’s visual hierarchy through focused changes to Hero, ProductGrid, and a new category section, while moving kits lower in the category order and preserving the existing supporting sections.

**Tech Stack:** React, TypeScript, Tailwind-style utility classes, lucide-react, Vite.

---

## Chunk 1: Homepage storefront hierarchy

### Task 1: Add category shopping section

**Files:**
- Create: `components/ShopByCategory.tsx`
- Modify: `App.tsx`

- [ ] Add a typed category card list using the five approved category labels and existing `Category` values.
- [ ] Render category cards with clear titles, short descriptions, visual treatments, and navigation into the products view.
- [ ] Place the section after the hero and before featured products; keep `kits` last.
- [ ] Run the TypeScript/Vite build to verify the new component compiles.

### Task 2: Modernize hero for shopping intent

**Files:**
- Modify: `components/Hero.tsx`

- [ ] Replace “Ver Kits da Semana” with a product-led CTA such as “Explorar produtos”.
- [ ] Keep a secondary local-order/WhatsApp path without making it the dominant action.
- [ ] Reduce decorative badges/blobs and strengthen hierarchy, contrast, and mobile spacing.
- [ ] Preserve the existing brand name and Portuguese copy.

### Task 3: Improve featured product presentation

**Files:**
- Modify: `components/ProductGrid.tsx`

- [ ] Rename the section to communicate featured or popular products rather than kits.
- [ ] Ensure product cards expose price, tags, stock/availability, and add-to-cart behavior clearly.
- [ ] Keep the existing API and cart context integration; do not duplicate product state.
- [ ] Verify the section remains responsive at mobile and desktop widths.

## Chunk 2: Supporting conversion polish

### Task 4: Refine header and supporting homepage order

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `App.tsx`

- [ ] Update navigation wording so “Produtos” is the strongest shopping entry point.
- [ ] Add or reposition a compact local trust strip using existing content/components where practical.
- [ ] Keep testimonials, events, and maker content below primary shopping sections.
- [ ] Preserve cart access, mobile menu behavior, admin access, and non-home routes.

### Task 5: Verify homepage and regression behavior

**Files:**
- Test: existing project build and browser behavior

- [ ] Run `npm run build`.
- [ ] Inspect the homepage for TypeScript errors, broken imports, and console errors.
- [ ] Check category navigation, product add-to-cart, cart drawer, checkout entry, and mobile layout.
- [ ] Review the final diff for unrelated changes.
