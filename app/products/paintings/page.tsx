"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { SlidersHorizontal, PackageSearch } from "lucide-react";
import { getProducts, Product } from "@/lib/products";

export default function PaintingsPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getProducts();
        const paintingProducts = allProducts.filter(
          product => product.category === 'paintings' && product.status === 'active'
        );
        setProducts(paintingProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
              Bhutanese Paintings
            </h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Loading products...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] bg-white/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
              Bhutanese Paintings
            </h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              No painting products available at the moment. Please check back later.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <PackageSearch className="h-16 w-16 text-neutral-400 mb-4" />
            <p className="text-neutral-600">No products found</p>
          </div>
        </div>
      </div>
    );
  }

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
                <PackageSearch className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
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

}