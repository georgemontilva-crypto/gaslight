import { Embers } from "@/components/Fire";
import { Pack } from "@/components/Pack";
import { ProductCard } from "@/components/ProductCard";
import { PublicLayout } from "@/components/PublicLayout";
import { accentStyle, strainLabel, useTitle } from "@/lib/catalog";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { lineSlug } from "@shared/lines";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";

export default function ProductDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const product = trpc.catalog.productBySlug.useQuery({ slug }, { retry: false });
  const catalog = trpc.catalog.publicProducts.useQuery();
  const p = product.data;
  useTitle(p ? p.name : "Product");

  // Which of the product's photos is up. Back to the first on a new product:
  // the page component is reused when moving between strains.
  const [shot, setShot] = useState(0);
  useEffect(() => setShot(0), [slug]);

  if (product.isLoading) {
    return (
      <PublicLayout>
        <div className="container py-24 text-ash">Loading…</div>
      </PublicLayout>
    );
  }

  if (!p) {
    return (
      <PublicLayout>
        <div className="container max-w-2xl py-24">
          <h1 className="text-5xl text-bone md:text-6xl">
            That product isn't here
          </h1>
          <p className="mt-4 text-lg text-ash">
            It may have been renamed or taken out of the lineup.
          </p>
          <Link href="/products" className="btn btn-fire mt-8">
            See all products
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const shots = [p.imageUrl, p.altImageUrl].filter((s): s is string => Boolean(s));
  const current = shots[shot] ?? shots[0] ?? null;
  const siblings = (catalog.data ?? []).filter(
    other => other.collection === p.collection && other.id !== p.id
  );

  return (
    <PublicLayout>
      <div style={accentStyle(p.accentColor)}>
        <div className="char relative isolate overflow-hidden border-b border-rule">
          <Embers density={0.6} />
          <div className="container relative pt-6">
            <Link
              href={p.collection ? `/products?line=${lineSlug(p.collection)}` : "/products"}
              className="label inline-flex items-center gap-1 text-ash hover:text-bone"
            >
              <ChevronLeft className="h-4 w-4" />
              {p.collection ?? "Products"}
            </Link>
          </div>

          <div className="container relative grid gap-10 pb-14 pt-6 md:pb-20 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <Pack
                key={current}
                src={current}
                alt={`${p.name} pack`}
                eager
                className="pack-in mx-auto w-full max-w-[440px]"
              />
              {shots.length > 1 && (
                <div
                  role="group"
                  aria-label="Choose a photo"
                  className="mt-8 flex justify-center gap-3"
                >
                  {shots.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setShot(i)}
                      aria-pressed={i === shot}
                      aria-label={`Photo ${i + 1} of ${shots.length}`}
                      className={cn(
                        "h-20 w-20 rounded-[10px] border-[1.5px] bg-black/70 p-1.5 transition-colors",
                        i === shot ? "border-accent" : "border-rule hover:border-bone/60"
                      )}
                    >
                      <img src={src} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              {p.collection && <p className="label text-gold">{p.collection}</p>}
              <h1 className="strain mt-3 text-balance text-[4.2rem] text-accent md:text-[6.5rem]">
                {p.name}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {p.strain && <span className="tag">{strainLabel(p.strain)}</span>}
                {p.subtitle && <span className="tag tag-quiet">{p.subtitle}</span>}
              </div>
              {p.description && (
                <p className="mt-7 max-w-xl whitespace-pre-line text-lg text-bone/85">
                  {p.description}
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Reports live on the Lab Reports page; this opens it already
                    narrowed to this strain. */}
                <Link
                  href={`/lab-reports?q=${encodeURIComponent(p.name)}`}
                  className="btn btn-accent"
                >
                  {p.reports.length > 0 ? "Read the lab report" : "Lab report"}
                </Link>
                <Link href="/contact" className="btn btn-line">
                  Ask about this product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {siblings.length > 0 && (
        <section className="container pt-14 md:pt-16">
          <h2 className="text-4xl text-bone md:text-5xl">
            More from {p.collection}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-5">
            {siblings.map(s => (
              <ProductCard key={s.id} product={s} />
            ))}
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
