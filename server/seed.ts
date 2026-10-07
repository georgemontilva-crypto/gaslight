/**
 * Carga inicial del catálogo de Gas Light: las 18 cepas de las tres líneas,
 * con las fotos que vienen en el repo (client/public/products) y los datos que
 * están impresos en los empaques.
 *
 * Es idempotente y aditivo. Un producto cuyo slug ya existe se deja tal cual,
 * así que correrlo contra una base que ya se editó desde el panel no puede
 * deshacer ese trabajo. Dos formas de correrlo, la misma lógica en las dos:
 *
 *   SEED_CATALOG=true                    (en Railway; corre una vez al arrancar)
 *   DATABASE_URL="…" pnpm seed           (desde una máquina que alcance la BD)
 *
 * No carga reportes de laboratorio: esos se suben desde /admin/lab-reports.
 */
import "dotenv/config";
import type { Strain } from "@shared/const";
import { LINES } from "@shared/lines";
import * as db from "./db";

type SeedProduct = {
  name: string;
  strain: Strain;
  accent: string;
};

type SeedLine = {
  /** Debe coincidir con un nombre de shared/lines.ts. */
  collection: string;
  slugPrefix: string;
  subtitle: string;
  /** La línea trae una segunda foto por cepa: `<slug>-box.webp`. */
  hasBoxShot?: boolean;
  describe: (name: string, strain: Strain) => string;
  facts: string[];
  products: SeedProduct[];
};

const COMPLIANCE_FACTS = [
  "Delta-9 THC: <0.3% on a dry weight basis",
  "Delta-8: None",
  "Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153",
];

const article = (strain: Strain) =>
  strain === "hybrid" ? "A hybrid" : strain === "indica" ? "An indica" : "A sativa";

const CATALOG: SeedLine[] = [
  {
    collection: "THC Gusherz",
    slugPrefix: "gusherz",
    subtitle: "10 count, 2.0G per pre-roll",
    describe: (name, strain) =>
      `${name} as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. ${article(strain)}. Ten two-gram pre-rolls to a tube, 20 grams in all.`,
    facts: [
      "Count: 10 pre-rolls",
      "Per pre-roll: 2.0 G",
      "Net weight: 20 G (0.71 oz)",
      "Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring",
      ...COMPLIANCE_FACTS,
    ],
    products: [
      { name: "Blue Dream", strain: "hybrid", accent: "#19c8f0" },
      { name: "White Runtz", strain: "hybrid", accent: "#f05aa8" },
      { name: "Green Crack", strain: "sativa", accent: "#dfe32b" },
      { name: "Sour Diesel", strain: "sativa", accent: "#f2c935" },
      { name: "Granddaddy Purple", strain: "indica", accent: "#b584f5" },
      { name: "Northern Lights", strain: "indica", accent: "#f224b8" },
    ],
  },
  {
    collection: "THC Melted Diamond",
    slugPrefix: "melted-diamond",
    subtitle: "25 count, 1.5G per pre-roll",
    describe: (name, strain) =>
      `${name} in the Melted Diamond line: indoor exotic flower finished with melted diamonds. ${article(strain)}. Twenty-five 1.5-gram pre-rolls to a jar, 37.5 grams in all.`,
    facts: [
      "Count: 25 pre-rolls",
      "Per pre-roll: 1.5 G",
      "Net weight: 37.5 G (1.32 oz)",
      ...COMPLIANCE_FACTS,
    ],
    products: [
      { name: "Grease Monkey", strain: "hybrid", accent: "#ef2233" },
      { name: "Permanent Marker", strain: "hybrid", accent: "#16d163" },
      { name: "Durban Poison", strain: "sativa", accent: "#f4532f" },
      { name: "Super Lemon Haze", strain: "sativa", accent: "#e8ea22" },
      { name: "Slurricane", strain: "indica", accent: "#a67bf0" },
      { name: "Blue Zushi", strain: "indica", accent: "#2dd3e4" },
    ],
  },
  {
    collection: "THC Pre-Rolls",
    slugPrefix: "pre-rolls",
    subtitle: "40 count, 1.25G per pre-roll",
    hasBoxShot: true,
    describe: (name, strain) =>
      `${name}, rolled straight: indoor exotic flower and nothing else. ${article(strain)}. Comes as a jar of forty 1.25-gram pre-rolls, or as a display box of forty single pouches. 50 grams either way.`,
    facts: [
      "Count: 40 pre-rolls",
      "Per pre-roll: 1.25 G",
      "Net weight: 50 G (1.76 oz)",
      "Packs: 40-count jar, or display box of 40 single pouches",
      ...COMPLIANCE_FACTS,
    ],
    products: [
      { name: "Strawberry Cough", strain: "sativa", accent: "#ee2030" },
      { name: "Jack Herer", strain: "sativa", accent: "#6fd9e8" },
      { name: "White Runtz", strain: "hybrid", accent: "#f1e9dc" },
      { name: "Rainbow Belts", strain: "hybrid", accent: "#f04bb0" },
      { name: "King Louie", strain: "indica", accent: "#cfe52a" },
      { name: "Black Truffle", strain: "indica", accent: "#e2b56c" },
    ],
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function seedCatalog(): Promise<void> {
  let created = 0;

  for (const line of CATALOG) {
    // El orden de las líneas sale del mismo sitio que usa la web pública, para
    // que el panel y el sitio no puedan quedar ordenados distinto.
    const lineIndex = Math.max(
      0,
      LINES.findIndex(l => l.name === line.collection)
    );

    for (let i = 0; i < line.products.length; i++) {
      const p = line.products[i];
      const slug = `${line.slugPrefix}-${slugify(p.name)}`;

      if (await db.getProductBySlug(slug)) {
        console.log(`= ${line.collection} / ${p.name} (already present)`);
        continue;
      }

      await db.createProduct({
        slug,
        name: p.name,
        collection: line.collection,
        subtitle: line.subtitle,
        strain: p.strain,
        accentColor: p.accent,
        description: line.describe(p.name, p.strain),
        facts: line.facts.join("\n"),
        // Las fotos viajan con el sitio, así que no hay clave de R2 que borrar.
        imageUrl: `/products/${slug}.webp`,
        imageKey: null,
        altImageUrl: line.hasBoxShot ? `/products/${slug}-box.webp` : null,
        altImageKey: null,
        sortOrder: (lineIndex + 1) * 100 + i,
        published: true,
      });
      created++;
      console.log(`+ ${line.collection} / ${p.name}`);
    }
  }

  console.log(`[Seed] Done. ${created} product(s) added.`);
}

/**
 * Boot hook. Va detrás de SEED_CATALOG para que un redeploy no lo vuelva a
 * disparar en cada reinicio del contenedor: pones la variable, esperas el
 * deploy y la borras. Un fallo se registra y se traga: el catálogo es
 * contenido, y el sitio debe arrancar igual sin él.
 */
export async function seedCatalogIfRequested(): Promise<void> {
  if (process.env.SEED_CATALOG !== "true") return;
  try {
    console.log("[Seed] SEED_CATALOG is set — loading the Gas Light catalogue…");
    await seedCatalog();
  } catch (err) {
    console.error("[Seed] FAILED — the site will start without it:", err);
  }
}

/** CLI entry point: `pnpm seed`. */
const isCli =
  process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js");
if (isCli) {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }
  seedCatalog()
    .then(() => process.exit(0))
    .catch(err => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
