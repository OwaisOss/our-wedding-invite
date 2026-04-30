"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Couple() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <Image
        src="/assets/maroon-flower.jpg"
        alt=""
        width={500}
        height={500}
        className="absolute -top-10 right-0 w-44 sm:w-64 opacity-30 mix-blend-multiply rotate-12"
      />
      <Image
        src="/assets/maroon-flower.jpg"
        alt=""
        width={500}
        height={500}
        className="absolute -bottom-10 left-0 w-44 sm:w-64 opacity-30 mix-blend-multiply -rotate-12"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: yImg }} className="relative">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3px] shadow-[0_30px_80px_rgba(60,15,20,0.18)]">
            <Image
              src="/assets/couple.jpg"
              alt="The couple"
              fill
              sizes="(max-width:768px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-gold/40" />
            <div className="absolute inset-2 ring-1 ring-gold/20" />
          </div>
        </motion.div>

        <motion.div style={{ y: yText }} className="text-center md:text-left">
          <p className="font-display text-[10px] tracking-[0.6em] uppercase text-gold">
            ✦ our story ✦
          </p>
          <div className="my-5 h-px w-24 gold-divider mx-auto md:mx-0" />
          <h3 className="font-script text-6xl sm:text-8xl gold-text leading-[0.95]">
            Two souls,<br />one path.
          </h3>
          <p className="mt-8 font-serif italic text-lg sm:text-xl text-ink/75 leading-relaxed text-balance">
            What began as a quiet prayer has become a promise — written in the
            stars, sealed in faith, and carried by the love of two families.
            With hearts grateful and hands joined, we invite you to witness the
            beginning of our forever.
          </p>
          <div className="mt-8 inline-flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="font-display text-xs tracking-[0.45em] uppercase text-maroon">
              owais &amp; shafaqat
            </span>
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
