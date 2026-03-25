import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { onImgError } from "@/lib/imageUtils";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Derive a short category label from the product handle. */
const CATEGORY_PATTERNS: [RegExp, string][] = [
  [/tee|t-shirt/i, "T-Shirt"],
  [/hoodie|pullover/i, "Hoodie"],
  [/zip/i, "Zip Hoodie"],
  [/pant|trouser|track/i, "Bottoms"],
  [/jacket|shell/i, "Jacket"],
  [/puffer|coat/i, "Outerwear"],
  [/beanie/i, "Beanie"],
  [/cap|hat/i, "Cap"],
  [/bag|crossbody|tote/i, "Bag"],
];

function getCategoryLabel(handle: string): string {
  for (const [pattern, label] of CATEGORY_PATTERNS) {
    if (pattern.test(handle)) return label;
  }
  return "";
}

/** Format a Shopify price amount as a currency string. */
function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  if (currencyCode === "USD") return `$${num.toFixed(2)}`;
  if (currencyCode === "EUR") return `€${num.toFixed(2)}`;
  if (currencyCode === "GBP") return `£${num.toFixed(2)}`;
  return `${currencyCode} ${num.toFixed(2)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: ShopifyProduct;
  /** Badge text shown on the image. Pass null to hide. Default: "Drop 001" */
  badge?: string | null;
  /** Eager-load the image (use for above-the-fold cards). Default: false */
  priority?: boolean;
}

export const ProductCard = ({
  product,
  badge = "Drop 001",
  priority = false,
}: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  const { handle, title, images, priceRange, variants } = product.node;
  const image1 = images.edges[0]?.node;
  const image2 = images.edges[1]?.node; // second image — swap on hover if present
  const price = priceRange.minVariantPrice;
  const category = getCategoryLabel(handle);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to cart", {
      description: title,
      position: "top-center",
    });
  };

  return (
    <div className="group flex flex-col">
      {/* ── Image area ─────────────────────────────────────────────── */}
      <Link
        to={`/product/${handle}`}
        className="relative block aspect-[3/4] overflow-hidden bg-[#111] mb-3"
        tabIndex={-1}
        aria-hidden
      >
        {/* Primary image */}
        {image1 ? (
          <img
            src={image1.url}
            alt={image1.altText || title}
            loading={priority ? "eager" : "lazy"}
            onError={onImgError}
            className={[
              "absolute inset-0 w-full h-full object-cover",
              "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
              // If a second image exists, fade out on hover so the swap is smooth
              image2 ? "group-hover:opacity-0 transition-opacity duration-500" : "",
            ].join(" ")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">
              LEVN
            </span>
          </div>
        )}

        {/* Secondary image — appears on hover (real Shopify products often have 2+) */}
        {image2 && (
          <img
            src={image2.url}
            alt=""
            loading="lazy"
            onError={onImgError}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="font-body text-[9px] tracking-[0.28em] uppercase bg-foreground text-background px-2 py-[3px]">
              {badge}
            </span>
          </div>
        )}

        {/* Hover gradient — gives depth behind the button */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Add to Cart CTA — slides up from bottom */}
        <button
          onClick={handleAddToCart}
          disabled={isCartLoading}
          aria-label={`Add ${title} to cart`}
          className="absolute inset-x-0 bottom-0 z-10 bg-foreground text-background font-display text-[10px] tracking-[0.28em] uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>
      </Link>

      {/* ── Text area ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5">
        {/* Category label */}
        {category && (
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
            {category}
          </p>
        )}

        {/* Product name — also a link so keyboard users can navigate */}
        <Link
          to={`/product/${handle}`}
          className="font-display text-sm font-medium uppercase tracking-wide text-foreground leading-snug hover:text-foreground/75 transition-colors duration-200"
        >
          {title}
        </Link>

        {/* Price */}
        <p className="font-body text-sm text-foreground/70 tabular-nums mt-0.5">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </div>
  );
};
