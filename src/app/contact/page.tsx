import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";
import { ContactCTASection } from "@/components/ui/ContactCTASection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact IgniteMind Academy to book a free diagnostic or trial class for NAPLAN tutoring in Melbourne, Victoria.",
};

function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${site.phoneE164}?text=${encodedMessage}`;
}

export default function ContactPage() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Contact" title="Let’s plan the next steps">
            Email or call — we’ll confirm availability and share a simple plan.
          </SectionHeading>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-slate-900">Email</div>
                <a className="mt-1 block underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Phone</div>
                <a className="mt-1 block underline" href={`tel:${site.phoneE164}`}>
                  {site.phoneDisplay}
                </a>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-600">
              Include your child's year level (3/5/7/9), your suburb, and whether you prefer a
              free diagnostic or a trial class.
            </p>

            {/* WhatsApp Direct Button */}
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl("Hi! I'd like to book a free diagnostic test for my child.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#20BE5A] hover:shadow-md transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* WhatsApp CTA Section */}
      <ContactCTASection />
    </SiteLayout>
  );
}
