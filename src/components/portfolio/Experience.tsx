import { Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="04"
          eyebrow="Experience"
          title="Where precision became a habit"
        />

        <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <div data-reveal>
            <article className="glass rounded-3xl p-6 lg:sticky lg:top-28">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/40 text-primary">
                <Briefcase className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-foreground">{experience.role}</h3>
              <p className="mt-2 text-foreground/90">{experience.company}</p>
              <p className="text-sm text-muted-foreground">{experience.location}</p>
              <p className="mt-5 inline-block rounded-full border border-border px-3 py-1 font-mono text-xs text-primary">
                <time>{experience.period}</time>
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {experience.summary}
              </p>
            </article>
          </div>

          <ol className="relative space-y-4" aria-label="Key achievements">
            <span
              aria-hidden
              className="bg-gradient-line absolute bottom-6 left-[11px] top-6 w-px"
            />
            {experience.achievements.map((a) => (
              <li key={a.text} data-reveal className="relative pl-10">
                <span
                  aria-hidden
                  className="absolute left-[5px] top-1/2 h-[13px] w-[13px] -translate-y-1/2 rounded-full border-2 border-primary bg-background"
                />
                <div className="glass flex flex-col gap-1 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                  <p className="font-display text-2xl font-semibold text-gradient sm:w-28 sm:shrink-0 sm:text-3xl">
                    {a.metric}
                  </p>
                  <p className="text-foreground/90">{a.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
