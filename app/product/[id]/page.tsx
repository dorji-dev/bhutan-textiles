import ProductDetail from "@/components/product-detail";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

// Remove generateStaticParams since we want dynamic routing
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}