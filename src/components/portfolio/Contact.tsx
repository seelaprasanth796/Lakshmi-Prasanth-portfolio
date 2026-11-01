import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { CtaLink } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Phone",
    value: profile.phoneDisplay,
    href: profile.phoneHref,
    icon: Phone,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "prasanth-seela",
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "seelaprasanth796",
    href: profile.github,
    icon: Github,
    external: true,
  },
] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please select the address instead");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="bg-glow-cyan absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[50rem] -translate-x-1/2"
      />
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          index="07"
          eyebrow="Contact"
          title={
            <>
              Let’s build something <span className="text-gradient">practical.</span>
            </>
          }
          description="Reach me by email or phone, or connect on LinkedIn and GitHub."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div data-reveal className="glass flex flex-col justify-between gap-8 rounded-3xl p-7">
            <div>
              <p className="eyebrow text-muted-foreground">Write to me</p>
              <p className="mt-3 break-all font-display text-base font-semibold text-foreground sm:text-2xl">
                {profile.email}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                {profile.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaLink href={`mailto:${profile.email}`}>
                <Mail aria-hidden />
                Send an email
              </CtaLink>
              <button
                type="button"
                onClick={copyEmail}
                className="glass inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm text-foreground transition-colors hover:text-primary"
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden />
                )}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.label} data-reveal>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass group flex h-full flex-col justify-between gap-8 rounded-3xl p-6 transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="mt-1 block break-all text-base font-medium text-foreground">
                        {c.value}
                      </span>
                      {c.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
