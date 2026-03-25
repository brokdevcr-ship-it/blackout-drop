import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from "@/lib/shopify";
import { MOCK_PRODUCTS } from "@/lib/mockProducts";
import { ProductCard } from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 12 });
        if (data?.data?.products?.edges?.length > 0) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-2">
            Drop 001
          </p>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
        {displayProducts.map((product, index) => (
          <ProductCard
            key={product.node.id}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
};
