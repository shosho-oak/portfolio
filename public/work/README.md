# Project screenshots

Drop image files in the folder matching the project slug:

```
public/work/mthmr/
public/work/mwfr/
public/work/productpilot/
```

Then set the `image` field for that project in `src/lib/content.ts`:

```ts
image: { src: "/work/mthmr/dashboard.png", alt: "Mthmr merchant dashboard" },
```

That's the whole change. The card swaps from the schematic placeholder to the
real screenshot automatically. Leaving `image: null` keeps the schematic.

## What works best

- **Format** — PNG for UI screenshots, JPG for photography.
- **Size** — roughly 2400×1350 (16:9) or 2400×1650 (16:11). Anything above
  1600px wide is fine; Next resizes and serves modern formats automatically.
- **Framing** — capture the interface only, no browser chrome or OS bar. The
  card already draws its own frame, border and shadow.
- **Crop** — cards are cropped to fill, so keep the important content away from
  the extreme edges.

## Before adding anything

- Remove or blur real customer data, merchant names, balances, transaction
  figures and anything else confidential.
- Only use interfaces that are yours or that you've been cleared to publish.
