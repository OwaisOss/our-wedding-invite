"use client";
import { motion } from "framer-motion";
import { CalendarHeart, MapPin, Clock, Sparkles } from "lucide-react";

const events = [
  {
    icon: Sparkles,
    title: "Mehendi & Sangeet",
    time: "Evening · 6:00 PM",
    date: "25 December 2026",
    where: "Shagun Garden, Belgaum",
  },
  {
    icon: CalendarHeart,
    title: "Nikkah Ceremony",
    time: "Morning · 11:00 AM",
    date: "27 December 2026",
    where: "Shagun Garden, Belgaum",
  },
  {
    icon: Clock,
    title: "Walima Reception",
    time: "Evening · 7:00 PM",
    date: "28 December 2026",
    where: "Shagun Garden, Belgaum",
  },
];

export default function Events() {
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-display text-[10px] tracking-[0.6em] uppercase text-gold">
          ✦ the celebrations ✦
        </p>
        <div className="my-5 h-px w-24 gold-divider mx-auto" />
        <h3 className="font-script text-5xl sm:text-8xl gold-text leading-[0.95]">
          Join us in joy
        </h3>
        <p className="mt-4 font-serif italic text-base sm:text-lg text-ink/65">
          three nights · one love · countless memories
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className="group relative bg-ivory/70 backdrop-blur border border-gold/30 px-8 py-12 text-left rounded-sm overflow-hidden"
            >
              <div className="absolute inset-2 ring-1 ring-gold/15 pointer-events-none" />
              <e.icon className="text-maroon mb-4" size={28} strokeWidth={1.2} />
              <h4 className="font-display text-xl tracking-[0.2em] uppercase text-maroon-deep">
                {e.title}
              </h4>
              <div className="my-4 h-px w-12 bg-gold/60" />
              <p className="font-serif text-base text-ink/80 leading-relaxed">
                {e.date}
                <br />
                <span className="italic">{e.time}</span>
              </p>
              <p className="mt-3 flex items-start gap-2 font-serif text-sm text-ink/65">
                <MapPin size={14} className="mt-1 flex-none text-gold" />
                <span>{e.where}</span>
              </p>
            </motion.div>
          ))}
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Shagun+Garden+Belgaum"
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex items-center gap-3 px-8 py-3 border border-maroon text-maroon font-display text-xs tracking-[0.4em] uppercase hover:bg-maroon hover:text-ivory transition-colors duration-500"
        >
          <MapPin size={14} /> open in maps
        </a>
      </div>
    </section>
  );
}
