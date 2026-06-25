# SOLVRA — Premium AI Studio

## Project
Static HTML/CSS/JS site. Deployed on Netlify at https://solvrapremium.netlify.app/
No build tool. All changes go directly to HTML files.
Netlify reads the root directory. Do not add a build command.
Do not break `<form name="solvra-leads" netlify>` at bottom of index.html.
Keep `chatbot.js` and `gate.js` loaded — do not remove.

## Brand
- Studio name: SOLVRA (always caps)
- Founder: Huzaifa Imran
- Services: Custom AI Agents, AI Automation, AI Chatbots, Web Development, UI/UX Design, Business AI Systems
- Voice: Confident, specific, premium. No buzzwords (no seamless/empower/leverage). First person or studio "we".

## Colors
```
--bg-0:     #050505
--bg-1:     #080706
--bg-2:     #0D0A08
--bg-3:     #111009
--gold:     #C4965A
--gold-lg:  #D8A84E
--gold-br:  #F3C76A
--bronze:   #9C6B2F
--ink:      #F5EFE7
--ink-md:   #A9A29A
--ink-faint:rgba(245,239,231,0.40)
--border:   rgba(255,210,140,0.12)
--border-s: rgba(255,255,255,0.06)
--border-d: #1A1814
```

## Typography
- Display: Cormorant Garamond (headings, pull quotes)
- Body: DM Sans (body copy, descriptions)
- Mono: JetBrains Mono (labels, tags, nav, buttons)
- Max 3 font families total

## Hard Rules (do not violate)
- NO gradient text (no background-clip: text with gradient)
- NO fake testimonials with invented names
- NO eyebrow labels on every section (maximum 2 sections may use them)
- NO hero metric template (big numbers in a bar is banned)
- NO side-stripe borders (border-left/right > 1px as accent)
- NO glassmorphism on cards — only on the nav (purposeful, not decorative)
- NO identical same-sized card grids repeating endlessly
- Headings: solid color only — use #F5EFE7 or #C4965A
- Body text contrast: minimum 4.5:1 against bg

## Animation
- GSAP + ScrollTrigger for scroll reveals
- Hero timeline on load (GSAP)
- ease: power3.out or power2.out, never bounce/elastic
- All animations must respect prefers-reduced-motion
- Elements must be visible by default (no CSS opacity:0 on content)
- Cursor: gold dot + lagging ring, hide on touch devices

## Responsive
- Desktop: 1280px+ full layout
- Tablet: 1024px breakpoint
- Mobile: 600px breakpoint
- Test nav, hero, cards, and pricing at every breakpoint

## Sections (index.html)
1. Nav — sticky glass, logo, links, CTA
2. Hero — full-viewport, particle canvas, parallax BG
3. Services — 6-card bento grid (first card featured)
4. Why SOLVRA — 2-col asymmetric
5. Process — 5-step horizontal sequence
6. Projects — horizontal scroll cards
7. Tech Stack — compact strip
8. Pricing — 3 tier cards
9. What Clients Value — 4 outcome cards (no fake quotes)
10. FAQ — accordion, 6 questions
11. Final CTA — full-width
12. Footer

## Copy rules
- No em dashes. Use commas, colons, periods.
- No aphoristic short-negation cadence throughout
- No all-caps body copy
- Buttons: verb + object ("Build My AI System", "View Services")
