import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// Body font
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Heading font
const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stylehub.example.com"),
  title: {
    default: "StyleHub — Luxury Fashion, Redefined",
    template: "%s · StyleHub",
  },
  description:
    "StyleHub is a premium fashion house for the modern connoisseur — curated collections of men's and women's apparel, accessories, and footwear.",
  keywords: [
    "luxury fashion",
    "designer clothing",
    "premium apparel",
    "StyleHub",
    "men's fashion",
    "women's fashion",
  ],
  openGraph: {
    title: "StyleHub — Luxury Fashion, Redefined",
    description:
      "Curated luxury collections for the modern connoisseur. Discover the new season at StyleHub.",
    type: "website",
    siteName: "StyleHub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
