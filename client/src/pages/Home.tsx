import { Embers, FlameFloor, FlameSides } from "@/components/Fire";
import { BrandSection, FaqSection, PackMarks } from "@/components/HomeSections";
import { Lockup } from "@/components/Logo";
import { Pack } from "@/components/Pack";
import { PublicLayout } from "@/components/PublicLayout";
import { ReelVideo } from "@/components/ReelVideo";
import {
  accentStyle,
  strainLabel,
  useTitle,
  type CatalogProduct,
  type PublicVideo,
} from "@/lib/catalog";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { STRAINS } from "@shared/const";
import { groupByLine, lineSlug } from "@shared/lines";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Home() {
  useTitle("");
  const products = trpc.catalog.publicProducts.useQuery();
  const videos = trpc.videos.publicList.useQuery();

  const all = products.data ?? [];
  const groups = groupByLine(all);
  const featured = videos.data?.find(v => v.featured) ?? null;
  const reels = (videos.data ?? []).filter(v => !v.featured);

  return (
    <PublicLayout>
      <Hero groups={groups} />
      <BrandSection
        strainCount={all.length}
        lineCount={groups.length}
        video={featured}
      />
      <Lineup groups={groups} loading={products.isLoading} />
      {reels.length > 0 && <Reels videos={reels} />}
      <PackMarks />
      <ReportFinder />
      <FaqSection />
    </PublicLayout>
  );
}

type Group = ReturnType<typeof groupByLine<CatalogProduct>>[number];

/* ─── Hero ──────────────────────────────────────────────────────────────────
   The front of the box, at page size: charred wood, fire up both sides, the
   lockup in the middle. The three packs stand in the flames along the bottom,
   one from each line, and each is the way into its line. */

