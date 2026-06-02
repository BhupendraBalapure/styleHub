/**
 * Build a sized Unsplash image URL from a photo id.
 * All ids below were sourced from live Unsplash listings.
 */
export function unsplash(id: string, w = 900, h?: number) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: "80",
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}

/** Deterministic avatar from pravatar (allow-listed in next.config). */
export function avatar(seed: number) {
  return `https://i.pravatar.cc/150?img=${seed}`;
}
