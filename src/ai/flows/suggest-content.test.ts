import { describe, it, expect } from "vitest";
import { parseBulletedList } from "@/lib/parser";

describe("parseBulletedList", () => {
  it("parses * and - bullets into an array", () => {
    const input = `
      *  Primary (Deep Teal): #3D6666
      - Accent (Burnt Orange): #FA640A
      * Background (Light Teal): #F7FCFC
      - Foreground (Deep Teal Text): #344D4D
    `;

    expect(parseBulletedList(input)).toEqual([
      "Primary (Deep Teal): #3D6666",
      "Accent (Burnt Orange): #FA640A",
      "Background (Light Teal): #F7FCFC",
      "Foreground (Deep Teal Text): #344D4D",
    ]);
  });

  it("ignores non-bulleted lines and blanks; dedupes; trims", () => {
    const input = `
      Palette
      *  Item A
      - Item B
      -   Item B
      • Item C
      
      Notes: ignore me
    `;
    expect(parseBulletedList(input)).toEqual(["Item A", "Item B", "Item C"]);
  });

  it("handles empty/undefined safely", () => {
    expect(parseBulletedList("")).toEqual([]);
    // @ts-expect-error runtime guard
    expect(parseBulletedList(undefined)).toEqual([]);
  });
});
