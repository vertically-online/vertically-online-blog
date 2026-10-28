import { CalendarCheck, ClipboardList, FileText, PhoneCall } from "@/components/ui/icons";
import { ExampleCard, ExampleStep, LandingPage, landingMetadata } from "@/components/content/LandingPage";

const SLUG = "roofing-answering-service";

export const metadata = landingMetadata(SLUG);

export default function RoofingAnsweringServicePage() {
  return (
    <LandingPage
      slug={SLUG}
      eyebrow="Instant lead response for roofers"
      visual={
        <ExampleCard
          label="Example"
          title="A quote request while you're on a roof"
          alt="Example of a roofing web lead handled by Vertically: quote request, instant emailed estimate, AI call about 5 minutes later, inspection booked on Google Calendar"
        >
          <ExampleStep
            icon={<ClipboardList className="h-4 w-4" aria-hidden="true" />}
            title="Quote request, 7:42 PM"
            detail="Leak over the kitchen · asphalt shingle · Cherry Hill, NJ"
          />
          <ExampleStep
            icon={<FileText className="h-4 w-4" aria-hidden="true" />}
            title="Estimate emailed instantly"
            detail="Branded PDF from your price list, plus a text"
          />
          <ExampleStep
            icon={<PhoneCall className="h-4 w-4" aria-hidden="true" />}
            title="AI call, about 5 minutes later"
            detail="Calls the homeowner in your company's name"
          />
          <ExampleStep
            icon={<CalendarCheck className="h-4 w-4" aria-hidden="true" />}
            title="Inspection booked"
            detail="Thu 10:00 AM · added to your Google Calendar"
            tone="emerald"
          />
        </ExampleCard>
      }
    />
  );
}
