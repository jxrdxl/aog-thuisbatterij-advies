# Project TODO

## Completed Items
- [x] Design system: color palette, typography, global CSS theming (green/blue energy theme)
- [x] Database schema: leads table for form submissions
- [x] Hero section with countdown timer to Jan 1, 2027 and urgent messaging
- [x] Interactive savings calculator (input solar panels → personalized cost projection)
- [x] Multi-step lead capture form (6 questions, Warmtefonds eligibility)
- [x] Trust signals section (Financieel Dagblad, RTL Nieuws, NOS, Consumentenbond, Rijksoverheid)
- [x] WhatsApp Business integration (click-to-chat button)
- [x] Mobile-first responsive design optimized for Facebook/Instagram ad traffic
- [x] Value propositions section (€240 free report, €1,645 savings, 0% financing)
- [x] FAQ accordion section (common objections about home batteries)
- [x] Social proof section (anonymized testimonials and success stories)
- [x] Sticky CTA buttons visible during scroll
- [x] Backend tRPC routes for lead submission and storage
- [x] Vitest tests for backend lead submission
- [x] SEO meta tags and Open Graph tags
- [x] Upload static assets to CDN
- [x] How It Works section (4 steps)
- [x] Urgency banner section
- [x] Final CTA section
- [x] Footer with contact info and links
- [x] Header with scroll-aware transparency
- [x] UTM parameter tracking on form submissions
- [x] Owner notification on new lead

## Optimization Tasks (Completed - 10 Mar 2026)
- [x] **TAAK 1**: Formulier Vereenvoudigen (6 stappen → 2 stappen)
  - Stap 1: Kwalificatie (zonnepanelen + eigenaar)
  - Stap 2: Contactgegevens (naam + telefoon + optioneel email/postcode)
  - Urgency banner toegevoegd boven formulier
  
- [x] **TAAK 2**: Bedankpagina Aanmaken (/bedankt)
  - Success message met naam
  - 3-stappen uitleg wat er gebeurt
  - WhatsApp knop voor direct contact
  - Facebook Pixel CompleteRegistration event
  
- [x] **TAAK 3**: Facebook Pixel Events Implementeren
  - InitiateCheckout: bij formulier start
  - AddToCart: bij stap 2 bereikt
  - Lead: bij form submit met value €240
  - CompleteRegistration: op bedankpagina
  
- [x] **TAAK 4**: CTA Tekst Verbeteren
  - Header: "Vraag rapport aan" → "Start gratis check"
  - Hero: "Start gratis bespaar-check — 90 sec" → "Start gratis check — 2 minuten"
  - Sticky CTA: "Gratis rapport" → "Start check"
  - Final CTA: "Vraag gratis rapport aan" → "Start gratis energiecheck"
  - WhatsApp message: meer specifiek en actie-gericht
  
- [x] **TAAK 5**: Urgentie Toevoegen Boven Formulier
  - Amber urgency banner met ⚡ icoon
  - "Nog beschikbaar deze week" + "47 minuten gemiddelde terugbeltijd"
  - "Nog 23 plekken in uw regio"

## Expected Impact
- **Form friction**: 6 stappen → 2 stappen (66% reduction)
- **Estimated conversion improvement**: 3% → 8-12% (based on form simplification + pixel tracking)
- **Lead quality**: Maintained with qualification questions
- **Mobile UX**: Optimized for 30-second completion per step
