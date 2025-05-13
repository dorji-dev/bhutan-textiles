import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/19287541/pexels-photo-19287541/free-photo-of-paro-taktsang-in-bhutan.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="animate-fade-up">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white ring-1 ring-white/20">
                Discover Authentic Bhutanese Crafts
              </span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Where Tradition Meets <span className="text-[#D4A017]">Artistry</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Explore handcrafted textiles and paintings from the Land of the Thunder Dragon, 
              created by master artisans preserving centuries of tradition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-[#A61C3C] hover:bg-[#A61C3C]/90 text-white font-medium"
              >
                <Link href="/products/textiles">
                  Explore Textiles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/products/paintings">
                  View Paintings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#A61C3C] via-[#D4A017] to-[#1E3A8A]"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
          <div className="w-1 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;