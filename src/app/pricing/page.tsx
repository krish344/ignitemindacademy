import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { ContactCTASection } from "@/components/ui/ContactCTASection";

export const metadata: Metadata = {
  title: "Pricing | IgniteMind Academy",
  description:
    "Transparent NAPLAN tutoring pricing for Years 3, 5, 7 & 9 in Melbourne, Victoria. Starting from $49/session. Flexible plans available.",
};

const plans = [
  {
    name: "Starter",
    price: "$XX / session",
    note: "Great for steady improvement",
    features: [
      "1 session / week",
      "Weekly homework task",
      "Progress notes for parents",
    ],
  },
  {
    name: "Focused",
    price: "$XX / session",
    note: "Best for faster progress",
    featured: true,
    features: [
      "2 sessions / week",
      "Timed practice tasks",
      "Writing feedback each week",
      "Priority scheduling",
    ],
  },
  {
    name: "Intensive (Short Term)",
    price: "$XX / session",
    note: "For the final push",
    features: [
      "Short-term sprint plan",
      "Test strategies + timing",
      "Targeted gap fixing",
    ],
  },
];

export default function PricingPage() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Pricing" title="Simple, transparent plans">
            Replace the $XX placeholders with your real prices (or tell me your rates and I’ll
            update it).
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border bg-white p-6 shadow-sm ${
                  plan.featured
                    ? "border-slate-900 ring-2 ring-slate-900/10"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{plan.name}</div>
                    <div className="mt-1 text-sm text-slate-600">{plan.note}</div>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      Popular
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 text-3xl font-semibold tracking-tight">
                  {plan.price}
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-emerald-700">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button href="/#contact" variant={plan.featured ? "primary" : "secondary"}>
                    Book a free diagnostic
                  </Button>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Discounts for siblings / term bundles can be added here.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WhatsApp CTA Section */}
      <ContactCTASection />
    </SiteLayout>
  );
}
