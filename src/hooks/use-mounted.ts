"use client";

import { useEffect, useState } from "react";

/** Returns true only after the first client render — guards persisted store reads. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
