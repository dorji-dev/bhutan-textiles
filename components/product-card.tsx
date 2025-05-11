import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/20">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          style={{backgroundImage: `url(${product.images[0]})`}}></div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </Link>

      <CardContent className="pt-4">
        <div className="mb-2">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-neutral-900 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="font-medium text-lg text-primary">
          ${product.price.toFixed(2)}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <Button 
          asChild
          className="w-full bg-secondary hover:bg-secondary/90 font-medium" 
        >
          <Link href={`/product/${product.id}`} className="flex items-center justify-center">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;