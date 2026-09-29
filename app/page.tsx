import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import SuccessStories from "@/components/sections/SuccessStories";
import Pipeline from "@/components/sections/Pipeline";
import FounderVideo from "@/components/sections/FounderVideo";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SuccessStories />
        <Pipeline />
        <FounderVideo />
        <Services />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
