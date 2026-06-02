import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  reviewCount?: number;
}

export function RatingStars({
  rating,
  size = 14,
  className,
  showValue = false,
  reviewCount,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={cn(
                filled ? "fill-gold text-gold" : "fill-transparent text-muted-foreground/40"
              )}
            />
          );
        })}
      </div>
      {showValue ? (
        <span className="text-xs text-muted-foreground">
          {rating.toFixed(1)}
          {typeof reviewCount === "number" ? ` (${reviewCount})` : null}
        </span>
      ) : null}
    </div>
  );
}
