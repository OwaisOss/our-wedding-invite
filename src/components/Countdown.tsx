"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-12-27T11:00:00+05:30").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export default function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: [string, number][] = [
    ["Days", t.d],
    ["Hours", t.h],
    ["Minutes", t.m],
    ["Seconds", t.s],
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-px gold-divider opacity-30"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <p className="font-display text-[10px] tracking-[0.6em] uppercase text-gold">
          ✦ counting the moments ✦
        </p>
        <div className="my-5 h-px w-24 gold-divider mx-auto" />
        <h3 className="font-script text-5xl sm:text-7xl gold-text leading-[0.95]">
          Until we say qubool hai
        </h3>
        <p className="mt-4 font-serif italic text-base sm:text-lg text-ink/65">
          every heartbeat closer to forever
        </p>

        <div className="mt-14 grid grid-cols-4 gap-3 sm:gap-6">
          {items.map(([label, val], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="group relative bg-ivory/80 backdrop-blur-sm px-2 py-7 sm:py-12 shadow-[0_18px_40px_-20px_rgba(60,15,20,0.35)]"
            >
              <div className="absolute inset-0 border border-gold/45 pointer-events-none" />
              <div className="absolute inset-2 border border-gold/15 pointer-events-none" />
              <div className="font-playfair text-4xl sm:text-6xl text-maroon-deep tabular-nums leading-none">
                {mounted ? String(val).padStart(2, "0") : "--"}
              </div>
              <div className="mt-3 font-display text-[9px] sm:text-[11px] tracking-[0.45em] uppercase text-ink/55">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
