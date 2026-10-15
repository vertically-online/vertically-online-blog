import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HowItWorks() {
  const { eyebrow, headline, steps } = site.howItWorks;

  return (
    <Section id="how-it-works" grid>
      <SectionHeading eyebrow={eyebrow} title={headline} align="center" />

      <div className="relative mt-16">
        {/* Connecting line that draws in: across on desktop, down on mobile */}
        <div
          data-reveal="line-x"
          className="absolute hidden lg:block top-7 left-[12.5%] right-[12.5%] h-[2px] rounded-full bg-gradient-to-r from-[#7DD3FC] via-[#008FD0] to-[#006fa3]"
          aria-hidden="true"
        />
        <div
          data-reveal="line-y"
          className="absolute lg:hidden left-7 top-7 bottom-7 w-[2px] rounded-full bg-gradient-to-b from-[#7DD3FC] via-[#008FD0] to-[#006fa3]"
          aria-hidden="true"
        />

        <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal="up" className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-6">
              <div className="btn-modern-dark relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold">
                <span className="bg-gradient-to-b from-white to-[#8FCBEB] bg-clip-text text-transparent">{i + 1}</span>
              </div>
              <div className="light-depth-card light-depth-card-hover flex-1 rounded-3xl p-6 lg:w-full lg:text-center">
                <h3 className="font-display font-bold text-lg tracking-tight text-void mb-2">{step.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
