<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- All portfolio content lives in `src/data/portfolio.ts`; sections in `src/components/portfolio/` only render it. Why: one place to edit facts and avoid invented content creeping into components.
- The hero 3D orb (`HeroOrb.tsx`) is lazy-loaded behind `<ClientOnly>` with a static CSS fallback and pauses rendering when offscreen or under reduced motion. Why: keeps three.js out of SSR and the first paint fast.
- Scroll reveals use GSAP via `useScrollReveal` on `[data-reveal]` wrappers (no CSS transitions on those wrappers); hero entrance uses CSS keyframes. Why: avoids SSR flash and tween/transition conflicts; both respect reduced motion.
- `backup/original-template/` holds the pre-portfolio starter files as `.bak`; do not import from it.
