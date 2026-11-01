import { Award } from "lucide-react";
import { achievements } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="achievements-title"
          index="06"
          eyebrow="Achievements"
          title="Results that were measured"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <li key={a.title} data-reveal>
              <article className="glass relative h-full overflow-hidden rounded-3xl p-6">
                {i === 0 ? (
                  <div
                    aria-hidden
                    className="bg-glow-violet absolute -right-16 -top-16 h-48 w-48"
                  />
                ) : null}
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-violet">
                    {a.tag}
                  </span>
                  {i === 0 ? <Award className="h-5 w-5 text-violet" aria-hidden /> : null}
                </div>
                <h3 className="relative mt-8 text-xl font-semibold leading-snug text-foreground">
                  {a.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {a.detail}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
