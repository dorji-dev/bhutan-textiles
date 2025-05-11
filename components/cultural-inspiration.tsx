import Link from "next/link";
import { Button } from "@/components/ui/button";

const CulturalInspiration = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/6899268/pexels-photo-6899268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-[#A61C3C]/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm uppercase tracking-wider px-3 py-1 rounded mb-6">
            Cultural Heritage
          </span>
          
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Inspired by Bhutan's Traditions
          </h2>
          
          <p className="text-lg text-white/90 mb-8">
            Each piece in our collection tells a story of Bhutan's rich cultural heritage, 
            representing centuries of artistic tradition and Buddhist symbolism. From the 
            vibrant festivals to the serene monasteries, our artisans draw inspiration from 
            the unique culture of the Land of the Thunder Dragon.
          </p>
          
          <Button 
            asChild
            size="lg"
            className="bg-white text-[#A61C3C] hover:bg-white/90"
          >
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CulturalInspiration;