import { PublicLayout } from "@/components/PublicLayout";
import { useTitle } from "@/lib/catalog";
import { Link } from "wouter";

export default function NotFound() {
  useTitle("Page not found");
  return (
    <PublicLayout>
      <div className="container max-w-2xl py-24">
        <p className="text-fire font-display text-8xl">404</p>
        <h1 className="mt-2 text-5xl text-bone md:text-6xl">
          This page doesn't exist
        </h1>
        <p className="mt-4 text-lg text-ash">
          The link may be old. If you scanned a pack, search for its lab report
          by strain or batch number.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/lab-reports" className="btn btn-fire">
            Find a lab report
          </Link>
          <Link href="/" className="btn btn-line">
            Go to the home page
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
