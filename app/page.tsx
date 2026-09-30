import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Results from "@/components/sections/Results";
import HowItWorks from "@/components/sections/HowItWorks";
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
        <Hero />
        <Problem />
        <Solution />
        <Results />
        <HowItWorks />
        <Included />
        <WhoThisIsFor />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
