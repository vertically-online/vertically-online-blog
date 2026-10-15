import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${site.brand.name}`,
  description: `The terms that govern use of ${site.brand.name}'s websites and services.`,
  alternates: { canonical: site.legal.termsPath },
};

export default function TermsPage() {
  const { name } = site.brand;
  const { entityWithDba, governingState, privacyPath } = site.legal;
  const { email } = site.contact;

  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms govern your use of {name}&apos;s websites and services, operated by{" "}
        {entityWithDba} (&ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the service you agree to them.
      </p>

      <h2>1. The service</h2>
      <p>
        We provide automation for roofing contractors, including quote generation, lead response,
        follow-up emails, and review requests, set up for your business through our onboarding
        portal.
      </p>

      <h2>2. Free trial</h2>
      <p>
        New clients may receive a 30-day free trial with no obligation. You may stop at any time. Any
        paid terms after the trial will be agreed with you in writing before you are charged.
      </p>

      <h2>3. Your account and information</h2>
      <p>
        You confirm you are authorized to act for your business and that the information you provide
        (including pricing) is accurate. You are responsible for keeping your quotes and prices
        current.
      </p>

      <h2>4. Connecting your email</h2>
      <p>
        When you connect an email account, you authorize us to send emails from that account on your
        behalf, only for the messages you have set up with us. You can revoke this at any time in the
        connect portal or in your email provider&apos;s settings. Our use of Google and Microsoft
        user data is described in our <Link href={privacyPath}>Privacy Policy</Link>.
      </p>

      <h2>5. Your responsibilities</h2>
      <p>
        You are responsible for your communications with your customers, including having the right
        to contact them and complying with laws on commercial email and messaging (such as CAN-SPAM
        and, where applicable, TCPA). Don&apos;t use the service for unlawful, deceptive, or abusive
        purposes. If you choose to give us access to a domain provider or website builder account,
        you confirm you are authorized to provide that access, and doing so is at your own discretion.
      </p>

      <h2>6. Third-party services</h2>
      <p>
        The service relies on third-party providers (such as your email provider). We aren&apos;t
        responsible for their outages or policies.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        You keep ownership of your content, logo, and data. You give us permission to use them only
        to provide the service to you. We keep ownership of our software and workflows.
      </p>

      <h2>8. Disclaimer</h2>
      <p>
        The service is provided &ldquo;as is.&rdquo; We don&apos;t guarantee uninterrupted operation,
        or particular results such as number of leads or jobs. Automated quotes are estimates based on
        the pricing you provide.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect or consequential
        damages or lost profits, and our total liability for any claim is limited to the amount you
        paid us in the 12 months before the claim (or $100 if you paid nothing).
      </p>

      <h2>10. Termination</h2>
      <p>
        You may stop using the service at any time. We may suspend or end service if these terms are
        violated or the service can no longer be offered. On termination we delete your
        authorization tokens as described in the <Link href={privacyPath}>Privacy Policy</Link>.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms and will post the new date here. Continued use means you accept
        the update.
      </p>

      <h2>12. Governing law</h2>
      <p>These terms are governed by the laws of {governingState}.</p>

      <h2>13. Contact</h2>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </LegalPage>
  );
}
