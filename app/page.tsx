import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import FounderVideo from "@/components/sections/FounderVideo";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Team from "@/components/sections/Team";
import SuccessStories from "@/components/sections/SuccessStories";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FounderVideo />
        <Services />
        <HowItWorks />
        <Team />
        <SuccessStories />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
