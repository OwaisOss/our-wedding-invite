"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ConfettiProps = {
  width: number;
  height: number;
  numberOfPieces?: number;
  recycle?: boolean;
  gravity?: number;
  colors?: string[];
};

export default function Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [Confetti, setConfetti] = useState<React.ComponentType<ConfettiProps> | null>(null);

  useEffect(() => {
    const onView = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        import("react-confetti").then((m) =>
          setConfetti(() => m.default as unknown as React.ComponentType<ConfettiProps>)
        );
        setSize({ w: window.innerWidth, h: window.innerHeight });
      }
    };
    const o = new IntersectionObserver(onView, { threshold: 0.4 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden text-ivory"
    >
      {/* deep maroon base — no more transparent white bleed */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, var(--maroon) 0%, var(--maroon-deep) 55%, #1f0810 100%)",
        }}
      />

      {/* soft top-fade so it blends with the previous section */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ivory to-transparent"
      />

      {/* ornate overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(201,169,106,0.6) 0, transparent 30%), radial-gradient(circle at 80% 80%, rgba(201,169,106,0.5) 0, transparent 30%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(201,169,106,0.5) 0 1px, transparent 1px 18px)",
        }}
      />

      {/* confetti */}
      {Confetti && size && (
        <Confetti
          width={size.w}
          height={size.h}
          numberOfPieces={140}
          recycle={false}
          gravity={0.08}
          colors={["#b08945", "#c9a96a", "#e9d8b8", "#f7f1e6", "#7a1f2e"]}
        />
      )}

      <div className="relative px-6 pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-2xl"
        >
          {/* gold ornamental frame */}
          <div className="relative mx-auto inline-block px-10 py-12 sm:px-16 sm:py-16">
            <div className="pointer-events-none absolute inset-0 border border-gold/40" />
            <div className="pointer-events-none absolute inset-2 border border-gold/15" />

            <p className="font-display text-[10px] tracking-[0.6em] uppercase text-gold-soft">
              ✦ with love &amp; gratitude ✦
            </p>
            <div className="my-6 h-px w-24 gold-divider mx-auto" />

            <h3 className="font-script text-6xl sm:text-8xl gold-text leading-[0.95]">
              See you there
            </h3>

            <p
              className="mt-8 font-arabic text-base sm:text-xl leading-loose text-gold-soft/90"
              dir="rtl"
            >
              بَارَكَ ٱللَّٰهُ لَكُمَا
            </p>

            <p className="mt-6 font-serif italic text-base sm:text-lg text-ivory/80 text-balance leading-relaxed">
              Your presence is the greatest blessing we could ask for. May Allah
              unite our hearts in love, and our families in lasting joy.
            </p>

            <div className="mx-auto my-8 h-px w-16 gold-divider" />

            <p className="font-display tracking-[0.45em] text-xs sm:text-sm text-gold-soft">
              OWAIS &nbsp;·&nbsp; &amp; &nbsp;·&nbsp; SHAFAQAT
            </p>
            <p className="mt-3 font-serif italic text-sm text-ivory/60">
              27 December 2026 · Shagun Garden, Belgaum
            </p>
          </div>
        </motion.div>

        {/* footer band */}
        <div className="relative mt-20">
          <div className="mx-auto h-px w-40 gold-divider opacity-70" />
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="font-script text-3xl gold-text">Alhamdulillah</span>
            <span className="font-display text-[10px] tracking-[0.55em] uppercase text-ivory/45">
              forever begins · 27 · 12 · 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
