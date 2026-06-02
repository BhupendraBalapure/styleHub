import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Product as PrismaProduct } from "@prisma/client";

const COLLECTIONS = ["women", "men", "accessories", "footwear"];

export function ProductForm({
  action,
  product,
}: {
  action: (formData: FormData) => void | Promise<void>;
  product?: PrismaProduct;
}) {
  const colorNames = Array.isArray(product?.colors)
    ? (product?.colors as { name: string }[]).map((c) => c.name).join(", ")
    : "";

  return (
    <form action={action} className="max-w-2xl space-y-5">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={product?.name} required className="h-11" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={product?.description} required rows={3} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" name="price" type="number" step="1" defaultValue={product?.price} required className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compareAtPrice">Compare-at (₹)</Label>
          <Input
            id="compareAtPrice"
            name="compareAtPrice"
            type="number"
            step="1"
            defaultValue={product?.compareAtPrice ?? ""}
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" defaultValue={product?.stock ?? 0} required className="h-11" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="collection">Collection</Label>
          <select
            id="collection"
            name="collection"
            defaultValue={product?.collection ?? "women"}
            className="h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm"
          >
            {COLLECTIONS.map((c) => (
              <option key={c} value={c} className="bg-background capitalize">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryName">Category label</Label>
          <Input id="categoryName" name="categoryName" defaultValue={product?.categoryName ?? "Dresses"} required className="h-11" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Image URLs (comma-separated)</Label>
        <Textarea id="images" name="images" defaultValue={product?.images?.join(", ")} rows={2} placeholder="https://images.unsplash.com/..., https://..." />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sizes">Sizes (comma-separated)</Label>
          <Input id="sizes" name="sizes" defaultValue={product?.sizes?.join(", ")} placeholder="XS, S, M, L, XL" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="colors">Color names (comma-separated)</Label>
          <Input id="colors" name="colors" defaultValue={colorNames} placeholder="Onyx, Ivory" className="h-11" />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 pt-1">
        <Check name="isNew" label="New arrival" checked={product?.isNew} />
        <Check name="isBestSeller" label="Best seller" checked={product?.isBestSeller} />
        <Check name="isTrending" label="Trending" checked={product?.isTrending} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit">{product ? "Save changes" : "Create product"}</Button>
        <Button asChild variant="ghost">
          <Link href="/admin/products">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

function Check({
  name,
  label,
  checked,
}: {
  name: string;
  label: string;
  checked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        className="h-4 w-4 rounded border-input accent-gold"
      />
      {label}
    </label>
  );
}
