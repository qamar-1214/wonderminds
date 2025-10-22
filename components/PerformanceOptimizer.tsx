"use client";

import { useEffect } from "react";

// Performance optimization component
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Preload critical images
    const criticalImages = ["/worder minds Png logo.png"];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Cleanup
    return () => {
      // Remove preload links
      document.querySelectorAll('link[rel="preload"]').forEach((link) => {
        if (criticalImages.includes(link.getAttribute("href") || "")) {
          link.remove();
        }
      });
    };
  }, []);

  return null;
};
