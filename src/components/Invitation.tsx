"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Invitation() {
  return (
    <section className="relative py-28 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl"
      >
        <div className="relative aspect-[9/16] sm:aspect-[3/4] w-full">
          <Image
            src="/assets/invitation-bg.png"
            alt="Embossed invitation card"
            fill
            sizes="(max-width: 640px) 100vw, 700px"
            className="object-contain drop-shadow-[0_30px_60px_rgba(60,15,20,0.25)]"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 sm:px-16 text-center">
            <p className="font-display text-[10px] sm:text-xs tracking-[0.55em] uppercase text-maroon">
              you are warmly invited
            </p>
            <div className="mx-auto my-6 h-px w-24 gold-divider" />

            <p className="font-serif italic text-sm sm:text-base text-ink/70 mb-6 max-w-sm">
              Together with their families
            </p>

            <h2 className="font-script text-5xl sm:text-7xl gold-text leading-none">
              Owais
            </h2>
            <p className="font-display tracking-[0.5em] text-xs sm:text-sm my-3 text-maroon">
              ✦ weds ✦
            </p>
            <h2 className="font-script text-5xl sm:text-7xl gold-text leading-none">
              Shafaqat
            </h2>

            <div className="mx-auto my-7 h-px w-24 gold-divider" />

            <p
              className="font-arabic text-lg sm:text-2xl leading-loose text-maroon-deep"
              dir="rtl"
            >
              بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="mt-4 font-serif italic text-xs sm:text-sm text-ink/65 max-w-sm text-balance">
              “May Allah bless you both, shower His blessings upon you, and unite you in goodness.”
            </p>

            <div className="mt-8 font-display text-[11px] sm:text-sm tracking-[0.35em] text-ink/80">
              27 · 12 · 2026
            </div>
            <div className="mt-1 font-serif text-xs sm:text-sm text-ink/60">
              Shagun Garden, Belgaum
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
