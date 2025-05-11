"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { SlidersHorizontal } from "lucide-react";

// Mock data
const textileProducts = [
  {
    id: 1,
    name: "Traditional Kira",
    price: 359.99,
    image: "https://images.pexels.com/photos/19287537/pexels-photo-19287537/free-photo-of-woman-holding-fabric.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Handwoven traditional Bhutanese women's dress with intricate patterns",
  },
  {
    id: 2,
    name: "Yathra Textile",
    price: 129.99,
    image: "https://images.pexels.com/photos/6192351/pexels-photo-6192351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Woolen textile with geometric patterns from central Bhutan",
  },
  {
    id: 3,
    name: "Ceremonial Scarf",
    price: 89.99,
    image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Handwoven silk scarf used in formal ceremonies",
  },
  {
    id: 4,
    name: "Bhutanese Tapestry",
    price: 249.99,
    image: "https://images.pexels.com/photos/5913169/pexels-photo-5913169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Wall hanging with traditional motifs and symbols",
  },
  {
    id: 5,
    name: "Traditional Gho",
    price: 399.99,
    image: "https://images.pexels.com/photos/6192351/pexels-photo-6192351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Men's traditional dress with hand-woven patterns",
  },
  {
    id: 6,
    name: "Silk Table Runner",
    price: 149.99,
    image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Decorative table runner with traditional Bhutanese motifs",
  },
];

export default function TextilesPage() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = textileProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
            Bhutanese Textiles
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our collection of handwoven fabrics, including traditional Kira,
            Gho, and ceremonial textiles crafted by skilled Bhutanese artisans.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden mb-4">
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Price Range</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600">
                  No products found in the selected price range.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}