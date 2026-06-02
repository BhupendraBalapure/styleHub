import { Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createCategory, deleteCategory } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 font-serif text-2xl">Categories ({categories.length})</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-border p-4"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  /{c.slug} · {c._count.products} products
                </p>
              </div>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Delete category"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </li>
          ))}
        </ul>
      </div>

      <form action={createCategory} className="max-w-md space-y-4 rounded-xl border border-border p-5">
        <p className="font-medium">Add category</p>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" name="image" className="h-11" />
        </div>
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" /> Add category
        </Button>
      </form>
    </div>
  );
}
