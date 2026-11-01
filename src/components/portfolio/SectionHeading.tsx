import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
};

export function SectionHeading({ index, eyebrow, title, description, id }: Props) {
  return (
    <div data-reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-muted-foreground">{index}</span>
        <span aria-hidden className="h-px w-8 bg-primary/60" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
