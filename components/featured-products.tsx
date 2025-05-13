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
          .slice(0, 4);
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
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
                {title}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl">
                Loading exquisite pieces...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-white/50 rounded-lg animate-pulse" />
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
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Featured Collection
            </span>
            <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Discover handcrafted pieces that showcase the rich artistic heritage 
              and cultural traditions of Bhutan.
            </p>
          </div>
          
          <Button 
            asChild
            variant="link" 
            className="text-primary hover:text-primary/80 font-medium mt-6 md:mt-0 p-0"
          >
            <Link href={`/products/${category}`} className="group">
              View All Collections
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;