function Hero({ groups }: { groups: Group[] }) {
  const face = (group: Group | undefined, height: string, box?: boolean) => {
    const p = group?.items[0];
    if (!group || !p) return null;
    return {
      line: group.name,
      slug: lineSlug(group.name),
      accent: p.accentColor,
      // The pre-rolls show their display box here: three different
      // silhouettes say "three lines" before any label is read.
      src: (box ? p.altImageUrl : null) ?? p.imageUrl,
      height,
    };
  };
  type Face = NonNullable<ReturnType<typeof face>>;
  const present = (f: Face | null): f is Face => f !== null;

  // Jar and tube stand to the left of the lockup, the display box to the
  // right. On a phone the same three line up in one row under it.
  const left = [
    face(groups[1], "clamp(128px, 19.4vw, 300px)"),
    face(groups[0], "clamp(146px, 22vw, 340px)"),
  ].filter(present);
  const right = [face(groups[2], "clamp(118px, 19.6vw, 294px)", true)].filter(present);

  return (
    <section className="char relative isolate overflow-hidden border-b border-rule">
      <FlameSides />
      <FlameFloor />
      <Embers />
      {/* A dark pool behind the text so it never fights the wood grain. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(46%_56%_at_50%_40%,rgba(0,0,0,0.8),transparent_80%)]"
      />

      <div className="container relative grid !max-w-[1380px] grid-cols-[auto_auto] items-end justify-center gap-x-4 gap-y-10 pb-9 pt-9 sm:gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)_minmax(0,1fr)] lg:gap-x-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,440px)_minmax(0,1fr)] xl:gap-x-8 lg:pb-12 lg:pt-14">
        <div className="col-span-2 text-center lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:pb-16">
          <h1>
            <Lockup
              eager
              alt="Gas Light. Premium Gas Only."
              className="mx-auto h-auto w-[min(60vw,270px)] lg:w-[320px]"
            />
          </h1>
          <p className="mx-auto mt-6 max-w-[34rem] text-balance text-lg text-bone/90 md:text-xl">
            Indoor exotic, rolled three ways: hash holes, melted diamond
            pre-rolls and straight flower. Every batch is lab tested.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="btn btn-fire w-full max-w-xs whitespace-nowrap sm:w-auto sm:!px-5"
            >
              See the lineup
            </Link>
            <Link
              href="/lab-reports"
              className="btn btn-line w-full max-w-xs whitespace-nowrap sm:w-auto sm:!px-5"
            >
              Find a lab report
            </Link>
          </div>
        </div>

        <HeroStand items={left} className="lg:col-start-1 lg:row-start-1 lg:justify-self-end" />
        <HeroStand items={right} className="lg:col-start-3 lg:row-start-1 lg:justify-self-start" />
      </div>
    </section>
  );
}

function HeroStand({
  items,
  className,
}: {
  items: { line: string; slug: string; accent: string | null; src: string | null; height: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex items-end gap-4 sm:gap-10 lg:gap-7", className)}>
      {items.map(item => (
        <li key={item.slug} style={accentStyle(item.accent)}>
          {/* w-min: the pack sets the width, and the tag wraps to fit under it. */}
          <Link
            href={`/products?line=${item.slug}`}
            aria-label={item.line}
            className="group flex w-min flex-col items-center"
          >
            <span className="relative block">
              <span className="glow absolute -inset-x-[35%] -bottom-[8%] top-[45%]" aria-hidden />
              {item.src && (
                <img
                  src={item.src}
                  alt=""
                  style={{ height: item.height }}
                  className="relative w-auto max-w-none drop-shadow-[0_18px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out group-hover:-translate-y-2"
                />
              )}
            </span>
            <span className="tag mt-4 justify-center !whitespace-normal !px-[0.7em] text-center !text-[0.56rem] !tracking-[0.1em] group-hover:bg-accent group-hover:text-black sm:!px-[0.9em] sm:!text-[0.68rem] sm:!tracking-[0.14em]">
              {item.line.replace(/^THC\s+/i, "")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ─── Lineup ────────────────────────────────────────────────────────────── */

function Lineup({ groups, loading }: { groups: Group[]; loading: boolean }) {
  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 className="text-5xl text-bone md:text-7xl">The lineup</h2>
        <nav aria-label="Browse by type" className="flex flex-wrap gap-2">
          {STRAINS.map(type => (
            <Link key={type} href={`/products?strain=${type}`} className="tag tag-quiet">
              {strainLabel(type)}
            </Link>
          ))}
          <Link href="/products" className="tag tag-quiet">
            All products
          </Link>
        </nav>
      </div>

      {loading ? (
        <p className="mt-10 text-ash">Loading the lineup…</p>
      ) : groups.length === 0 ? (
        <p className="mt-10 max-w-xl text-ash">
          The lineup is being loaded. Check back shortly.
        </p>
      ) : (
        <div className="mt-10 space-y-6 md:space-y-8">
          {groups.map(group => (
            <div key={group.name} className="panel overflow-hidden">
              <div className="grid lg:grid-cols-[290px_1fr]">
                <div className="char flex flex-col justify-center border-b border-rule p-6 md:p-8 lg:border-b-0 lg:border-r">
                  {lineSlug(group.name) === "gusherz" && (
                    <img
                      src="/brand/hash-hole.webp"
                      alt="Hash Hole"
                      width={1100}
                      height={778}
                      loading="lazy"
                      className="mb-5 h-auto w-40"
                    />
                  )}
                  {/* The line name the way the pack prints it: wide capitals
                      in an outlined box. */}
                  <h3 className="line-name">
                    <Link href={`/products?line=${lineSlug(group.name)}`}>{group.name}</Link>
                  </h3>
                  {group.info && (
                    <>
                      <p className="label mt-4 text-gold">{group.info.format}</p>
                      <p className="mt-3 text-ash">{group.info.blurb}</p>
                    </>
                  )}
                </div>

                <ul className="no-scrollbar flex snap-x gap-1 self-center overflow-x-auto px-4 py-7 md:grid md:grid-cols-3 md:gap-x-2 md:gap-y-8 md:overflow-visible md:px-6 md:py-9 xl:grid-cols-6">
                  {group.items.map(p => (
                    <li
                      key={p.id}
                      className="w-[38vw] max-w-[170px] shrink-0 snap-start md:w-auto md:max-w-none"
                      style={accentStyle(p.accentColor)}
                    >
                      <Link href={`/products/${p.slug}`} className="group block text-center">
                        <Pack
                          src={p.imageUrl}
                          alt={`${p.name} pack`}
                          className="mx-auto aspect-auto h-[190px] w-full transition-transform duration-300 ease-out group-hover:-translate-y-1.5 md:h-[230px]"
                        />
                        <span className="strain mt-5 block text-[1.5rem] text-accent">
                          {p.name}
                        </span>
                        <span className="label mt-1.5 block !text-[0.62rem] text-ash">
                          {strainLabel(p.strain)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── Reels ─────────────────────────────────────────────────────────────── */

function Reels({ videos }: { videos: PublicVideo[] }) {
  return (
    <section className="char border-y border-rule py-16 md:py-20">
      <div className="container">
        <h2 className="text-5xl text-bone md:text-7xl">On camera</h2>
      </div>
      <ul className="no-scrollbar container mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
        {videos.map(v => (
          <li key={v.id} className="w-[68vw] max-w-[300px] shrink-0 snap-start">
            <div className="panel overflow-hidden">
              <ReelVideo src={v.fileUrl} poster={v.posterUrl} title={v.title} />
            </div>
            <p className="label mt-3 text-bone">{v.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── Report finder ─────────────────────────────────────────────────────── */

function ReportFinder() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");

  return (
    <section className="container">
      <div className="panel panel-accent char relative isolate overflow-hidden">
        <FlameSides />
        <FlameFloor low />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_45%,rgba(0,0,0,0.8),transparent_85%)]"
        />
        <div className="relative mx-auto max-w-2xl px-6 pb-20 pt-12 text-center md:pb-24 md:pt-16">
          <h2 className="text-balance text-5xl text-bone md:text-6xl">
            Got a pack in your hand?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-bone/85">
            Scan the QR code on the back, or type the strain or the batch
            number printed there, and read the certificate of analysis.
          </p>
          <form
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={e => {
              e.preventDefault();
              const q = query.trim();
              navigate(q ? `/lab-reports?q=${encodeURIComponent(q)}` : "/lab-reports");
            }}
          >
            <label className="sr-only" htmlFor="home-report-search">
              Strain or batch number
            </label>
            <input
              id="home-report-search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Blue Dream, or GL090426GP"
              className="field flex-1"
            />
            <button type="submit" className="btn btn-fire">
              <Search className="h-4.5 w-4.5" />
              Find report
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
