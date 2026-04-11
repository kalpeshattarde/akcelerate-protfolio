import { useState, useEffect, useCallback } from "react";

interface TypingCycleProps {
  texts: string[];
  speed?: number;
  className?: string;
}

export default function TypingCycle({ texts, speed = 80, className = "" }: TypingCycleProps) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (pos < cur.length) {
        timeout = setTimeout(() => {
          setDisplay(cur.slice(0, pos + 1));
          setPos(pos + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (pos > 0) {
        timeout = setTimeout(() => {
          setDisplay(cur.slice(0, pos - 1));
          setPos(pos - 1);
        }, speed / 2);
      } else {
        setDeleting(false);
        setIdx((idx + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [pos, deleting, idx, texts, speed]);

  return (
    <span className={className}>
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}
