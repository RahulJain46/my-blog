"use client";

import { useEffect } from "react";

export function RefreshCache({ check }) {
  useEffect(() => {
    const onFocus = () => check();

    window.addEventListener("onFocus", onFocus);
    return () => window.removeEventListener("onFocus", onFocus);
  });
  return null;
}
