import { about } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title={
            <>
              Data precision, <span className="text-gradient">turned into code.</span>
            </>
          }
        />
        <div data-reveal className="space-y-6">
          {about.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              {p}
            </p>
          ))}
          <dl className="grid gap-3 pt-4 sm:grid-cols-3">
            {about.facts.map((f) => (
              <div key={f.label} className="glass rounded-2xl p-4">
                <dt className="eyebrow text-[0.68rem] text-muted-foreground">{f.label}</dt>
                <dd className="mt-2 text-sm font-medium text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
