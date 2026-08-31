# Shahad Qumosani — Portfolio

Personal portfolio site for Shahad Qumosani, Product Designer.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/                  # routes, global styles, generated icon + OG image
├── components/site/      # page sections (nav, hero, work, about, …)
├── components/ui/        # shadcn/ui primitives
└── lib/
    ├── content.ts        # all site copy and project data
    └── motion.ts         # shared animation language

public/work/              # project imagery, one folder per project
```

## Editing content

All copy, project data, links and image references live in `src/lib/content.ts`.
Adding a screenshot is a two-step change: drop the file in
`public/work/<slug>/`, then add it to that project's `images` array. See
`public/work/README.md` for details.

## Deployment

Deployed on [Vercel](https://vercel.com). Once a domain is attached, set
`metadataBase` in `src/app/layout.tsx` so social share images resolve against it.
