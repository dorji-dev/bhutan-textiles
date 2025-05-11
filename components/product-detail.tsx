"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import CartModal from "./cart-modal";

const getRelatedProducts = (category: string, currentId: string) => {
  const textileProducts = [
    {
      id: "3",
      name: "Ceremonial Scarf",
      price: 89.99,
      image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Handwoven silk scarf used in formal ceremonies",
    },
    {
      id: "4",
      name: "Bhutanese Tapestry",
      price: 249.99,
      image: "https://images.pexels.com/photos/5913169/pexels-photo-5913169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Wall hanging with traditional motifs and symbols",
    },
  ];

  const paintingProducts = [
    {
      id: "5",
      name: "Mandala Art",
      price: 399.99,
      image: "https://images.pexels.com/photos/7486798/pexels-photo-7486798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Intricate geometric patterns representing the cosmos",
    },
    {
      id: "6",
      name: "Dzong Architecture",
      price: 299.99,
      image: "https://images.pexels.com/photos/19304175/pexels-photo-19304175/free-photo-of-traditional-bhutanese-style-building-in-paro-trongsa-dzong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Watercolor painting of a traditional Bhutanese fortress",
    },
  ];

  return category === "textiles" ? textileProducts : paintingProducts;
};

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    details: {
      material: string;
      technique: string;
      origin: string;
      dimensions: string;
      care: string;
    };
    artisan: {
      name: string;
      location: string;
      story: string;
    };
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const relatedProducts = getRelatedProducts(product.category, product.id);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-accent py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div 
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setIsImageDialogOpen(true)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url(${product.images[selectedImage]})` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square rounded-md overflow-hidden ${
                    index === selectedImage ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl text-primary font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="prose prose-neutral">
              <p className="text-neutral-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <dl className="space-y-2">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4">
                    <dt className="font-medium text-neutral-600 capitalize">{key}:</dt>
                    <dd className="col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Artisan</h3>
              <div className="bg-white p-4 rounded-lg border border-border/50">
                <p className="font-medium">{product.artisan.name}</p>
                <p className="text-sm text-neutral-600">{product.artisan.location}</p>
                <p className="mt-2 text-sm">{product.artisan.story}</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black">
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setIsImageDialogOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20"
                onClick={previousImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${product.images[selectedImage]})` }}
              ></div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
      </div>
    </div>
  );
}