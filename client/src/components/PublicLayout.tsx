import { AgeGate } from "@/components/AgeGate";
import { BackToTop } from "@/components/BackToTop";
import { FlameFloor, GoldRule } from "@/components/Fire";
import { Lockup, LogoMark } from "@/components/Logo";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { BRAND_NAME, DEFAULT_CONTACT } from "@shared/const";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, useLocation } from "wouter";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Lab Reports", href: "/lab-reports" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

function isActive(location: string, href: string) {
  return href === "/" ? location === "/" : location.startsWith(href);
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  // A link in the mobile menu changes the route; the menu shouldn't stay up.
  useEffect(() => setOpen(false), [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <AgeGate />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-bone focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-rule bg-black/88 backdrop-blur-md">
        <div className="container flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${BRAND_NAME} home`} className="shrink-0">
            <LogoMark alt="" className="h-[58px] w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map(item => {
              const active = isActive(location, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "label relative px-3.5 py-2.5 text-[0.78rem] transition-colors",
                    active ? "text-bone" : "text-ash hover:text-bone"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute inset-x-3.5 -bottom-[14px] h-[3px] rounded-t-sm"
                      style={{ background: "linear-gradient(90deg, #e02a12, #ff7a18, #ffc531)" }}
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-bone lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="border-t border-rule bg-black lg:hidden"
          >
            <div className="container flex flex-col py-2">
              {NAV.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(location, item.href) ? "page" : undefined}
                  className={cn(
                    "border-b border-rule py-4 font-display text-3xl uppercase last:border-b-0",
                    isActive(location, item.href) ? "text-fire" : "text-bone"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <SiteFooter footerRef={footerRef} />
      <BackToTop footerRef={footerRef} />
    </div>
  );
}

function SiteFooter({
  footerRef,
}: {
  footerRef: RefObject<HTMLElement | null>;
}) {
  const details = trpc.site.contactDetails.useQuery().data ?? DEFAULT_CONTACT;

  return (
    <footer ref={footerRef} className="char mt-24 border-t border-rule">
      <div className="container py-14">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.8fr_1fr]">
          <div>
            <Lockup className="h-auto w-40" />
            <p className="mt-6 max-w-xs text-ash">
              Indoor exotic hemp pre-rolls. Lab tested by the batch.
            </p>
            <div className="mt-6 inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-signal text-sm font-extrabold text-black">
                21+
              </span>
              <span className="label text-bone">Adults only</span>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="label text-gold">Site</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-bone hover:text-ember">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-gold">Manufactured by</h2>
            <address className="mt-4 space-y-2.5 not-italic text-bone">
              <p>{details.company}</p>
              {details.address && <p className="text-ash">{details.address}</p>}
              {details.email && (
                <p>
                  <a href={`mailto:${details.email}`} className="hover:text-ember">
                    {details.email}
                  </a>
                </p>
              )}
              {details.phone && (
                <p>
                  <a
                    href={`tel:${details.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-ember"
                  >
                    {details.phone}
                  </a>
                </p>
              )}
              {details.instagram && (
                <p>
                  <a
                    href={details.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ember"
                  >
                    Instagram
                  </a>
                </p>
              )}
            </address>
          </div>
        </div>

        <GoldRule className="mt-12" />

        <div className="pt-8 text-sm leading-relaxed text-ash">
          <p className="max-w-4xl">
            Not for sale to persons under 21. Keep out of reach of children.
            These products may contain THC and can cause a user to fail a drug
            test. All THCs have psychoactive properties. Pregnant or nursing
            women should consult a healthcare provider before use. These
            products comply with the 2018 Farm Bill and Texas Agriculture Code
            § 122.153, and contain less than 0.3% delta-9 THC. They have not
            been evaluated by the FDA and are not intended to diagnose, treat,
            cure, or prevent any disease.
          </p>
          <p className="mt-5">
            © {new Date().getFullYear()} {details.company}. For adults 21 and
            older.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Shared page heading: the title on charred wood, with the fire low along the
 * bottom edge. The inner pages get the quiet version of the home page's blaze.
 */
export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="char relative overflow-hidden border-b border-rule">
      <FlameFloor low />
      <div className="container relative pb-16 pt-14 md:pb-24 md:pt-20">
        <h1 className="text-balance text-6xl text-bone md:text-8xl">{title}</h1>
        {children && (
          <p className="mt-5 max-w-2xl text-lg text-bone/85 md:text-xl">{children}</p>
        )}
      </div>
    </div>
  );
}
