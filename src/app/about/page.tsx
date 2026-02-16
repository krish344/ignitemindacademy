import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | IgniteMind Academy",
  description:
    "Learn about IgniteMind Academy's approach to NAPLAN tutoring in Melbourne, Victoria. Expert tutors helping students excel in Years 3, 5, 7 & 9.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="About" title="Skill-building that lasts beyond NAPLAN">
            We focus on strong foundations, clear feedback, and calm test confidence.
          </SectionHeading>

          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-slate-700">
            <p>
              IgniteMind Academy supports students preparing for NAPLAN in Years 3, 5, 7 and 9.
              Our tutoring is structured, measurable and parent-friendly — so you always know
              what your child is working on and why.
            </p>
            <p>
              Our lessons combine:
              <br />• explicit teaching of core skills
              <br />• guided practice using NAPLAN-style tasks
              <br />• feedback cycles that improve writing and accuracy
              <br />• timing and strategy for test-day performance
            </p>
            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
              Want this page to include tutor bios, qualifications, WWCC details, or your story?
              Send me those details and I’ll tailor the copy.
            </p>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
