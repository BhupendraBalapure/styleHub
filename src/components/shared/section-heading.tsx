import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-medium uppercase luxe-track text-gold">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl text-balance">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-sm text-muted-foreground sm:text-base",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
