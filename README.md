# Landing Page - Programmatic SEO

A modern, responsive landing page built with Next.js and Tailwind CSS.

## Tech Highlights

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Google Fonts via next/font (Plus Jakarta Sans)
- Modular React components (Hero, Illustration, Promotion)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- ✅ App Router with clean component composition
- ✅ Fully responsive layout
- ✅ Optimized local assets in `public/assets`
- ✅ Global font set to Plus Jakarta Sans

## Project Structure

```
.
├── app/
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.tsx       # Root layout, applies Plus Jakarta Sans
│   └── page.tsx         # Home page, composes feature components
├── components/
│   ├── Hero.tsx         # Hero section with CTA and social proof
│   ├── Illustration.tsx # Programmatic SEO illustration
│   └── Promotion.tsx    # Gradient promo block with MediaBoost CTA
├── public/
│   └── assets/          # Static assets used by components
│       ├── footer.svg
│       ├── hero-illustration.svg
│       ├── leftleaf.png
│       ├── rightLeaf.png
│       └── star.svg
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Linting

```bash
npm run lint
```

## Build for Production

```bash
npm run build
npm start
```
