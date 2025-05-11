import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/16929460/pexels-photo-16929460/free-photo-of-prayer-flags-hanging-in-paro-taktsang-monastery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/80 via-[#A61C3C]/60 to-[#1E3A8A]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="inline-block mb-6">
          <span className="inline-flex items-center rounded-full bg-[#D4A017]/20 px-3 py-1 text-sm font-medium text-[#D4A017] backdrop-blur-sm ring-1 ring-[#D4A017]/30">
            100% Handmade
          </span>
        </div>
        
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Authentic Bhutanese Textiles & Paintings
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Handcrafted Artistry from the Heart of Bhutan
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            asChild
            size="lg" 
            className="bg-[#A61C3C] hover:bg-[#A61C3C]/90 text-white font-medium"
          >
            <Link href="/products/textiles">
              Shop Textiles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button 
            asChild
            size="lg" 
            variant="secondary"
            className="bg-[#D4A017] hover:bg-[#D4A017]/90 text-white font-medium"
          >
            <Link href="/products/paintings">
              Explore Paintings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;