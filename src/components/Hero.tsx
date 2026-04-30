"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Cap = { text: string; at: number; until: number };

function Caption({
  progress,
  c,
  variant,
}: {
  progress: MotionValue<number>;
  c: Cap;
  variant: "serif" | "script" | "display";
}) {
  const opacity = useTransform(
    progress,
    [c.at - 0.06, c.at, c.until - 0.06, c.until],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [c.at - 0.06, c.at, c.until], [40, 0, -40]);
  const blur = useTransform(
    progress,
    [c.at - 0.06, c.at, c.until - 0.06, c.until],
    ["8px", "0px", "0px", "8px"]
  );
  const filter = useTransform(blur, (b) => `blur(${b})`);

  const base =
    "text-balance text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]";
  const cls =
    variant === "script"
      ? `font-script text-7xl sm:text-9xl leading-[0.95] ${base}`
      : variant === "display"
      ? `font-display uppercase text-sm sm:text-2xl tracking-[0.4em] ${base}`
      : `font-display uppercase text-base sm:text-2xl tracking-[0.32em] leading-snug ${base}`;

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <p className={cls}>{c.text}</p>
    </motion.div>
  );
}

const captions: Cap[] = [
  { text: "In the name of Allah, the Most Gracious, the Most Merciful", at: 0.05, until: 0.28 },
  { text: "Two hearts, one sacred bond", at: 0.32, until: 0.55 },
  { text: "Owais  ·  weds  ·  Shafaqat", at: 0.58, until: 0.82 },
  { text: "27 December 2026  ·  Shagun Garden, Belgaum", at: 0.84, until: 1.0 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // smoothed progress for caption animations + parallax overlays
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.5,
    restDelta: 0.0003,
  });
  const vignette = useTransform(smooth, [0, 0.55, 1], [0.5, 0.35, 0.78]);
  const tint = useTransform(smooth, [0, 1], [0.25, 0.55]);

  /* ------------------------------------------------------------------ */
  /* The hero video is re-encoded with every frame as a keyframe        */
  /* (-g 1).  That makes `video.currentTime = X` an O(1) frame fetch    */
  /* with no inter-frame decoding, so scroll-scrubbing feels exactly    */
  /* like Apple's product pages — buttery smooth at any scroll speed.   */
  /* GSAP ScrollTrigger tweens currentTime against scroll progress.     */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;

    let trigger: ScrollTrigger | null = null;
    let killed = false;

    const onReady = () => {
      if (killed || !v.duration || isNaN(v.duration)) return;
      setReady(true);

      // prime decoder so first seek isn't a black flash
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => v.pause()).catch(() => {});
      } else {
        v.pause();
      }

      // tween a proxy so GSAP smooths the value before assigning to the
      // video — gives fluid motion even when the user scrolls in jumps
      const proxy = { time: 0 };

      trigger = ScrollTrigger.create({
        trigger: s,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          proxy.time = self.progress * (v.duration - 0.05);
          // assign immediately — every frame is a keyframe, so it's free
          try {
            v.currentTime = proxy.time;
          } catch {}
        },
      });
    };

    v.addEventListener("loadedmetadata", onReady, { once: true });
    v.addEventListener("canplaythrough", onReady, { once: true });
    v.load();

    return () => {
      killed = true;
      trigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#140309]">
        {!ready && (
          <div
            aria-hidden
            className="absolute inset-0 animate-pulse"
            style={{
              background:
                "radial-gradient(ellipse at center, #2a0d14 0%, #140309 70%)",
            }}
          />
        )}

        <video
          ref={videoRef}
          src="/assets/cozy-scrub.mp4"
          muted
          playsInline
          autoPlay={false}
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* warm color tint over video */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(58,12,21,0.55) 0%, rgba(20,3,9,0.15) 35%, rgba(20,3,9,0.25) 70%, rgba(20,3,9,0.85) 100%)",
            opacity: tint,
          }}
        />

        {/* radial vignette */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,3,9,0) 30%, rgba(20,3,9,0.85) 100%)",
            opacity: vignette,
          }}
        />

        {/* delicate gold inner frame */}
        <div className="pointer-events-none absolute inset-6 sm:inset-10 border border-gold/25" />
        <div className="pointer-events-none absolute inset-7 sm:inset-11 border border-gold/10" />

        {/* corner ornaments */}
        <CornerOrnament className="absolute top-4 left-4 sm:top-8 sm:left-8 w-16 sm:w-24 text-white/55" />
        <CornerOrnament className="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 sm:w-24 text-white/55 -scale-x-100" />
        <CornerOrnament className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-16 sm:w-24 text-white/55 -scale-y-100" />
        <CornerOrnament className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-16 sm:w-24 text-white/55 -scale-x-100 -scale-y-100" />

        {/* caption stack */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[11px] sm:text-sm uppercase text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
          >
            ✦ a sacred union ✦
          </motion.span>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,52rem)] h-[40vh] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,4,8,0.55) 0%, rgba(10,4,8,0.25) 45%, rgba(10,4,8,0) 75%)",
              filter: "blur(6px)",
            }}
          />

          <div className="relative mt-8 h-56 sm:h-72 w-full max-w-3xl">
            <Caption progress={smooth} c={captions[0]} variant="serif" />
            <Caption progress={smooth} c={captions[1]} variant="serif" />
            <Caption progress={smooth} c={captions[2]} variant="script" />
            <Caption progress={smooth} c={captions[3]} variant="display" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-10 flex flex-col items-center gap-3 text-white/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
          >
            <span className="font-display text-[10px] tracking-[0.6em] uppercase">scroll</span>
            <motion.span
              initial={{ scaleY: 0.4 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="block h-12 w-px origin-top bg-gradient-to-b from-white/85 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <path d="M2 2 L2 36 M2 2 L36 2" />
      <path d="M6 6 C20 6, 30 14, 30 28 M6 6 C6 20, 14 30, 28 30" />
      <circle cx="6" cy="6" r="1.2" fill="currentColor" />
      <path d="M14 14 Q22 10, 26 18 Q30 22, 22 26 Q14 22, 14 14 Z" opacity="0.5" />
    </svg>
  );
}
