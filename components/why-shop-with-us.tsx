import { Check, Gem, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyShopWithUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
            Why Shop With Us
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We connect you directly with Bhutanese artisans, ensuring authenticity and supporting local communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Authenticity */}
          <Card className="border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="pt-8 px-6 pb-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-neutral-600">
                Every piece is sourced directly from Bhutanese artisans who maintain centuries-old traditions and techniques.
              </p>
            </CardContent>
          </Card>

          {/* Quality */}
          <Card className="border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="pt-8 px-6 pb-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-secondary/10 text-secondary rounded-full mb-5">
                <Gem className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-neutral-600">
                Each item is handcrafted with meticulous attention to detail, using traditional methods passed down through generations.
              </p>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card className="border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="pt-8 px-6 pb-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full mb-5">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Impact</h3>
              <p className="text-neutral-600">
                Your purchase directly supports Bhutanese artisans and their families, helping preserve cultural heritage and sustainable livelihoods.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;