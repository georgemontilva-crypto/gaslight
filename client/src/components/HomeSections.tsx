import { GoldRule } from "@/components/Fire";
import { ReelVideo } from "@/components/ReelVideo";
import type { PublicVideo } from "@/lib/catalog";
import { trpc } from "@/lib/trpc";
import { DEFAULT_CONTACT } from "@shared/const";
import {
  BadgeCheck,
  Cannabis,
  ChevronDown,
  Droplet,
  FlaskConical,
  Lock,
} from "lucide-react";
import { Link } from "wouter";

/* ─── The brand ─────────────────────────────────────────────────────────────
   Who makes it, in two paragraphs. When the admin has marked a clip as
   featured it plays beside the copy; without one the copy stands alone. */

export function BrandSection({
  strainCount,
  lineCount,
  video,
}: {
  strainCount: number;
  lineCount: number;
  video: PublicVideo | null;
}) {
  const details = trpc.site.contactDetails.useQuery().data ?? DEFAULT_CONTACT;
  // "Billings, MT" out of "6821 Cow Girl Way, Billings, MT 59106": the street
  // belongs on the contact page, the town is what says where the brand is from.
  const town = details.address.split(",").slice(1).join(",").replace(/\d{5}.*$/, "").trim();

  const copy = (
    <div className={video ? "" : "mx-auto max-w-3xl text-center"}>
      <h2 className="text-balance text-5xl text-bone md:text-7xl">
        Nothing mid makes the cut
      </h2>
      <div
        className={`mt-6 space-y-4 text-lg text-bone/85 ${video ? "max-w-xl" : "mx-auto max-w-2xl"}`}
      >
        <p>
          Gas Light is indoor exotic hemp flower from {details.company}
          {town ? `, out of ${town}` : ""}.
          {strainCount > 0 && lineCount > 0 && (
            <>
              {" "}
              We roll {strainCount} strains across {lineCount} lines, and that
              is the whole catalogue.
            </>
          )}
        </p>
        <p>
          Every pack carries a batch number and a QR code, so anyone holding
          one can read exactly what the lab found in it.
        </p>
      </div>
      <Link href="/about" className="btn btn-line mt-8">
        More about us
      </Link>
    </div>
  );

  return (
    <section className="border-b border-rule">
      <div className="container py-16 md:py-24">
        {video ? (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
            <div className="panel panel-accent mx-auto w-full max-w-[320px] overflow-hidden lg:max-w-none">
              <ReelVideo src={video.fileUrl} poster={video.posterUrl} title={video.title} />
            </div>
            {copy}
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}

/* ─── On every pack ─────────────────────────────────────────────────────────
   The row of five marks printed on every label, each one explained rather
   than repeated. Drawn the way the pack draws it: one outlined box. */

const MARKS = [
  {
    icon: Cannabis,
    term: "100% hemp flower",
    detail: "Every pre-roll starts as indoor-grown hemp flower.",
  },
  {
    icon: FlaskConical,
    term: "No delta-8",
    detail: "Nothing we make contains delta-8.",
  },
  {
    icon: Droplet,
    term: "Under 0.3% delta-9 THC",
    detail: "Within the federal limit for hemp, on a dry weight basis.",
  },
  {
    icon: BadgeCheck,
    term: "Texas compliant",
    detail: "Meets the 2018 Farm Bill and Texas Agriculture Code § 122.153.",
  },
  {
    icon: Lock,
    term: "Child resistant",
    detail: "Tubes, jars and pouches all close child-resistant.",
  },
];

export function PackMarks() {
  return (
    <section className="container pb-16 md:pb-24">
      <GoldRule />
      <h2 className="mt-12 text-center text-5xl text-bone md:text-6xl">
        Printed on every pack
      </h2>
      <dl className="panel mt-10 grid divide-y divide-rule sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
        {MARKS.map(item => (
          <div key={item.term} className="px-6 py-7 text-center">
            <item.icon className="mx-auto h-9 w-9 text-ember" strokeWidth={1.4} aria-hidden />
            <dt className="label mt-4 text-bone">{item.term}</dt>
            <dd className="mt-2 text-[0.95rem] leading-snug text-ash">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ─── Questions ─────────────────────────────────────────────────────────────
   Answers come from the packaging's own statements. Native <details>, so they
   open with the keyboard and without any script. */

const linkClass = "underline underline-offset-4 hover:text-bone";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Where do I find the lab report for my pack?",
    a: (
      <>
        Scan the QR code on the back of the pack. Or find the batch number
        printed there, above the lot number and dates, and type it or the
        strain on the{" "}
        <Link href="/lab-reports" className={linkClass}>
          Lab Reports
        </Link>{" "}
        page.
      </>
    ),
  },
  {
    q: "What's in a hash hole?",
    a: "Three things: indoor CBD/CBG flower, CBD hash badder and natural terpene flavoring. That is the full ingredient list printed on THC Gusherz.",
  },
  {
    q: "What does \"under 0.3% delta-9 THC\" mean?",
    a: "Gas Light products are hemp-derived and contain less than 0.3% delta-9 THC on a dry weight basis, which is the federal limit for hemp. State rules vary, so check the law where you live.",
  },
  {
    q: "Can it make me fail a drug test?",
    a: "Yes. These products may contain THC and can cause a user to fail a drug test.",
  },
  {
    q: "Who can buy Gas Light?",
    a: "Adults 21 and older. Keep every product out of reach of children. If you're pregnant or nursing, talk to a healthcare provider before use.",
  },
  {
    q: "Can my store carry Gas Light?",
    a: (
      <>
        Yes. Send us a message through the{" "}
        <Link href="/contact" className={linkClass}>
          Contact Us
        </Link>{" "}
        page and choose "Wholesale".
      </>
    ),
  },
];

export function FaqSection() {
  return (
    <section className="container grid gap-10 pt-16 md:pt-24 lg:grid-cols-[320px_1fr] lg:gap-16">
      <h2 className="text-5xl text-bone md:text-6xl">Good to know</h2>
      <div className="border-t border-rule">
        {FAQ.map(item => (
          <details key={item.q} className="group border-b border-rule">
            <summary className="flex list-none items-center justify-between gap-6 py-5 text-xl font-semibold text-bone marker:hidden hover:text-ember [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-ash transition-transform duration-200 group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="max-w-2xl pb-6 text-lg text-ash">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
