import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Great_Vibes,
  Amiri,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingPetals from "@/components/FloatingPetals";
import BackgroundAudio from "@/components/BackgroundAudio";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Owais weds Shafaqat • 27 December 2026",
  description:
    "With the grace of Allah — join us as we begin our forever. Shagun Garden, Belgaum.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${vibes.variable} ${amiri.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink overflow-x-hidden">
        <BackgroundAudio />
        <SmoothScroll>
          <FloatingPetals />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
