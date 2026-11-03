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
  /** Solo si el slug no sale del nombre tal cual (ver Grand Daddy Purple). */
  slug?: string;
};

type SeedLine = {
  /** Debe coincidir con un nombre de shared/lines.ts. */
  collection: string;
  slugPrefix: string;
  subtitle: string;
  /** La línea trae una segunda foto por cepa: el display, `<slug>-box.webp`. */
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

/**
 * El catálogo tal como sale en los empaques de nov 2026: todo en pouch, sin
 * frascos ni tubos. drizzle/0001_pouch_catalog.sql lleva estos mismos datos a
 * una base que ya tenía el catálogo anterior; si se cambia algo aquí que deba
 * llegar a producción, hace falta otra migración.
 */
export const CATALOG: SeedLine[] = [
  {
    collection: "THC Gusherz",
    slugPrefix: "gusherz",
    subtitle: "2 per pouch, 2.0G each",
    hasBoxShot: true,
    describe: (name, strain) =>
      `${name} as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. ${article(strain)}. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.`,
    facts: [
      "Per pouch: 2 pre-rolls",
      "Per pre-roll: 2.0 G",
      "Net weight: 4.0 G per pouch (0.141 oz)",
      "Display: 10 pouches, 20 G (0.705 oz)",
      "Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring",
      ...COMPLIANCE_FACTS,
    ],
    products: [
      { name: "Blue Dream", strain: "hybrid", accent: "#1fb6f0" },
      { name: "White Runtz", strain: "hybrid", accent: "#f1ece4" },
      { name: "Green Crack", strain: "sativa", accent: "#42d13b" },
      { name: "Sour Diesel", strain: "sativa", accent: "#f2701f" },
      {
        name: "Grand Daddy Purple",
        slug: "granddaddy-purple",
        strain: "indica",
        accent: "#a77bf0",
      },
      { name: "Northern Lights", strain: "indica", accent: "#ec2b33" },
    ],
  },
  {
    collection: "Diamond Infused",
    slugPrefix: "diamond-infused",
    subtitle: "3 per pouch, 1.5G each",
    hasBoxShot: true,
    describe: (name, strain) =>
      `${name}, diamond infused: indoor exotic flower infused with diamonds. ${article(strain)}. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.`,
    facts: [
      "Per pouch: 3 pre-rolls",
      "Per pre-roll: 1.5 G",
      "Net weight: 4.5 G per pouch (0.15 oz)",
      "Display: 10 pouches, 45 G (1.58 oz)",
      ...COMPLIANCE_FACTS,
    ],
    products: [
      { name: "Grease Monkey", strain: "hybrid", accent: "#ec2b33" },
      { name: "Permanent Marker", strain: "hybrid", accent: "#f1ece4" },
      { name: "Durban Poison", strain: "sativa", accent: "#42d13b" },
      { name: "Super Lemon Haze", strain: "sativa", accent: "#f2e21e" },
      { name: "Slurricane", strain: "indica", accent: "#a77bf0" },
      { name: "Blue Zushi", strain: "indica", accent: "#2bb8e8" },
    ],
  },
  {
    collection: "THC Pre-Rolls",
    slugPrefix: "pre-rolls",
    subtitle: "Single 1.25G pre-roll",
    hasBoxShot: true,
    describe: (name, strain) =>
      `${name}, rolled straight: indoor exotic flower and nothing else. ${article(strain)}. One 1.25-gram pre-roll to a pouch, forty pouches to a display.`,
    facts: [
      "Per pouch: 1 pre-roll",
      "Net weight: 1.25 G per pouch (0.044 oz)",
      "Display: 40 pouches, 50 G (1.76 oz)",
      ...COMPLIANCE_FACTS,
    ],
    products: [
      { name: "Strawberry Cough", strain: "sativa", accent: "#ee2030" },
      { name: "Jack Herer", strain: "sativa", accent: "#a9e6ee" },
      { name: "King Louie", strain: "sativa", accent: "#cfe52a" },
      { name: "Black Truffle", strain: "sativa", accent: "#e6cc8f" },
      { name: "White Runtz", strain: "hybrid", accent: "#f1ece4" },
      { name: "Rainbow Belts", strain: "hybrid", accent: "#f04bb0" },
    ],
  },
];

type SeedReport = {
  /** Slug del producto al que pertenece. */
  slug: string;
  batch: string;
  /** Fecha de finalización del reporte (YYYY-MM-DD). */
  testedOn: string;
  sizeBytes: number;
  published?: boolean;
};

/**
 * Los certificados de ACS Laboratory, uno por cepa. El PDF viaja con el sitio
 * en client/public/coa/<slug>.pdf, así que no tiene clave de R2: borrar el
 * reporte desde el panel quita la fila, y reemplazar el PDF lo sube a R2.
 * drizzle/0002_lab_reports.sql carga esta misma lista en una base existente.
 */
export const LAB_REPORTS: SeedReport[] = [
  {
    slug: "diamond-infused-blue-zushi",
    batch: "GL090426BZ",
    testedOn: "2026-09-16",
    sizeBytes: 1249490,
  },
  {
    slug: "diamond-infused-durban-poison",
    batch: "GL090426DP",
    testedOn: "2026-09-16",
    sizeBytes: 1249364,
  },
  {
    slug: "diamond-infused-grease-monkey",
    batch: "GL090426GM",
    testedOn: "2026-09-16",
    sizeBytes: 1260420,
  },
  {
    slug: "diamond-infused-permanent-marker",
    batch: "GL090426PM",
    testedOn: "2026-09-16",
    sizeBytes: 1251501,
  },
  {
    slug: "diamond-infused-slurricane",
    batch: "GL090426SR",
    testedOn: "2026-09-16",
    sizeBytes: 1258923,
  },
  {
    slug: "diamond-infused-super-lemon-haze",
    batch: "GL090426SLH",
    testedOn: "2026-09-16",
    sizeBytes: 1245366,
    // Delta-9 THC 0.3207% en el reporte, por encima de 0.3%. Publicado por
    // decisión del cliente (ver drizzle/0003_publish_slh_report.sql).
  },
  {
    slug: "gusherz-blue-dream",
    batch: "GL090426BD",
    testedOn: "2026-10-05",
    sizeBytes: 900885,
  },
  {
    slug: "gusherz-granddaddy-purple",
    batch: "GL090426GP",
    testedOn: "2026-10-06",
    sizeBytes: 908050,
  },
  {
    slug: "gusherz-green-crack",
    batch: "GL090426GC",
    testedOn: "2026-10-06",
    sizeBytes: 905733,
  },
  {
    slug: "gusherz-northern-lights",
    batch: "GL090426NL",
    testedOn: "2026-10-05",
    sizeBytes: 912957,
  },
  {
    slug: "gusherz-sour-diesel",
    batch: "GL090426SD",
    testedOn: "2026-10-06",
    sizeBytes: 904338,
  },
  {
    slug: "gusherz-white-runtz",
    batch: "GL08142026",
    testedOn: "2026-08-14",
    sizeBytes: 1457978,
  },
  {
    slug: "pre-rolls-black-truffle",
    batch: "GL210826BT",
    testedOn: "2026-10-06",
    sizeBytes: 909696,
  },
  {
    slug: "pre-rolls-jack-herer",
    batch: "GL210826JH",
    testedOn: "2026-10-05",
    sizeBytes: 902669,
  },
  {
    slug: "pre-rolls-king-louie",
    batch: "GL210826KL",
    testedOn: "2026-10-06",
    sizeBytes: 908549,
  },
  {
    slug: "pre-rolls-rainbow-belts",
    batch: "GL210826RB",
    testedOn: "2026-10-06",
    sizeBytes: 912404,
  },
  {
    slug: "pre-rolls-strawberry-cough",
    batch: "GL210826SC",
    testedOn: "2026-10-06",
    sizeBytes: 913587,
  },
  {
    slug: "pre-rolls-white-runtz",
    batch: "GL210826WR",
    testedOn: "2026-10-06",
    sizeBytes: 915968,
  },
];

export function labReportRows() {
  return LAB_REPORTS.map(r => ({
    slug: r.slug,
    title: "Full panel COA",
    batch: r.batch,
    lab: "ACS Laboratory",
    testedOn: r.testedOn,
    fileUrl: `/coa/${r.slug}.pdf`,
    fileKey: "",
    fileName: `${r.slug}.pdf`,
    sizeBytes: r.sizeBytes,
    published: r.published ?? true,
    sortOrder: 0,
  }));
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Cada cepa como la fila que se guarda, en el orden del sitio. */
export function catalogRows() {
  return CATALOG.flatMap(line => {
    // El orden de las líneas sale del mismo sitio que usa la web pública, para
    // que el panel y el sitio no puedan quedar ordenados distinto.
    const lineIndex = Math.max(
      0,
      LINES.findIndex(l => l.name === line.collection)
    );
    return line.products.map((p, i) => {
      const slug = `${line.slugPrefix}-${p.slug ?? slugify(p.name)}`;
      return {
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
      };
    });
  });
}

export async function seedCatalog(): Promise<void> {
  let created = 0;
  for (const row of catalogRows()) {
    if (await db.getProductBySlug(row.slug)) {
      console.log(`= ${row.collection} / ${row.name} (already present)`);
      continue;
    }
    await db.createProduct(row);
    created++;
    console.log(`+ ${row.collection} / ${row.name}`);
  }
  console.log(`[Seed] Done. ${created} product(s) added.`);

  // Los reportes van después: necesitan el id del producto. Uno ya cargado
  // (mismo producto y mismo lote) se deja como está.
  let reports = 0;
  for (const { slug, ...report } of labReportRows()) {
    const product = await db.getProductBySlug(slug);
    if (!product) continue;
    const existing = await db.listLabReports(product.id);
    if (existing.some(r => r.batch === report.batch)) continue;
    await db.createLabReport({ productId: product.id, ...report });
    reports++;
  }
  console.log(`[Seed] ${reports} lab report(s) added.`);
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
