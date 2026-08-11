# Storefront Homepage Design

## Goal

Modernize the Pedra Mania homepage so it feels like a real online shop, with product browsing as the primary action while preserving the existing local-business personality.

## Direction

Use a category-first storefront: a concise product-led hero, followed by shop-by-category cards, then featured products and local trust content. Keep the current blue identity but reduce decorative effects, improve spacing, and strengthen commerce cues.

## Homepage structure

1. Header with logo, product navigation, local ordering/contact access, and cart.
2. Hero with a clear value proposition and primary “Ver produtos” CTA. Secondary CTA may point to WhatsApp/local ordering.
3. Shop-by-category section in this order: Fios & Linhas; Miçangas & Bijuterias; Ferramentas & Decor; Matérias-primas; Kits & Achadinhos.
4. Featured products section with product image, name, price, tags, availability, and direct add-to-cart affordance.
5. Local trust strip for pickup/delivery in ES and WhatsApp assistance.
6. Testimonials, events, and maker/story content lower on the page.

## Content strategy

Kits are playful secondary inventory, not the primary offer. They should not dominate the hero or the first shopping section; “Kits & Achadinhos” belongs after the core materials categories. Existing products and cart behavior should be reused.

## Technical constraints

- Follow the existing React + TypeScript + Tailwind-style utility patterns.
- Reuse existing product data, cart context, and navigation behavior.
- Avoid unrelated refactors or new dependencies.
- Preserve mobile responsiveness and existing non-home views.

## Success criteria

- A visitor can understand the business and reach products within one prominent click.
- Categories clearly organize discovery before social proof content.
- Kits are present but visually secondary.
- Featured products remain add-to-cart friendly.
- Existing build and cart flows continue to work.
