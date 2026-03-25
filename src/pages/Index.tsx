import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoriesSection } from "@/components/CategoriesSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductGrid />
      <CategoriesSection />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
