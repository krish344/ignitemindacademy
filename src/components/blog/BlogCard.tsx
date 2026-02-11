"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact" | "featured";
}

const categoryColors: Record<string, string> = {
  "NAPLAN Tips & Strategies": "bg-orange-100 text-orange-700",
  "Practice Questions": "bg-blue-100 text-blue-700",
  "Parent Guides": "bg-green-100 text-green-700",
  "Student Success Stories": "bg-purple-100 text-purple-700",
  "Exam Preparation": "bg-red-100 text-red-700",
};

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const categoryClass = categoryColors[post.category] || "bg-gray-100 text-gray-700";

  if (variant === "compact") {
    return (
      <article className="group block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${categoryClass}`}>
                {post.category}
              </span>
              <span className="text-xs text-gray-500">{post.readTime}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Featured Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
          <span className="text-6xl">📚</span>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${categoryClass}`}>
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-3">
              {post.title}
            </h2>
          </Link>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{post.readTime}</span>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Cover Image Placeholder */}
      <div className="h-44 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <span className="text-5xl">📖</span>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${categoryClass}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-500">{post.readTime}</span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-500">{post.date}</span>
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            Read More
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" | "featured" }) {
  if (variant === "featured") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-32 bg-gray-200 rounded-full" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-28 bg-gray-200 rounded-full" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-full bg-gray-200 rounded mb-2" />
        <div className="h-6 w-4/5 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
