import { profile, projects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { WorksWheel } from "./WorksWheel";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0" />
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Projects"
          title="Selected work"
          description="Turn the wheel — click a card, use the arrows, or press ← → on your keyboard."
        />
        <div data-reveal>
          <WorksWheel projects={projects} githubUrl={profile.github} />
        </div>
      </div>
    </section>
  );
}
