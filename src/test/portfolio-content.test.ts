import { describe, expect, it } from "vitest";
import { profile, projects } from "@/data/portfolio";

describe("portfolio contact details", () => {
  it("dials the supplied phone number", () => {
    expect(profile.phoneHref).toBe("tel:+918500093155");
  });

  it("links only the supplied LinkedIn and GitHub profiles", () => {
    expect(profile.linkedin).toBe("https://www.linkedin.com/in/prasanth-seela-a41867239");
    expect(profile.github).toBe("https://github.com/seelaprasanth796");
  });

  it("uses the supplied email", () => {
    expect(profile.email).toBe("seelaprasanth796@gmail.com");
  });
});

describe("projects", () => {
  it("lists exactly the three supplied projects in order", () => {
    expect(projects.map((p) => p.id)).toEqual(["medicinal-leaf", "jarvis", "event-management"]);
  });

  it("does not claim any J.A.R.V.I.S. features until they are confirmed", () => {
    expect(projects.find((p) => p.id === "jarvis")?.highlights).toEqual([]);
  });
});
