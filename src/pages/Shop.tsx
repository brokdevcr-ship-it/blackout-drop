import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { CTASection } from "@/components/CTASection";

const Shop = () => (
  <Layout>
    <div className="pt-28">
      <ProductGrid />
      <CTASection />
    </div>
  </Layout>
);

export default Shop;
