import { skillGroups } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="Skills"
          title="Tools I work with"
          description="Grouped by area — from Python and web development to computer-vision data preparation."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <li key={group.title} data-reveal>
              <article
                className={cn(
                  "glass flex h-full flex-col rounded-3xl p-6 transition-colors duration-300 hover:border-primary/30",
                  group.current && "border-violet/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {group.current ? (
                    <span className="rounded-full border border-violet/40 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-violet">
                      In progress
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm text-foreground/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
