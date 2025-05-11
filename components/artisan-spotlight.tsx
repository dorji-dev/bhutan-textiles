import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const ArtisanSpotlight = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#F5F5F5] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
            Artisan Spotlight
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Meet the skilled craftspeople behind our beautiful collections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Artisan Image */}
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/19287537/pexels-photo-19287537/free-photo-of-woman-holding-fabric.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block bg-[#D4A017] text-white text-xs uppercase tracking-wider px-3 py-1 rounded mb-2">
                Master Weaver
              </span>
              <h3 className="text-2xl font-semibold">Tshering Yangzom</h3>
              <p className="text-white/90">Thimphu, Bhutan</p>
            </div>
          </div>

          {/* Artisan Story */}
          <div className="flex flex-col">
            <div className="text-[#D4A017] mb-4">
              <Quote className="h-10 w-10" />
            </div>
            
            <p className="text-lg text-neutral-700 italic mb-8">
              "My grandmother taught me to weave when I was just seven years old. 
              Each piece I create carries the stories and traditions of my ancestors.
              Every pattern has meaning, every color represents an aspect of our
              natural world and Buddhist beliefs."
            </p>
            
            <p className="text-neutral-600 mb-8">
              Tshering Yangzom has been weaving traditional Bhutanese textiles for over 25 years. 
              She specializes in the intricate Kushuthara technique, creating stunning ceremonial 
              garments that can take up to six months to complete. Her work has been displayed in 
              museums across Asia and Europe.
            </p>
            
            <div className="mt-auto">
              <Button
                asChild
                className="bg-[#D4A017] hover:bg-[#D4A017]/90 text-white"
              >
                <Link href="/artisans">
                  Meet Our Artisans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlight;