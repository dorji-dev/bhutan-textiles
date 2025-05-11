"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import CartModal from "./cart-modal";
import { Product, getProducts } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        const allProducts = await getProducts();
        const filtered = allProducts
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error loading related products:', error);
      }
    }

    loadRelatedProducts();
  }, [product.category, product.id]);

  if (!product || !product.images || product.images.length === 0) {
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
      quantity,
    });
    setIsCartOpen(true);
    setQuantity(1); // Reset quantity after adding to cart
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
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

            {product.details && (
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
            )}

            {product.artisan && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Artisan</h3>
                <div className="bg-white p-4 rounded-lg border border-border/50">
                  <p className="font-medium">{product.artisan.name}</p>
                  <p className="text-sm text-neutral-600">{product.artisan.location}</p>
                  <p className="mt-2 text-sm">{product.artisan.story}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-neutral-600">
                {product.stock} items available
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
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
        )}

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