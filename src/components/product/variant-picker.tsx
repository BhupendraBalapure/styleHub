"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types";

interface VariantPickerProps {
  sizes: string[];
  colors: ProductColor[];
  size: string;
  color: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export function VariantPicker({
  sizes,
  colors,
  size,
  color,
  onSizeChange,
  onColorChange,
}: VariantPickerProps) {
  return (
    <div className="space-y-5">
      {colors.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Color
            </span>
            <span className="text-xs text-foreground">{color}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {colors.map((c) => {
              const active = c.name === color;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  onClick={() => onColorChange(c.name)}
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition",
                    active ? "ring-2 ring-gold" : "ring-1 ring-border hover:ring-foreground/40"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {active ? (
                    <Check
                      className="h-4 w-4"
                      style={{
                        color: isLight(c.hex) ? "#0F0F0F" : "#FFFFFF",
                      }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Size
          </span>
          <button
            type="button"
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const active = s === size;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onSizeChange(s)}
                className={cn(
                  "min-w-[3rem] rounded-md border px-3 py-2 text-sm transition",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground/50"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isLight(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
