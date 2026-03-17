import { describe, it, expect } from "vitest";
import { cn, formatDate, slugify, extractHeadings } from "@/lib/utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters falsy values", () => {
    expect(cn("a", undefined, false, null, "b")).toBe("a b");
  });

  it("returns empty string for no valid classes", () => {
    expect(cn(undefined, false)).toBe("");
  });
});

describe("formatDate", () => {
  it("formats ISO date string", () => {
    const result = formatDate("2026-03-10");
    expect(result).toContain("March");
    expect(result).toContain("10");
    expect(result).toContain("2026");
  });

  it("formats full ISO datetime", () => {
    const result = formatDate("2026-01-15T00:00:00.000Z");
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2026");
  });
});

describe("slugify", () => {
  it("converts text to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes diacritics", () => {
    expect(slugify("café")).toBe("cafe");
  });

  it("handles special characters", () => {
    expect(slugify("What's New?")).toBe("what-s-new");
  });

  it("returns 'heading' for empty input", () => {
    expect(slugify("")).toBe("heading");
  });

  it("preserves Arabic characters", () => {
    const result = slugify("مرحبا");
    expect(result).toContain("مرحبا");
  });
});

describe("extractHeadings", () => {
  it("extracts H2 and H3 headings", () => {
    const content = `
## First Section

Some text

### Subsection

More text

## Second Section
`;
    const headings = extractHeadings(content);
    expect(headings).toHaveLength(3);
    expect(headings[0]).toEqual({ level: 2, text: "First Section", id: "first-section" });
    expect(headings[1]).toEqual({ level: 3, text: "Subsection", id: "subsection" });
    expect(headings[2]).toEqual({ level: 2, text: "Second Section", id: "second-section" });
  });

  it("ignores H1 and H4+ headings", () => {
    const content = `
# Title

## Section

#### Deep heading
`;
    const headings = extractHeadings(content);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe("Section");
  });

  it("returns empty array for no headings", () => {
    expect(extractHeadings("Just plain text")).toEqual([]);
  });
});
