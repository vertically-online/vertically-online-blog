import "./home.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Stage from "@/components/home/Stage";
import CaseStudy from "@/components/home/CaseStudy";
import WhatYouGet from "@/components/home/WhatYouGet";
import ReviewsBand from "@/components/home/ReviewsBand";
import LiveDemo from "@/components/home/LiveDemo";
import Stories from "@/components/home/Stories";
import CommonQuestions from "@/components/home/CommonQuestions";
import Guides from "@/components/home/Guides";
import Closing from "@/components/home/Closing";
import Reveal from "@/components/home/Reveal";
import { HomeFaqStructuredData } from "@/components/StructuredData";

// Homepage, rebuilt from design/vertically-home.template.html.
export default function Home() {
  return (
    <>
      <HomeFaqStructuredData />
      <Header />
      <main className="flex-1">
        <Stage />
        <CaseStudy />
        <WhatYouGet />
        <ReviewsBand />
        <LiveDemo />
        <Stories />
        <CommonQuestions />
        <Guides />
        <Closing />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
