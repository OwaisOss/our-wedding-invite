"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !mounted) return;

    const play = () => {
      audio.play().catch(() => {
        // autoplay blocked — wait for user interaction
      });
      setPlaying(true);
    };

    const pause = () => {
      audio.pause();
      setPlaying(false);
    };

    // try autoplay on mount
    play();

    // if user interacts anywhere, try playing audio
    const onInteract = () => {
      if (!playing) play();
    };

    document.addEventListener("click", onInteract);
    document.addEventListener("touchstart", onInteract);

    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
  }, [mounted, playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/din-shagna.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-maroon/85 backdrop-blur border border-gold/40 text-ivory hover:bg-maroon transition-colors"
        title={playing ? "Mute" : "Play"}
      >
        {playing ? (
          <Volume2 size={20} />
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </>
  );
}
