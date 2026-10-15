import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.brand.name}`,
  description: `How ${site.brand.name} collects, uses, stores, and shares information, including Google and Microsoft user data.`,
  alternates: { canonical: site.legal.privacyPath },
};

export default function PrivacyPage() {
  const { name } = site.brand;
  const { entity, entityWithDba, retentionDays } = site.legal;
  const { email, phone, phoneHref } = site.contact;
  const mail = <a href={`mailto:${email}`}>{email}</a>;

  return (
    <LegalPage title="Privacy Policy">
      <p>
        <strong>{name}</strong> is operated by {entityWithDba} (&ldquo;we,&rdquo; &ldquo;us&rdquo;). We
        build lead-response and quoting automation for roofing contractors. This policy explains what
        information we collect, how we use it, and the choices you have. Contact: {mail}.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Business information you give us</strong> when you onboard at
          connect.vertically.online: business name, logo, brand colors, phone number, business
          address, website, domain name, lead-alert email addresses, pricing and quote rules, and how
          you receive leads today.
        </li>
        <li>
          <strong>Google account information, if you connect Gmail:</strong> the email address and
          display name of the account you connect, and the authorization tokens Google issues so we
          can send email on your behalf. We do not receive your Google password.
        </li>
        <li>
          <strong>Microsoft account information, if you connect Outlook or Microsoft 365:</strong>{" "}
          the email address and display name of the account you connect, and the authorization
          tokens Microsoft issues so we can send email on your behalf. We do not receive your
          Microsoft password.
        </li>
        <li>
          <strong>Other email providers, if you connect another provider:</strong> the SMTP server
          details, username, and an app password you choose to provide.
        </li>
        <li>
          <strong>Information about your customers (leads)</strong> that you or your website forms
          send to the automation: such as name, email, phone number, address, and the roofing
          request. We process this on your behalf to prepare quotes and follow up.
        </li>
        <li>
          <strong>Technical information</strong> such as IP address, browser type, and logs, used
          for security and troubleshooting.
        </li>
      </ul>

      <h2>2. How we use Google user data</h2>
      <p>If you connect a Google account, we request only the following permissions:</p>
      <ul>
        <li>
          <code>openid</code> and <code>email</code>: to identify which Google account you connected.
        </li>
        <li>
          <code>https://www.googleapis.com/auth/gmail.send</code>: to send email{" "}
          <strong>from your address</strong>.
        </li>
      </ul>
      <p>
        We use this access <strong>only</strong> to send the emails you have set up with us (quotes
        sent to your leads, lead-alert messages, follow-ups, and review requests). We do{" "}
        <strong>not</strong> read, search, list, download, modify, or delete your emails, drafts,
        labels, or contacts, and our permissions do not allow us to.
      </p>
      <p>
        We do not use Google user data for advertising, we do not sell it, we do not use it to train
        AI or machine-learning models, and we do not allow humans to read it except where you give
        explicit permission, where needed for security (such as investigating abuse), or where
        required by law.
      </p>
      <p>
        {name}&apos;s use and transfer to any other app of information received from Google APIs
        will adhere to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>3. How we use Microsoft account data</h2>
      <p>If you connect a Microsoft (Outlook or Microsoft 365) account, we request only the following permissions:</p>
      <ul>
        <li>
          <code>openid</code>, <code>profile</code>, and <code>email</code>: to identify which
          Microsoft account you connected.
        </li>
        <li>
          <code>Mail.Send</code>: to send email <strong>from your address</strong>.
        </li>
        <li>
          <code>offline_access</code>: so you don&apos;t have to reconnect your account every time we
          send an email on your behalf.
        </li>
      </ul>
      <p>
        We use this access <strong>only</strong> to send the emails you have set up with us (quotes
        sent to your leads, lead-alert messages, follow-ups, and review requests). We do{" "}
        <strong>not</strong> read, search, list, download, modify, or delete your emails, drafts,
        folders, or contacts, and our permissions do not allow us to.
      </p>
      <p>
        We do not use Microsoft account data for advertising, we do not sell it, we do not use it to
        train AI or machine-learning models, and we do not allow humans to read it except where you
        give explicit permission, where needed for security (such as investigating abuse), or where
        required by law.
      </p>

      <h2>4. How we share information</h2>
      <p>
        We do not sell your information. We share it only with service providers that help us run
        the service, under confidentiality obligations, such as providers of hosting, workflow
        automation, document generation, and messaging. Google and Microsoft user data (including
        authorization tokens) is used only by our own systems to send the emails you&apos;ve
        authorized and is not shared with advertisers, data brokers, or other third parties. We may
        disclose information if required by law or to protect security, and as part of a business
        transfer, in which case we will tell you first.
      </p>

      <h2>5. How we store and protect information</h2>
      <p>
        Authorization tokens and passwords are encrypted before storage. Data is transmitted over
        HTTPS. Access is limited to people who need it to operate and support the service. No system
        is perfectly secure, but we work to protect your information.
      </p>

      <h2>6. Domain and website account credentials</h2>
      <p>
        If you choose to provide login details for your domain provider or website builder, we
        encrypt them, use them only to sign in and make the changes you&apos;ve asked for (such as
        adding DNS records or a quote-page button), and delete them once the setup is finished or
        within 7 days, whichever comes first. We never use them for any other purpose, and our team
        accesses them only when making those changes. You should change your password afterward.
      </p>

      <h2>7. Retention and deletion</h2>
      <p>
        We keep your information while you use the service. You can disconnect your email at any
        time in the connect portal, or revoke our access directly at{" "}
        <a href="https://myaccount.google.com/permissions">https://myaccount.google.com/permissions</a>{" "}
        (Google) or{" "}
        <a href="https://account.live.com/consent/Manage">https://account.live.com/consent/Manage</a>{" "}
        (Microsoft). When you disconnect or end service, we delete your authorization tokens. To
        request deletion of your other data, email {mail}; we will delete it within {retentionDays}{" "}
        days, except where we must keep it by law.
      </p>

      <h2>8. Your choices</h2>
      <p>
        You can review, correct, or request deletion of your information by contacting us. You can
        disconnect integrations at any time. Leads who receive our emails can opt out using the link
        in the message or by contacting the contractor who sent it.
      </p>

      <h2>9. Children</h2>
      <p>
        Our service is for businesses and is not directed to children under 13 (or 16 where
        applicable).
      </p>

      <h2>10. Changes</h2>
      <p>
        We will post changes on this page and update the date above. If we change how we use Google
        or Microsoft user data, we will notify connected users.
      </p>

      <h2>11. Contact</h2>
      <p>
        {entity}, {name}. Email: {mail}. Phone: <a href={phoneHref}>{phone}</a>.
      </p>
    </LegalPage>
  );
}
