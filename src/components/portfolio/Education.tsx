import { GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { education, type EducationItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const icons: Record<EducationItem["type"], typeof GraduationCap> = {
  Degree: GraduationCap,
  Training: BookOpen,
  Workshop: Sparkles,
};

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0" />
      <div className="container-page">
        <SectionHeading
          id="education-title"
          index="05"
          eyebrow="Education & Training"
          title="Always learning"
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((item) => {
            const Icon = icons[item.type];
            return (
              <li key={item.title} data-reveal>
                <article
                  className={cn(
                    "glass flex h-full gap-5 rounded-3xl p-6",
                    item.current && "border-primary/40",
                  )}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{item.type}</span>
                      {item.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-primary">
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                          />
                          Current
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground/80">{item.org}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span>{item.period}</span>
                      {item.detail ? <span className="text-primary">{item.detail}</span> : null}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
