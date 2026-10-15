import Header from "@/components/sections/Header";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import Hero from "@/components/sections/Hero";
import JotFormWidget from "@/components/sections/JotFormWidget";
import CredibilityStrip from "@/components/sections/CredibilityStrip";
import LiveDemo from "@/components/sections/LiveDemo";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Results from "@/components/sections/Results";
import HowItWorks from "@/components/sections/HowItWorks";
import ConnectEmail from "@/components/sections/ConnectEmail";
import Objections from "@/components/sections/Objections";
import Included from "@/components/sections/Included";
import WhoThisIsFor from "@/components/sections/WhoThisIsFor";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CinematicHero />
        <Hero />
        <JotFormWidget />
        <CredibilityStrip />
        <LiveDemo />
        <Problem />
        <Solution />
        <Results />
        <HowItWorks />
        <ConnectEmail />
        <Objections />
        <Included />
        <WhoThisIsFor />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
