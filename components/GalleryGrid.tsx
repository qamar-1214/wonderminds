"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, Download } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
  showLightbox?: boolean;
}

const GalleryGrid = ({
  images,
  title = "Gallery",
  description = "Explore our learning environment and activities",
  showLightbox = true,
}: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    if (showLightbox) {
      setSelectedImage(image);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(
        (img) => img.id === selectedImage.id
      );
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex(
        (img) => img.id === selectedImage.id
      );
      const prevIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setSelectedImage(images[prevIndex]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl bg-muted/50"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Hover Actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2">
                  {showLightbox && (
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => openLightbox(image)}
                      className="bg-white/90 hover:bg-white text-gray-900"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => window.open(image.src, "_blank")}
                    className="bg-white/90 hover:bg-white text-gray-900"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Info */}
            {(image.title || image.description) && (
              <div className="p-4 space-y-2">
                {image.title && (
                  <h3 className="font-heading font-semibold text-foreground">
                    {image.title}
                  </h3>
                )}
                {image.description && (
                  <p className="text-sm text-muted-foreground">
                    {image.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
              <DialogHeader>
                <DialogTitle className="sr-only">
                  Gallery Image Viewer
                </DialogTitle>
              </DialogHeader>
              <div className="relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Image */}
                <div className="relative aspect-video">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    >
                      <X className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    >
                      <X className="h-4 w-4 -rotate-90" />
                    </Button>
                  </>
                )}

                {/* Image Info */}
                {(selectedImage.title || selectedImage.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <DialogHeader>
                      {selectedImage.title && (
                        <DialogTitle className="text-white font-heading text-xl">
                          {selectedImage.title}
                        </DialogTitle>
                      )}
                      {selectedImage.description && (
                        <DialogDescription className="text-gray-200">
                          {selectedImage.description}
                        </DialogDescription>
                      )}
                    </DialogHeader>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
