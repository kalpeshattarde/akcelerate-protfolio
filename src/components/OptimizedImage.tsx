import { ImgHTMLAttributes, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Skip lazy loading for above-the-fold images */
  priority?: boolean;
}

/**
 * Drop-in <img> replacement with lazy loading, fade-in, and decoding="async".
 * Use priority={true} for hero / above-the-fold images.
 */
export default function OptimizedImage({
  className,
  priority = false,
  alt = "",
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If already cached by browser, mark loaded immediately
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={imgRef}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    />
  );
}
