import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/lib/actions/admin";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl">Add product</h2>
      <ProductForm action={createProduct} />
    </div>
  );
}
