# PRD — Abhishek Gopal Band Portfolio

## Original Problem Statement
Build a premium, animated, Awwwards-level personal portfolio from the user's uploaded Resume PDF + professional photo. Inspired by Apple/Linear/Framer/Notion. Royal Blue (#0F4C81), white, cyan accents; glassmorphism; Space Grotesk + Inter; dark & light mode. Sections: Hero (photo), About, Education, Experience, Skills, Featured Projects, Interests, Career Objective, Contact, Footer. Rules: resume is the only source of truth; NEVER show SSC/HSC marks; selectable HTML text; ATS/SEO/LLM-friendly with semantic HTML + JSON-LD Person schema.

## User Choices (confirmed)
- Default theme: Dark (light mode toggle available, persisted in localStorage)
- Contact: working form → saved to backend (email notification not yet set up)
- No resume download button

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + sonner. Components in `src/components/portfolio/`, content data in `src/data/portfolio.js` (single source from resume).
- Backend: FastAPI `POST /api/contact` (validated: name/email/message) → MongoDB `contact_messages` collection.
- SEO: semantic HTML (header/nav/main/section/footer), meta + OG/Twitter tags, JSON-LD Person schema in `public/index.html`.
- Photo: user's uploaded photo saved at `frontend/public/profile.webp`.

## User Personas
- Recruiters/hiring managers scanning experience, skills, and contacting quickly
- ATS/search engines/LLMs reading structured semantic content

## Implemented (2026-09-11)
- Kinetic hero: masked line-by-line headline reveal, typing roles, floating gradient orbs, rotating conic glow + floating photo card, animated counters, magnetic CTAs
- Slow editorial marquee ticker
- About with numbered manifesto chapters (01/02/03)
- Education (PGDM IMDR Pune pursuing, B.Tech 7.15 CGPA) — SSC/HSC fully omitted per rule
- Experience timeline (Yashveer Group — current; Gramlok internship)
- Skills: 4 groups of glowing hover pills
- Projects: 3D tilt cards — Apna E-School, Yashveer Group, AI Marketing Workflow
- Interests + Career Objective quote card
- Working contact form → backend → success/error toasts (verified end to end)
- Footer: giant kinetic name, quick links, availability badge
- Dark default + light mode toggle, scroll progress bar, lenis momentum scrolling

## Verified
- `GET /api/` health OK; `POST /api/contact` saves + returns doc; invalid payload → 422
- UI: all sections screenshot-verified; form submitted via UI with success toast; light mode toggle verified

## Backlog
- P0: Email notification on new enquiry (Resend integration)
- P1: Admin view of contact enquiries
- P1: Custom domain + real canonical/OG URLs
- P2: Case-study detail pages per project, blog/writing section
