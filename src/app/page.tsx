import Hero from "@/components/Hero";
import Bismillah from "@/components/Bismillah";
import Invitation from "@/components/Invitation";
import Couple from "@/components/Couple";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Closing from "@/components/Closing";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Bismillah />
      <Invitation />
      <Couple />
      <Countdown />
      <Events />
      <Closing />
    </main>
  );
}
