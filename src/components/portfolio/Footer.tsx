import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-page flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-page mt-10 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
