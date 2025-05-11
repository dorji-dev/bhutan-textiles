import Hero from "@/components/hero";
import FeaturedProducts from "@/components/featured-products";
import WhyShopWithUs from "@/components/why-shop-with-us";
import ArtisanSpotlight from "@/components/artisan-spotlight";
import CategoryQuickLinks from "@/components/category-quick-links";
import Testimonials from "@/components/testimonials";
import CulturalInspiration from "@/components/cultural-inspiration";
import Newsletter from "@/components/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedProducts title="Featured Textiles" category="textiles" />
      <FeaturedProducts title="Featured Paintings" category="paintings" />
      <WhyShopWithUs />
      <CategoryQuickLinks />
      <ArtisanSpotlight />
      <Testimonials />
      <CulturalInspiration />
      <Newsletter />
    </div>
  );
}