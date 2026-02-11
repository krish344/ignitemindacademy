import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "NAPLAN Blog | Tips, Strategies & Resources | IgniteMind Academy",
  description: "Expert NAPLAN tips, practice strategies, and preparation resources. Help your child succeed in NAPLAN with our comprehensive blog articles.",
  keywords: "NAPLAN blog, NAPLAN tips, NAPLAN strategies, NAPLAN preparation, NAPLAN resources",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Blog Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-orange-600 mb-4 block">
              IgniteMind Academy
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              NAPLAN <span className="text-orange-500">Blog</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert tips, strategies, and resources to help your child succeed in NAPLAN
            </p>
          </div>

          {/* Category Navigation */}
          <nav className="flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Blog Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">IgniteMind Academy</h3>
              <p className="text-gray-400">
                Empowering students to excel in NAPLAN through personalized learning experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/naplan" className="text-gray-400 hover:text-white transition-colors">
                    NAPLAN Tutoring
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">
                    Practice Quizzes
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Get Started</h4>
              <p className="text-gray-400 mb-4">
                Ready to improve your NAPLAN scores? Book a free diagnostic today!
              </p>
              <Link
                href="/pricing"
                className="inline-block px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                Book Free Diagnostic
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 IgniteMind Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
