import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from "@/lib/shopify";
import { MOCK_PRODUCTS } from "@/lib/mockProducts";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 12 });
        if (data?.data?.products?.edges?.length > 0) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title, position: "top-center" });
  };

  // Use live Shopify products when available, otherwise fall back to the
  // curated mock catalog so the storefront always looks populated.
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  if (loading) {
    return (
      <section id="products" className="py-24 container mx-auto px-6">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-24 container mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-2">Drop 001</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            The Collection
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden md:block font-body text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayProducts.map((product) => {
          const image = product.node.images.edges[0]?.node;
          const price = product.node.priceRange.minVariantPrice;
          return (
            <Link
              key={product.node.id}
              to={`/product/${product.node.handle}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-3">
                {image ? (
                  <img
                    src={image.url}
                    alt={image.altText || product.node.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">
                      LEVN
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={isCartLoading}
                  className="absolute bottom-0 left-0 right-0 bg-foreground text-background font-display text-xs tracking-[0.2em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
              <h3 className="font-display text-sm font-medium uppercase tracking-wide text-foreground leading-snug">
                {product.node.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
