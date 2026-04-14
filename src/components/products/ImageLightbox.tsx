import { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (open) {
      setScale(1);
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "+" || e.key === "=") setScale(s => Math.min(s + 0.25, 4));
        if (e.key === "-") setScale(s => Math.max(s - 0.25, 0.5));
      };
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKey);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); setScale(s => Math.max(s - 0.25, 0.5)); }}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-white/70 text-sm font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
        <button
          onClick={(e) => { e.stopPropagation(); setScale(s => Math.min(s + 0.25, 4)); }}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors ml-2"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="overflow-auto max-h-[90vh] max-w-[90vw] cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          e.stopPropagation();
          setScale(s => {
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            return Math.min(Math.max(s + delta, 0.5), 4);
          });
        }}
      >
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-2xl transition-transform duration-200 select-none"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
          draggable={false}
        />
      </div>
    </div>
  );
}
