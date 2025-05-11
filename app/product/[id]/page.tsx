import ProductDetail from "@/components/product-detail";
import { getProductById } from "@/lib/products";

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" }
  ];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}