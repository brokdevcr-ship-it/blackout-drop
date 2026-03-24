import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { getMockProductByHandle } from "@/lib/mockProducts";
import { useCartStore } from "@/stores/cartStore";
import { Layout } from "@/components/Layout";
import { Loader2, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: { id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> } }> };
  options: Array<{ name: string; values: string[] }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          const p = data.data.product;
          setProduct(p);
          const defaults: Record<string, string> = {};
          p.options.forEach((opt: { name: string; values: string[] }) => {
            defaults[opt.name] = opt.values[0];
          });
          setSelectedOptions(defaults);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }

      // Shopify returned nothing — check the local mock catalog
      const mock = getMockProductByHandle(handle ?? '');
      if (mock) {
        setProduct(mock.node);
        const defaults: Record<string, string> = {};
        mock.node.options.forEach((opt) => { defaults[opt.name] = opt.values[0]; });
        setSelectedOptions(defaults);
      }

      setLoading(false);
    };
    fetchProduct();
  }, [handle]);

  const getSelectedVariant = () => {
    if (!product) return null;
    return product.variants.edges.find(v =>
      v.node.selectedOptions.every(so => selectedOptions[so.name] === so.value)
    )?.node || product.variants.edges[0]?.node;
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = getSelectedVariant();
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <p className="text-muted-foreground">Product not found</p>
          <Link to="/shop" className="text-accent text-sm hover:underline">← Back to shop</Link>
        </div>
      </Layout>
    );
  }

  const images = product.images.edges;
  const variant = getSelectedVariant();

  return (
    <Layout>
      <div className="pt-28 pb-16 container mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square bg-secondary overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-foreground' : 'border-transparent'}`}
                  >
                    <img src={img.node.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-2">LEVN</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
              {product.title}
            </h1>
            <p className="font-body text-2xl font-semibold text-foreground mt-4">
              {variant?.price.currencyCode} {parseFloat(variant?.price.amount || '0').toFixed(2)}
            </p>

            {product.options.map((option) => (
              option.values.length > 1 && (
                <div key={option.name} className="mt-8">
                  <label className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                        className={`h-10 px-5 border font-body text-sm tracking-wide transition-all duration-200 ${
                          selectedOptions[option.name] === value
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading || !variant?.availableForSale}
              className="mt-10 h-14 bg-primary text-primary-foreground font-display text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              {isCartLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : !variant?.availableForSale ? (
                'Sold Out'
              ) : (
                'Add to Cart'
              )}
            </button>

            {product.description && (
              <div className="mt-10 pt-8 border-t border-border">
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
