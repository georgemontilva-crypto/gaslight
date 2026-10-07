import { Embers, GoldRule } from "@/components/Fire";
import { Lockup } from "@/components/Logo";
import { Pack } from "@/components/Pack";
import { PageHeader, PublicLayout } from "@/components/PublicLayout";
import { accentStyle, useTitle } from "@/lib/catalog";
import { trpc } from "@/lib/trpc";
import { DEFAULT_CONTACT } from "@shared/const";
import { groupByLine, lineSlug } from "@shared/lines";
import { Link } from "wouter";

const LABEL = [
  ["100% hemp flower", "Every pre-roll starts as indoor-grown hemp flower."],
  ["No delta-8", "Nothing we make contains delta-8."],
  [
    "Under 0.3% delta-9 THC",
    "Within the federal limit for hemp, measured on a dry weight basis.",
  ],
  [
    "Texas compliant",
    "Meets the 2018 Farm Bill and Texas Agriculture Code § 122.153.",
  ],
  ["Child resistant", "Tubes, jars and pouches all close child-resistant."],
  ["21+ only", "Our products are for adults, and this site is too."],
];

export default function About() {
  useTitle("About Us");
  const products = trpc.catalog.publicProducts.useQuery();
  const details = trpc.site.contactDetails.useQuery().data ?? DEFAULT_CONTACT;
  const lines = groupByLine(products.data ?? []).filter(g => g.items[0]);

  return (
    <PublicLayout>
      <PageHeader title="About us">
        {details.company} makes indoor exotic hemp pre-rolls: hash holes,
        melted diamonds and straight flower, lab tested by the batch.
      </PageHeader>

      <div className="container py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-20">
          <div>
            <h2 className="text-balance text-5xl text-bone md:text-6xl">
              One rule, printed under the name
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-lg text-bone/85">
              <p>
                Gas Light started in 2026 with a single standard: premium gas
                only. Indoor exotic flower, rolled three ways, and nothing
                that has to hide behind its packaging.
              </p>
              <p>
                That's why every pack carries a batch number and a QR code,
                and why this site exists. Pick up any Gas Light, look up its
                batch, and read exactly what the lab found.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn btn-fire">
                See the lineup
              </Link>
              <Link href="/lab-reports" className="btn btn-line">
                Read the lab reports
              </Link>
            </div>
          </div>

          {/* The front panel of the box, as printed: the fire frame around
              the lockup. */}
          <div
            className="relative mx-auto flex aspect-[1179/1334] w-full max-w-[420px] items-center justify-center overflow-hidden rounded-[14px] bg-cover bg-center"
            style={{ backgroundImage: "url(/brand/fire-frame.webp)" }}
          >
            <Embers density={0.5} />
            <Lockup className="relative h-auto w-[58%]" />
          </div>
        </div>
      </div>

      {lines.length > 0 && (
        <section className="char border-y border-rule">
          <div className="container py-14 md:py-20">
            <h2 className="text-5xl text-bone md:text-6xl">Three ways to roll it</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {lines.map(group => {
                const face = group.items[0];
                return (
                  <li key={group.name} style={accentStyle(face.accentColor)}>
                    <Link
                      href={`/products?line=${lineSlug(group.name)}`}
                      className="panel group flex h-full flex-col bg-black/70 p-6 transition-colors hover:border-accent"
                    >
                      <Pack
                        src={face.altImageUrl ?? face.imageUrl}
                        alt=""
                        className="mx-auto w-[62%] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
                      />
                      <h3 className="mt-6 text-3xl text-bone md:text-4xl">{group.name}</h3>
                      {group.info && (
                        <>
                          <p className="label mt-2.5 text-gold">{group.info.format}</p>
                          <p className="mt-3 text-ash">{group.info.blurb}</p>
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="container grid gap-10 py-14 md:py-20 lg:grid-cols-[320px_1fr]">
        <h2 className="text-5xl text-bone md:text-6xl">What the label means</h2>
        <dl className="divide-y divide-rule border-y border-rule">
          {LABEL.map(([term, detail]) => (
            <div key={term} className="grid gap-1.5 py-4 sm:grid-cols-[280px_1fr] sm:items-baseline sm:gap-6">
              <dt className="label text-[0.8rem] text-bone">{term}</dt>
              <dd className="text-ash">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container">
        <GoldRule className="mb-14" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl text-bone md:text-5xl">
              Want Gas Light in your store?
            </h2>
            <p className="mt-3 text-ash">
              {details.address ? `${details.company}, ${details.address}.` : details.company}
            </p>
          </div>
          <Link href="/contact" className="btn btn-fire shrink-0">
            Contact us
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
