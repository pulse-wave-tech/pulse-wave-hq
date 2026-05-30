import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'info@pulsewavetech.io';
const LAST_UPDATED = 'May 29, 2026';

const ACCENT = '#3B82F6';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-9">
    <h2 className="font-display font-bold text-lg md:text-xl mb-3" style={{ color: ACCENT }}>
      {title}
    </h2>
    <div className="space-y-3 leading-relaxed text-[15px] text-muted-foreground">{children}</div>
  </section>
);

const Link2 = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="transition-colors hover:underline" style={{ color: ACCENT }}>
    {children}
  </a>
);

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: {LAST_UPDATED}</p>

        <Section title="Overview">
          <p>
            Pulse Wave Tech LLC ("Pulse Wave Tech," "we," "us," or "our") operates this website at{' '}
            <span className="text-foreground">pulsewavetech.io</span>. We are a federal technology
            contractor, and we respect your privacy. This policy explains what information we collect
            through this site, how we use it, and the choices you have. We collect as little as
            possible — there are no advertising or analytics trackers on this site.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>
            <span className="text-foreground font-semibold">
              Information you give us through the contact form.
            </span>{' '}
            When you use the contact form, you provide your name, email address, and the contents of
            your message. Submitting the form opens a draft in your own email application addressed to
            us — the form does not transmit your information to any server we control. Your message is
            sent through your own email provider directly to{' '}
            <Link2 href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link2>, and we receive it the
            same way we receive any other email.
          </p>
          <p>
            <span className="text-foreground font-semibold">Server logs.</span> Like most websites,
            our hosting infrastructure may automatically record standard technical information when a
            page is requested — such as IP address, browser type, and the date and time of the
            request. These logs are used only to operate and secure the site and are not used to
            identify individual visitors.
          </p>
        </Section>

        <Section title="Cookies &amp; Local Storage">
          <p>
            We do not use advertising, marketing, or third-party analytics cookies, and this site does
            not store tracking identifiers in your browser.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>
            We use the information you send us solely to respond to your inquiry and to follow up on
            any business relationship you initiate. We do not use it for automated decision-making,
            profiling, or advertising.
          </p>
        </Section>

        <Section title="How We Share Information">
          <p>
            We do not sell, rent, or trade your personal information. We may share it only with
            trusted service providers that help us operate (for example, our email and hosting
            providers), or where required to comply with law, regulation, a government contract
            obligation, or a valid legal request.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>
            Because inquiries reach us by email, we retain your message for as long as needed to
            respond and to maintain ordinary business and contract records, after which it is deleted
            in the normal course of business.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We take reasonable administrative and technical measures to protect information in our
            possession. No method of transmission or storage is completely secure, so we cannot
            guarantee absolute security. Please do not send classified or otherwise sensitive
            government information through this website's contact form.
          </p>
        </Section>

        <Section title="Your Choices &amp; Rights">
          <p>
            You can ask us to access, correct, or delete the personal information you have sent us by
            emailing <Link2 href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link2>.
          </p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            This site is intended for a business and professional audience. It is not directed to
            children under 13, and we do not knowingly collect information from them.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this policy from time to time. When we do, we will revise the "Last updated"
            date at the top of this page. Material changes will be reflected here.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            Questions about this policy or your information? Reach us at{' '}
            <Link2 href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link2>.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
