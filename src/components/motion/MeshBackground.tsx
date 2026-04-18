import { motion } from "framer-motion";

/**
 * Cinematic animated mesh-gradient background.
 * Renders 3 large blurred orbs that drift slowly.
 * Designed to sit behind hero/landing sections.
 */
export default function MeshBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 600,
          height: 600,
          top: "-10%",
          left: "-10%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.25), transparent 60%)",
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 500,
          height: 500,
          bottom: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, hsl(var(--accent) / 0.22), transparent 60%)",
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 420,
          height: 420,
          top: "30%",
          left: "45%",
          background: "radial-gradient(circle, hsl(265 85% 65% / 0.18), transparent 60%)",
        }}
        animate={{ x: [0, 50, -30, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
