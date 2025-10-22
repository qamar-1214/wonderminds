"use client";

import { useEffect } from "react";

// Performance optimization component
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      "/worder minds Png logo.png",
      "/images/laura-rivera-ArH3dtoDQc0-unsplash.jpg",
      "/images/national-cancer-institute-N_aihp118p8-unsplash.jpg",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    const fontLinks = [
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    ];

    fontLinks.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = href;
      document.head.appendChild(link);
    });

    // Add intersection observer for lazy loading
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }

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
