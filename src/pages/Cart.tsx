import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCartStore } from "@/stores/cartStore";

const Cart = () => {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";

  useEffect(() => { syncCart(); }, [syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <Layout>
      <div className="pt-28 pb-24 container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-12">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 border border-border">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-body text-muted-foreground mb-8">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Line items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const image = item.product.node.images?.edges?.[0]?.node;
                const lineTotal = (parseFloat(item.price.amount) * item.quantity).toFixed(2);
                return (
                  <div key={item.variantId} className="flex gap-6 p-4 border border-border">
                    <div className="w-24 h-24 bg-secondary flex-shrink-0 overflow-hidden">
                      {image && (
                        <img src={image.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-medium uppercase tracking-wide text-foreground">
                        {item.product.node.title}
                      </h3>
                      {item.selectedOptions.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.selectedOptions.map((o) => o.value).join(" · ")}
                        </p>
                      )}
                      <p className="font-body text-sm font-semibold text-foreground mt-2">
                        {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            className="w-7 h-7 border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm text-foreground">{item.quantity}</span>
                          <button
                            className="w-7 h-7 border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          className="text-muted-foreground hover:text-foreground transition-colors ml-2"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-body text-sm font-semibold text-foreground">
                        {item.price.currencyCode} {lineTotal}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border border-border p-6 space-y-6">
                <h2 className="font-display text-sm tracking-widest uppercase text-foreground">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="text-foreground font-body">
                      {currency} {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">Shipping</span>
                    <span className="text-accent font-body text-xs tracking-wide uppercase">
                      At checkout
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <span className="font-display text-sm tracking-widest uppercase text-foreground">Total</span>
                  <span className="font-body text-lg font-bold text-foreground">
                    {currency} {totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  className="w-full h-12 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Checkout
                    </>
                  )}
                </button>
                <Link
                  to="/shop"
                  className="block text-center font-body text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
