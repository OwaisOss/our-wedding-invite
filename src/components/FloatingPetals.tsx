"use client";

import { useEffect, useState } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  opacity: number;
};

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 16,
      size: 14 + Math.random() * 22,
      rotate: Math.random() * 360,
      opacity: 0.35 + Math.random() * 0.45,
    }));
    setPetals(arr);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden>
            <path
              d="M16 2 C22 8, 28 14, 16 30 C4 14, 10 8, 16 2 Z"
              fill="#5a1320"
              opacity="0.85"
            />
            <path
              d="M16 6 C20 11, 24 15, 16 26 C8 15, 12 11, 16 6 Z"
              fill="#7a1f2e"
              opacity="0.6"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
