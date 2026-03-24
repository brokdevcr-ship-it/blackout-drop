import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductGrid />
      <CategoriesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
