import { cn } from "@/lib/utils";

/**
 * A product shot standing on its light.
 *
 * The cut-outs are black packs with black lids, so on a black page they need
 * the strain's colour behind them to have an edge at all — the halo is what
 * makes the pack readable, not decoration. Tubes, jars and boxes have very
 * different proportions, so every shot is fitted to the bottom of the same
 * frame: in a row they share a floor instead of floating at different heights.
 */
export function Pack({
  src,
  alt,
  className,
  eager,
}: {
  src: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={cn("relative aspect-[4/5]", className)}>
      <div className="glow absolute inset-x-[2%] bottom-[-6%] top-[30%]" aria-hidden />
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="relative h-full w-full object-contain object-bottom drop-shadow-[0_16px_20px_rgba(0,0,0,0.75)]"
        />
      ) : (
        <div className="label relative flex h-full w-full items-end justify-center pb-6 text-bone/40">
          No photo yet
        </div>
      )}
    </div>
  );
}
