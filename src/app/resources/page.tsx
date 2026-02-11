import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free NAPLAN tutoring tips, practice guidance, and checklists from IgniteMind Academy.",
};

const resources = [
  {
    title: "A 15-minute NAPLAN routine (Mon–Fri)",
    desc: "Short, consistent practice beats long, stressful cramming.",
    href: "#",
  },
  {
    title: "Writing: simple structure that scores", 
    desc: "Planning, paragraphs, and feedback loops that improve quickly.",
    href: "#",
  },
  {
    title: "Reading: how to improve comprehension", 
    desc: "Question types, evidence, and keeping focus under time.",
    href: "#",
  },
];

export default function ResourcesPage() {
  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Resources" title="Free tips for parents & students">
            Want these to be real blog posts? Tell me the topics and I’ll turn them into SEO-ready articles.
          </SectionHeading>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {resources.map((r) => (
              <div
                key={r.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-base font-semibold">{r.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{r.desc}</p>
                <Link className="mt-4 inline-flex text-sm font-semibold underline" href={r.href}>
                  Coming soon
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
