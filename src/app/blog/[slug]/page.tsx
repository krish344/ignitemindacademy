import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | IgniteMind Academy",
    };
  }

  return {
    title: `${post.title} | NAPLAN Blog | IgniteMind Academy`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} | IgniteMind Academy`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "IgniteMind Academy"],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | IgniteMind Academy`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  // Simple markdown parsing - convert headers and paragraphs
  const parsedContent = post.content.split("\n").map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
          {trimmed.slice(2)}
        </h1>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    }

    if (trimmed.startsWith("- ")) {
      return (
        <li key={index} className="ml-4 mb-2 text-gray-700">
          {trimmed.slice(2)}
        </li>
      );
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return (
        <p key={index} className="font-semibold text-gray-900 mb-4">
          {trimmed.slice(2, -2)}
        </p>
      );
    }

    if (trimmed.startsWith("✅") || trimmed.startsWith("❌")) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="text-lg">{trimmed.startsWith("✅") ? "✅" : "❌"}</span>
          <span className="text-gray-700">{trimmed.slice(2)}</span>
        </div>
      );
    }

    if (trimmed.startsWith(">")) {
      return (
        <blockquote key={index} className="border-l-4 border-orange-500 pl-4 my-4 italic text-gray-600">
          {trimmed.slice(1).trim()}
        </blockquote>
      );
    }

    if (trimmed.match(/^\d+\./)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="font-semibold text-gray-900">{trimmed.split(".")[0]}.</span>
          <span className="text-gray-700">{trimmed.split(".").slice(1).join(".").trim()}</span>
        </div>
      );
    }

    return (
      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
        {trimmed}
      </p>
    );
  });

  const categoryColors: Record<string, string> = {
    "NAPLAN Tips & Strategies": "bg-orange-100 text-orange-700",
    "Practice Questions": "bg-blue-100 text-blue-700",
    "Parent Guides": "bg-green-100 text-green-700",
    "Student Success Stories": "bg-purple-100 text-purple-700",
    "Exam Preparation": "bg-red-100 text-red-700",
  };

  const categoryClass = categoryColors[post.category] || "bg-gray-100 text-gray-700";

  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/blog" className="text-orange-600 hover:text-orange-700">
            ← Back to Blog
          </Link>
        </nav>

        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-4">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${categoryClass}`}>
            {post.category}
          </span>
          <span className="text-gray-500">{post.date}</span>
          <span className="text-gray-500">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
            {post.author?.charAt(0) || "I"}
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.author || "IgniteMind Academy"}</p>
            <p className="text-sm text-gray-500">NAPLAN Expert</p>
          </div>
        </div>
      </header>

      {/* Featured Image Placeholder */}
      <div className="mb-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 p-12 text-center">
        <span className="text-8xl">📚</span>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        {parsedContent}
      </div>

      {/* Keywords */}
      <div className="mb-12 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Related Topics:</h3>
        <div className="flex flex-wrap gap-2">
          {post.keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Share Buttons */}
      <div className="mb-12 border-t border-b border-gray-200 py-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this article:</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Facebook
          </button>
          <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors">
            Twitter
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
            WhatsApp
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Copy Link
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mb-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost NAPLAN Scores?</h2>
          <p className="text-white/90 mb-6">
            Get personalized tutoring and comprehensive practice materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-100 transition-colors"
            >
              Book Free Diagnostic
            </Link>
            <Link
              href="/quiz"
              className="px-6 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors"
            >
              Try Practice Quizzes
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
