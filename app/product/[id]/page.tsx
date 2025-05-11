"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import { getProductById, Product } from "@/lib/products";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id as string);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold mb-4">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold mb-4">
              Product not found
            </h1>
            <p className="text-neutral-600">
              The product you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}