import { CalendarCheck, ClipboardList, MessageSquareText, PhoneIncoming } from "@/components/ui/icons";
import { ExampleCard, ExampleStep, LandingPage, landingMetadata } from "@/components/content/LandingPage";

const SLUG = "roofing-answering-service";

export const metadata = landingMetadata(SLUG);

export default function RoofingAnsweringServicePage() {
  return (
    <LandingPage
      slug={SLUG}
      eyebrow="Phone answering for roofers"
      visual={
        <ExampleCard
          label="Example"
          title="A call while you're on a roof"
          alt="Example of the AI roofing answering service handling a call: answered, job details captured, inspection booked on Google Calendar"
        >
          <ExampleStep
            icon={<PhoneIncoming className="h-4 w-4" aria-hidden="true" />}
            title="Incoming call, 7:42 PM"
            detail="Answered right away, in your company's name"
          />
          <ExampleStep
            icon={<ClipboardList className="h-4 w-4" aria-hidden="true" />}
            title="Job details captured"
            detail="Leak over the kitchen · asphalt shingle · Cherry Hill, NJ"
          />
          <ExampleStep
            icon={<CalendarCheck className="h-4 w-4" aria-hidden="true" />}
            title="Inspection booked"
            detail="Thu 10:00 AM · added to your Google Calendar"
            tone="emerald"
          />
          <ExampleStep
            icon={<MessageSquareText className="h-4 w-4" aria-hidden="true" />}
            title="Confirmation texted to the homeowner"
            detail="And the full lead breakdown lands in your inbox"
          />
        </ExampleCard>
      }
    />
  );
}
