import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "NAPLAN Tutoring",
  description:
    "Understand NAPLAN and how IgniteMind Academy tutors for reading, writing, language conventions and numeracy in Melbourne, Victoria.",
};

export default function NaplanPage() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="NAPLAN" title="Prepare smarter: skills + strategy">
            NAPLAN measures core literacy and numeracy skills. We build the foundations and then
            practice with NAPLAN-style tasks.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">What we cover</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Reading comprehension (literal + inferential)</li>
                <li>• Writing (persuasive/narrative structure, ideas, vocabulary)</li>
                <li>• Language conventions (grammar, punctuation, spelling)</li>
                <li>• Numeracy (number, algebra, measurement, geometry, statistics)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">How we teach</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Diagnostic → targeted plan</li>
                <li>• Explicit teaching + guided practice</li>
                <li>• Timed tasks (when appropriate)</li>
                <li>• Feedback that improves the next attempt</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button href="/#contact" variant="primary">
              Book a free diagnostic
            </Button>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">
            Note: If you want strict alignment to a specific NAPLAN year and your school’s pacing,
            tell me the timeline and we’ll tailor a term plan.
          </p>
        </Container>
      </section>
    </SiteLayout>
  );
}
