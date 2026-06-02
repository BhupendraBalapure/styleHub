"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUIStore } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const NAV = [
  {
    label: "Women",
    href: "/shop?collection=women",
    columns: [
      { title: "Clothing", links: ["Dresses", "Outerwear", "Blazers", "Knitwear", "Skirts"] },
      { title: "Collections", links: ["New In", "Evening", "Tailoring", "Essentials"] },
    ],
    feature: categories[0],
  },
  {
    label: "Men",
    href: "/shop?collection=men",
    columns: [
      { title: "Clothing", links: ["Suits", "Shirts", "Knitwear", "Outerwear", "Trousers"] },
      { title: "Collections", links: ["New In", "Formalwear", "Smart Casual", "Essentials"] },
    ],
    feature: categories[1],
  },
  {
    label: "Accessories",
    href: "/shop?collection=accessories",
    columns: [
      { title: "Bags", links: ["Totes", "Shoulder Bags", "Crossbody", "Clutches"] },
      { title: "More", links: ["Belts", "Wallets", "Scarves", "Eyewear"] },
    ],
    feature: categories[2],
  },
  {
    label: "Footwear",
    href: "/shop?collection=footwear",
    columns: [
      { title: "Styles", links: ["Sneakers", "Loafers", "Boots", "Heels"] },
      { title: "Collections", links: ["New In", "Icons", "Essentials"] },
    ],
    feature: categories[3],
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();

  const openSearch = useUIStore((s) => s.openSearch);
  const openCart = useUIStore((s) => s.openCart);
  const cartItems = useCartStore((s) => s.items);
  const wishItems = useWishlistStore((s) => s.items);

  const cartCount = mounted
    ? cartItems.reduce((sum, i) => sum + i.quantity, 0)
    : 0;
  const wishCount = mounted ? wishItems.length : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = isHome && !scrolled;
  const solid = !overHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          )}
        >
          {/* Left: mobile trigger + nav */}
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={cn(
                    "-ml-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
                    overHero ? "text-white" : "text-foreground"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle className="font-serif text-2xl tracking-tight">
                    STYLE<span className="text-gold">HUB</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="px-3 py-4">
                  <Accordion type="single" collapsible>
                    {NAV.map((item) => (
                      <AccordionItem key={item.label} value={item.label}>
                        <AccordionTrigger className="px-3 text-base">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-1 pl-3">
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="py-1.5 text-sm font-medium text-gold"
                            >
                              Shop all {item.label}
                            </Link>
                            {item.columns
                              .flatMap((c) => c.links)
                              .map((l) => (
                                <Link
                                  key={l}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-1.5 text-sm text-muted-foreground hover:text-foreground"
                                >
                                  {l}
                                </Link>
                              ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="mt-4 flex flex-col gap-1 border-t px-3 pt-4">
                    <MobileLink href="/account" onClick={() => setMobileOpen(false)}>
                      My Account
                    </MobileLink>
                    <MobileLink href="/account/orders" onClick={() => setMobileOpen(false)}>
                      Orders
                    </MobileLink>
                    <MobileLink href="/account/wishlist" onClick={() => setMobileOpen(false)}>
                      Wishlist
                    </MobileLink>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t px-3 pt-4">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <MegaMenuItem key={item.label} item={item} overHero={overHero} />
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 font-serif text-xl font-semibold tracking-tight transition-colors md:text-2xl",
              overHero ? "text-white" : "text-foreground"
            )}
          >
            STYLE<span className="text-gold">HUB</span>
          </Link>

          {/* Right: actions */}
          <div
            className={cn(
              "flex items-center gap-0.5 transition-colors sm:gap-1",
              overHero ? "text-white" : "text-foreground"
            )}
          >
            <IconButton label="Search" onClick={openSearch}>
              <Search className="h-[18px] w-[18px]" />
            </IconButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Account"
                  suppressHydrationWarning
                  className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 sm:flex"
                >
                  <User className="h-[18px] w-[18px]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Create account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/account/wishlist"
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 sm:flex"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 ? <CountBadge count={wishCount} /> : null}
            </Link>

            <IconButton label="Bag" onClick={openCart} className="relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 ? <CountBadge count={cartCount} /> : null}
            </IconButton>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      {!isHome ? <div className="h-16 md:h-20" /> : null}
    </>
  );
}

function MegaMenuItem({
  item,
  overHero,
}: {
  item: (typeof NAV)[number];
  overHero: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="static"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "relative flex h-16 items-center px-4 text-sm font-medium tracking-wide transition-colors",
          overHero ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
        )}
      >
        {item.label}
      </Link>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full border-b border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <div className="container grid grid-cols-[1fr_1fr_1.2fr] gap-8 py-8">
              {item.columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <p className="text-xs font-medium uppercase luxe-track text-muted-foreground">
                    {col.title}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <Link
                          href={item.href}
                          className="text-sm text-foreground/80 transition-colors hover:text-gold"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href={item.href}
                className="group relative aspect-[16/10] overflow-hidden rounded-xl"
              >
                <Image
                  src={item.feature.image}
                  alt={item.feature.name}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-serif text-lg">{item.feature.name}</p>
                  <span className="flex items-center gap-1 text-sm text-white/80">
                    Shop now <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/10",
        className
      )}
    >
      {children}
    </button>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
      {count}
    </span>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
