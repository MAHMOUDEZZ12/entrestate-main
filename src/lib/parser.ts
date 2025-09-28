/**
 * Parse a bulleted multiline string into distinct items.
 * Accepts lines starting with "*", "-", or "•". Ignores blanks and deduplicates.
 */
export function parseBulletedList(input: string): string[] {
  if (!input) return [];

  const lines = input.split(/\r?\n/);

  const items = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^[*\-•]\s+(.*)$/);
      return match ? match[1].trim() : null;
    })
    .filter((value): value is string => Boolean(value))
    .map((value) => value.replace(/\s+/g, ' ').trim());

  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
