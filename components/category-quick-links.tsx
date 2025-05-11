import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CategoryQuickLinks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
            Explore Our Collections
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover the rich artistic traditions of Bhutan through our handcrafted textiles and paintings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Textiles Category */}
          <Link href="/products/textiles" className="block group">
            <Card className="border-0 overflow-hidden h-[400px] relative shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.pexels.com/photos/6192351/pexels-photo-6192351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
              
              <CardContent className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-[#D4A017] text-white text-xs uppercase tracking-wider px-3 py-1 rounded mb-3 inline-block">
                  Collection
                </span>
                <h3 className="text-3xl font-heading font-bold mb-2 group-hover:text-[#D4A017] transition-colors">
                  Textiles
                </h3>
                <p className="text-white/90 mb-4 max-w-md">
                  Explore our collection of handwoven fabrics, including traditional Kira, Gho, and ceremonial textiles.
                </p>
                <span className="inline-flex items-center text-[#D4A017] font-medium transition-all group-hover:translate-x-2">
                  Discover More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>

          {/* Paintings Category */}
          <Link href="/products/paintings" className="block group">
            <Card className="border-0 overflow-hidden h-[400px] relative shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.pexels.com/photos/7486798/pexels-photo-7486798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
              
              <CardContent className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-[#A61C3C] text-white text-xs uppercase tracking-wider px-3 py-1 rounded mb-3 inline-block">
                  Collection
                </span>
                <h3 className="text-3xl font-heading font-bold mb-2 group-hover:text-[#A61C3C] transition-colors">
                  Paintings
                </h3>
                <p className="text-white/90 mb-4 max-w-md">
                  Discover traditional Thangka paintings, mandalas, and contemporary Bhutanese art.
                </p>
                <span className="inline-flex items-center text-[#A61C3C] font-medium transition-all group-hover:translate-x-2">
                  Discover More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryQuickLinks;