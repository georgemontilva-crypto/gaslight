/**
 * The product lines, in the order the site shows them.
 *
 * A line is just the `collection` text on a product; this file only adds the
 * order and the copy each line gets on the public pages. A line created from
 * the admin that isn't listed here still shows up, after these, without a blurb.
 */
export type LineInfo = {
  name: string;
  /** Used in the URL filter on the Products page. */
  slug: string;
  /** Short format line shown next to the name. */
  format: string;
  blurb: string;
};

export const LINES: LineInfo[] = [
  {
    name: "THC Gusherz",
    slug: "gusherz",
    format: "Hash hole pre-rolls, 10 count, 2.0G each",
    blurb:
      "Hash holes: indoor flower rolled around a core of hash badder. Ten two-gram pre-rolls to a tube.",
  },
  {
    name: "THC Melted Diamond",
    slug: "melted-diamond",
    format: "Infused pre-rolls, 25 count, 1.5G each",
    blurb:
      "Indoor exotic flower finished with melted diamonds. Twenty-five 1.5-gram pre-rolls to a jar.",
  },
  {
    name: "THC Pre-Rolls",
    slug: "pre-rolls",
    format: "Indoor exotic pre-rolls, 40 count, 1.25G each",
    blurb:
      "Straight indoor exotic flower, 1.25 grams a roll. Forty to a jar, or forty single pouches in a display box.",
  },
];

export function lineInfo(name: string | null | undefined): LineInfo | null {
  if (!name) return null;
  return LINES.find(l => l.name.toLowerCase() === name.toLowerCase()) ?? null;
}

export function lineSlug(name: string | null | undefined): string {
  const known = lineInfo(name);
  if (known) return known.slug;
  return (name ?? "other")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Groups products by line, known lines first in the order above, then any
 * others alphabetically. Products without a line land in a final "Other" group.
 */
export function groupByLine<T extends { collection: string | null }>(
  items: T[]
): { name: string; info: LineInfo | null; items: T[] }[] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = item.collection?.trim() || "Other";
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  const rank = (name: string) => {
    const at = LINES.findIndex(
      l => l.name.toLowerCase() === name.toLowerCase()
    );
    if (at !== -1) return at;
    return name === "Other" ? Number.MAX_SAFE_INTEGER : LINES.length;
  };
  return Array.from(groups.entries())
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([name, list]) => ({ name, info: lineInfo(name), items: list }));
}
