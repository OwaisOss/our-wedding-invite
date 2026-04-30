"use client";
import { motion } from "framer-motion";

export default function Bismillah() {
  return (
    <section className="relative py-32 px-6 bg-paper overflow-hidden">
      <div className="absolute inset-x-0 top-0 mx-auto h-px gold-divider opacity-60" />
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px gold-divider opacity-60" />

      {/* hand-drawn-style ornaments */}
      <svg
        aria-hidden
        viewBox="0 0 200 60"
        className="absolute left-1/2 -translate-x-1/2 top-10 w-48 sm:w-64 text-gold-soft/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M10 30 Q60 5, 100 30 T 190 30" />
        <circle cx="100" cy="30" r="2" fill="currentColor" />
        <circle cx="60" cy="20" r="1" fill="currentColor" />
        <circle cx="140" cy="20" r="1" fill="currentColor" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="font-display text-[10px] tracking-[0.55em] uppercase text-gold mb-8">
          ✦ بِسْمِ اللّٰهِ ✦
        </p>
        <p
          className="font-arabic text-4xl sm:text-6xl leading-loose text-maroon-deep"
          dir="rtl"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <div className="mx-auto my-10 h-px w-40 gold-divider" />
        <p className="font-serif italic text-lg sm:text-2xl text-ink/70 text-balance leading-relaxed">
          In the name of Allah,
          <br className="hidden sm:block" />
          {" "}the Most Gracious, the Most Merciful.
        </p>
      </motion.div>

      <svg
        aria-hidden
        viewBox="0 0 200 60"
        className="absolute left-1/2 -translate-x-1/2 bottom-10 w-48 sm:w-64 text-gold-soft/70 rotate-180"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M10 30 Q60 5, 100 30 T 190 30" />
        <circle cx="100" cy="30" r="2" fill="currentColor" />
        <circle cx="60" cy="20" r="1" fill="currentColor" />
        <circle cx="140" cy="20" r="1" fill="currentColor" />
      </svg>
    </section>
  );
}
