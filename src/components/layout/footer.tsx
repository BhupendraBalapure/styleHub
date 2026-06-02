import Link from "next/link";
import { AtSign, Camera, Music2, Send } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/shop?collection=women" },
      { label: "Men", href: "/shop?collection=men" },
      { label: "Accessories", href: "/shop?collection=accessories" },
      { label: "Footwear", href: "/shop?collection=footwear" },
      { label: "New Arrivals", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/" },
      { label: "Sustainability", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Shipping & Returns", href: "/" },
      { label: "Size Guide", href: "/" },
      { label: "Track Order", href: "/account/orders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Cookie Policy", href: "/" },
    ],
  },
];

const SOCIALS = [
  { icon: Camera, label: "Instagram" },
  { icon: Send, label: "X" },
  { icon: Music2, label: "TikTok" },
  { icon: AtSign, label: "Threads" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-semibold tracking-tight">
              STYLE<span className="text-gold">HUB</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Luxury fashion for the modern connoisseur. Crafted with intention,
              made to endure.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://instagram.com"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="text-xs font-medium uppercase luxe-track text-foreground">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} StyleHub. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider">We accept</span>
            <div className="flex items-center gap-2">
              {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
                <span
                  key={p}
                  className="rounded border border-border px-2 py-1 text-[10px] font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
