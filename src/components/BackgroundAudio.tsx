"use client";

export default function BackgroundAudio() {
  return (
    <audio
      autoPlay
      loop
      muted={false}
      preload="auto"
      className="hidden"
    >
      <source src="/assets/din-shagna.mp3" type="audio/mpeg" />
    </audio>
  );
}
