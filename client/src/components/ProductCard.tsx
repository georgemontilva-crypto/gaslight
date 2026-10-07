import { Pack } from "@/components/Pack";
import { accentStyle, strainLabel, type CatalogProduct } from "@/lib/catalog";
import { Link } from "wouter";

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      style={accentStyle(product.accentColor)}
      className="panel group block overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-[0_0_30px_-10px_var(--accent)] focus-visible:border-accent"
    >
      <div className="char px-4 pt-5">
        <Pack
          src={product.imageUrl}
          alt={`${product.name} pack`}
          className="mx-auto w-full max-w-[250px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
        />
      </div>
      <div className="border-t border-rule px-4 pb-5 pt-4 text-center">
        <h3 className="strain text-[1.75rem] text-accent sm:text-[2rem]">
          {product.name}
        </h3>
        {product.strain && (
          <p className="label mt-2 text-ash">{strainLabel(product.strain)}</p>
        )}
      </div>
    </Link>
  );
}
