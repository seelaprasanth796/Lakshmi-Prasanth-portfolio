import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
  githubUrl?: string;
};

const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

/**
 * Works Wheel — a rotating dial of project cards. The active card always
 * docks at the right-hand "3 o'clock" slot, next to its detail panel.
 * Keyboard: Arrow keys cycle, Home/End jump. Implements the ARIA tabs pattern.
 */
export function WorksWheel({ projects, githubUrl }: Props) {
  const uid = useId();
  const n = projects.length;
  const step = 360 / n;
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState(0);
  const activeRef = useRef(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback(
    (next: number, focus = false) => {
      const target = ((next % n) + n) % n;
      const prev = activeRef.current;
      if (target !== prev) {
        // Rotate the shortest way round.
        const delta = (((((target - prev) * step + 540) % 360) + 360) % 360) - 180;
        activeRef.current = target;
        setActive(target);
        setRotation((r) => r - delta);
      }
      if (focus) tabRefs.current[target]?.focus();
    },
    [n, step],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: n - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  const current = projects[active];
  if (!current) return null;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-16">
      {/* Wheel */}
      <div className="flex flex-col items-center gap-8">
        <div
          className="relative [--wheel:19rem] sm:[--wheel:26rem] lg:[--wheel:30rem]"
          style={{ width: "var(--wheel)", height: "var(--wheel)" }}
        >
          {/* Static decoration */}
          <div aria-hidden className="absolute inset-0 rounded-full border border-hairline" />
          <div
            aria-hidden
            className="absolute inset-[12%] rounded-full border border-dashed border-hairline"
          />
          <div aria-hidden className="bg-glow-cyan absolute inset-[20%] rounded-full" />
          {/* Active slot marker at 3 o'clock */}
          <div
            aria-hidden
            className="absolute right-[-6px] top-1/2 h-10 w-[3px] -translate-y-1/2 rounded-full bg-primary"
          />

          {/* Rotating dial */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {TICKS.map((deg) => (
              <span
                key={deg}
                aria-hidden
                className={cn(
                  "absolute left-1/2 top-0 w-px origin-[50%_calc(var(--wheel)/2)]",
                  deg % 30 === 0 ? "h-3 bg-primary/50" : "h-1.5 bg-hairline",
                )}
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}

            <div
              role="tablist"
              aria-label="Projects"
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
            >
              {projects.map((p, i) => {
                const angle = i * step;
                const isActive = i === active;
                return (
                  <div
                    key={p.id}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{
                      transform: `rotate(${angle}deg) translateX(calc(var(--wheel) * 0.38))`,
                    }}
                  >
                    <button
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`${uid}-tab-${p.id}`}
                      aria-selected={isActive}
                      aria-controls={`${uid}-panel`}
                      aria-label={p.title}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(i)}
                      className={cn(
                        "group absolute left-0 top-0 w-24 overflow-hidden rounded-2xl border text-left transition-[transform,border-color,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] sm:w-36",
                        isActive
                          ? "glass-strong border-primary/60 shadow-cta"
                          : "glass-strong border-hairline opacity-75 hover:border-primary/40 hover:opacity-100",
                      )}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${-angle - rotation}deg) scale(${isActive ? 1.06 : 0.9})`,
                      }}
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <span className="hidden items-center gap-2 px-3 py-2 sm:flex">
                        <span className="font-mono text-[0.65rem] text-primary">{p.index}</span>
                        <span className="truncate text-xs font-medium text-foreground">
                          {p.shortTitle}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centre hub (does not rotate) */}
          <div
            aria-hidden
            className="glass-strong absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center sm:h-36 sm:w-36"
          >
            <div>
              <p className="font-display text-3xl font-semibold text-foreground sm:text-5xl">
                {current.index}
              </p>
              <p className="font-mono text-[0.65rem] text-muted-foreground sm:text-xs">
                / {String(n).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => select(active - 1)}
            aria-label="Previous project"
            className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <p
            className="min-w-32 text-center font-mono text-xs text-muted-foreground"
            aria-live="polite"
          >
            {current.shortTitle}
          </p>
          <button
            type="button"
            onClick={() => select(active + 1)}
            aria-label="Next project"
            className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Active project details */}
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        tabIndex={0}
        className="glass rounded-3xl p-5 sm:p-7"
      >
        <div key={current.id} className="animate-fade-up">
          <div className="overflow-hidden rounded-2xl border border-hairline">
            <img
              src={current.image}
              alt={current.imageAlt}
              width={1280}
              height={800}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <p className="eyebrow mt-6">
            {current.index} · {current.kind}
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            {current.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{current.summary}</p>

          {current.highlights.length > 0 ? (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {current.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {current.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-violet/30 px-3 py-1 font-mono text-xs text-violet"
                >
                  {t}
                </li>
              ))}
            </ul>
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                My GitHub profile
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
