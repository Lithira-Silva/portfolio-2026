# Design system

## The idea

> On this page, **the koi that climbs the waterfall** becomes **the pinned story**: the name holds
> its corners while the climb passes between them.

The name is the headline, split into two halves pinned to opposite corners (`LITH` top-left, `IRA`
bottom-right). Under them the page passes from the pond, to the falls, to the dragon. After the
hero the page is deliberately calm and small so the monument keeps its scale. The name returns once
more, cropped, at the foot of every page.

**The live thing:** tap or click the pond. A pellet drops, a ripple spreads, the nearest koi turn
and race to it.

## Type

| Role | Face | Setting |
| --- | --- | --- |
| Display | Barlow Condensed 700 | uppercase, tracking −0.03em, leading 0.86 |
| Text | Barlow 400 / 500 | 16–19px, leading 1.5, 45–75ch measure |

Five size steps, never more: `--step-small`, `--step-body`, `--step-lead`, `--step-head`, and the
monument (`--step-monument`). Headlines are two lines or fewer at every width.

## Colour — Frost and slate

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#f7f9fa` | Ground |
| `--surface` | `#ecf0f2` | One tone step for bands and frames |
| `--ink` | `#1f3038` | Text, the inverted footer, the pond's depth |
| `--muted` | `#5d6b72` | Secondary notes only |
| `--accent` | `#0d7480` | The primary action, once per screen |
| `--koi` | `#e2552b` | The fish themselves; never on UI |

## House rules

- No eyebrow labels, no monospace, no 01/02/03 numbering, no hairline rules.
- No gradients, no glows, no shadows on things at rest, no glass.
- One button shape (square corners), one pair of page margins (`--gutter`).
- Surfaces separate by a tone step, never by a line.
- Every image square-cornered, same treatment.

## Motion

| Layer | What |
| --- | --- |
| Signature | Pinned story: name halves stay in the corners for three screens while the pond, the falls and the dragon pass under them. Camera dives into the pond as you leave it. |
| Entrances | Each section: heading (SplitText lines), then text, then picture — 70ms stagger, 24px rise. |
| Feedback | Buttons press to 0.97, arrow links slide, certificate frames scale to 1.08, project images drift on hover. |
| Moving picture | The pond itself; project images parallax 8% while in view. |
| Page change | An ink curtain rises and falls between routes. |

All of it respects `prefers-reduced-motion`: travel is dropped, opacity stays, the pond slows to a drift.
