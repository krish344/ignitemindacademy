import type { Metadata } from "next";
import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book a Free Diagnostic or Trial Class",
  description: "Book your free NAPLAN diagnostic assessment or trial class with IgniteMind Academy. Personalized tutoring for Years 3, 5, 7, 9.",
};

export default function BookPage() {
  return <BookPageClient />;
}
