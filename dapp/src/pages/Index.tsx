import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { MarketList } from "@/components/MarketList";
import { HowItWorks } from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <Hero />
      <StatsBar />
      <MarketList />
      <HowItWorks />
    </div>
  );
};

export default Index;
