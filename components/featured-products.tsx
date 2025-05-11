"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import { Product } from "@/lib/products";

interface FeaturedProductsProps {
  title: string;
  category: "textiles" | "paintings";
}

const FeaturedProducts = ({ title, category }: FeaturedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getProducts();
        const filteredProducts = allProducts
          .filter(product => product.category === category && product.status === 'active')
          .slice(0, 4); // Only show first 4 products
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (isLoading) {
    return (
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
                {title}
              </h2>
              <p className="text-neutral-600 max-w-2xl">
                Loading products...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[300px] bg-white/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
              {title}
            </h2>
            <p className="text-neutral-600 max-w-2xl">
              Authentic handcrafted pieces showcasing Bhutan's rich artistic heritage and cultural traditions.
            </p>
          </div>
          
          <Button 
            asChild
            variant="link" 
            className="text-primary hover:text-primary/80 font-medium mt-4 md:mt-0 p-0"
          >
            <Link href={`/products/${category}`}>
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;