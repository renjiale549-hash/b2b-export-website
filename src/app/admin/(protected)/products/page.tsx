import { ProductManager } from "@/components/admin/product-manager";
import { getCategories, getProducts } from "@/lib/content";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return <ProductManager products={products} categories={categories} />;
}
