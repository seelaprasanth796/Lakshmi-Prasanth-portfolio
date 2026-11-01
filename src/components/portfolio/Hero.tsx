import { Component, Suspense, lazy, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowDown, MapPin } from "lucide-react";
import { heroStats, profile } from "@/data/portfolio";
import { CtaLink } from "./CtaLink";

const HeroOrb = lazy(() => import("./HeroOrb"));

/** Falls back to the static orb if WebGL is unavailable. */
class OrbBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticOrb() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="animate-orb-pulse h-[55%] w-[55%] rounded-full border border-primary/30 bg-glow-cyan" />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="bg-glow-violet absolute -left-40 top-10 -z-10 h-[36rem] w-[36rem]"
      />
      <div
        aria-hidden
        className="bg-glow-cyan absolute -right-32 top-24 -z-10 h-[40rem] w-[40rem]"
      />

      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <div className="relative z-10">
          <p
            className="eyebrow animate-fade-up flex items-center gap-2 text-muted-foreground"
            style={{ animationDelay: "60ms" }}
          >
            <MapPin aria-hidden className="h-3.5 w-3.5 text-primary" />
            {profile.location}
          </p>

          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-[2.75rem] font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "140ms" }}
          >
            <span className="block">{profile.firstName}</span>
            <span className="text-gradient block">{profile.lastName}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 font-mono text-sm tracking-wide text-primary sm:text-base"
            style={{ animationDelay: "220ms" }}
          >
            <span className="block sm:inline">Python Full Stack Developer</span>
            <span aria-hidden className="hidden px-2 text-muted-foreground sm:inline">
              |
            </span>
            <span className="sr-only sm:hidden"> | </span>
            <span className="block sm:inline">Data Analyst</span>
          </p>

          <p
            className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={{ animationDelay: "300ms" }}
          >
            “{profile.tagline}”
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "380ms" }}
          >
            <CtaLink href="#projects" size="lg">
              Explore My Work
              <ArrowDown aria-hidden />
            </CtaLink>
            <CtaLink href="#contact" variant="glass" size="lg">
              Contact Me
            </CtaLink>
          </div>

          <dl
            className="animate-fade-up mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6"
            style={{ animationDelay: "460ms" }}
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[30rem] lg:max-w-none">
          <div aria-hidden className="bg-glow-cyan absolute inset-[10%] rounded-full" />
          <ClientOnly fallback={<StaticOrb />}>
            <OrbBoundary fallback={<StaticOrb />}>
              <Suspense fallback={<StaticOrb />}>
                <HeroOrb />
              </Suspense>
            </OrbBoundary>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
