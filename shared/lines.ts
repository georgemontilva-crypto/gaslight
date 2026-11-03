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
    format: "Hash hole pre-rolls, 2 per pouch, 2.0G each",
    blurb:
      "Hash holes: indoor flower rolled around a core of hash badder. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.",
  },
  {
    name: "Diamond Infused",
    slug: "diamond-infused",
    format: "THC pre-rolls, 3 per pouch, 1.5G each",
    blurb:
      "Indoor exotic flower infused with diamonds. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.",
  },
  {
    name: "THC Pre-Rolls",
    slug: "pre-rolls",
    format: "Indoor exotic, single 1.25G pre-roll",
    blurb:
      "Straight indoor exotic flower, one 1.25-gram pre-roll to a pouch, forty pouches to a display.",
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
