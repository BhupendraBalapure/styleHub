"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useUIStore } from "@/store/ui";
import { categories, products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export function SearchCommand() {
  const router = useRouter();
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!useUIStore.getState().searchOpen);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search products, collections..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Collections">
          {categories.map((c) => (
            <CommandItem
              key={c.id}
              value={`collection ${c.name}`}
              onSelect={() => go(`/shop?collection=${c.slug}`)}
            >
              <span className="capitalize">{c.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {c.itemCount} items
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Products">
          {products.map((p) => (
            <CommandItem
              key={p.id}
              value={`${p.name} ${p.category} ${p.collection}`}
              onSelect={() => go(`/product/${p.slug}`)}
              className="gap-3"
            >
              <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded bg-muted">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{p.name}</span>
                <span className="text-xs text-muted-foreground">
                  {p.category}
                </span>
              </div>
              <span className="ml-auto text-sm">{formatPrice(p.price)}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
