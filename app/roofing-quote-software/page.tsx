import { FileText, ShieldCheck, Send, UserCheck } from "@/components/ui/icons";
import { ExampleCard, ExampleStep, LandingPage, landingMetadata } from "@/components/content/LandingPage";

const SLUG = "roofing-quote-software";

export const metadata = landingMetadata(SLUG);

export default function RoofingQuoteSoftwarePage() {
  return (
    <LandingPage
      slug={SLUG}
      eyebrow="Instant roofing quotes"
      visual={
        <ExampleCard
          label="Example"
          title="Estimate built from your price list"
          alt="Example of roofing proposal software output: a PDF estimate built from your price list and sent in under a minute"
        >
          <ExampleStep
            icon={<FileText className="h-4 w-4" aria-hidden="true" />}
            title="Roof replacement · architectural shingles"
            detail="Homeowner answered a few questions on your site"
          />
          <ExampleStep
            icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
            title="Inside your limits"
            detail="Priced from your rates and the rules you set"
            tone="emerald"
          />
          <ExampleStep
            icon={<Send className="h-4 w-4" aria-hidden="true" />}
            title="PDF estimate sent in under a minute"
            detail="From your email address, under your company name"
          />
          <ExampleStep
            icon={<UserCheck className="h-4 w-4" aria-hidden="true" />}
            title="Bigger job? It comes to you first"
            detail="Anything outside your limits waits for your review"
            tone="amber"
          />
        </ExampleCard>
      }
    />
  );
}
