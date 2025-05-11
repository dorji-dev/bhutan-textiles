import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "./product-card";

// Mock data for demonstration purposes
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
];

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
];

interface FeaturedProductsProps {
  title: string;
  category: "textiles" | "paintings";
}

const FeaturedProducts = ({ title, category }: FeaturedProductsProps) => {
  const products = category === "textiles" ? textileProducts : paintingProducts;

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