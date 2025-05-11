"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { SlidersHorizontal } from "lucide-react";

// Mock data
const paintingProducts = [
  {
    id: 1,
    name: "Thangka Painting",
    price: 499.99,
    image: "https://images.pexels.com/photos/19304177/pexels-photo-19304177/free-photo-of-buddhist-monastery-in-paro-bhutan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Traditional Buddhist scroll painting depicting deities",
  },
  {
    id: 2,
    name: "Dzong Architecture",
    price: 299.99,
    image: "https://images.pexels.com/photos/19304175/pexels-photo-19304175/free-photo-of-traditional-bhutanese-style-building-in-paro-trongsa-dzong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Watercolor painting of a traditional Bhutanese fortress",
  },
  {
    id: 3,
    name: "Bhutanese Landscape",
    price: 199.99,
    image: "https://images.pexels.com/photos/19287541/pexels-photo-19287541/free-photo-of-paro-taktsang-in-bhutan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Original painting of Bhutan's mountainous landscapes",
  },
  {
    id: 4,
    name: "Mandala Art",
    price: 399.99,
    image: "https://images.pexels.com/photos/7486798/pexels-photo-7486798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Intricate geometric patterns representing the cosmos",
  },
  {
    id: 5,
    name: "Buddhist Deities",
    price: 599.99,
    image: "https://images.pexels.com/photos/19304177/pexels-photo-19304177/free-photo-of-buddhist-monastery-in-paro-bhutan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Traditional painting of Buddhist deities with gold details",
  },
  {
    id: 6,
    name: "Festival Scene",
    price: 349.99,
    image: "https://images.pexels.com/photos/19304175/pexels-photo-19304175/free-photo-of-traditional-bhutanese-style-building-in-paro-trongsa-dzong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Vibrant depiction of a traditional Bhutanese festival",
  },
];

export default function PaintingsPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = paintingProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
            Bhutanese Paintings
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our collection of traditional Thangka paintings, mandalas, and
            contemporary Bhutanese art created by skilled local artists.
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
                    max={1000}
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
                      max={1000}
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