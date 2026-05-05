import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { allPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Engineering Blog | Umesh Patel",
  description: "Thoughts on software architecture, AI, and design by Umesh Patel.",
};

export default function BlogList() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary">
            Engineering Blog
          </h1>
        </div>
        <p className="text-xl text-text-secondary">
          Thoughts on software architecture, AI, and design.
        </p>
      </div>

      <div className="space-y-8">
        {allPosts.map((post) => (
          <article
            key={post.slug}
            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center gap-2 text-text-secondary mb-4 text-sm font-mono">
              <Calendar className="w-4 h-4" />
              <time>{post.date}</time>
              <span className="mx-1">&bull;</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-text-secondary mb-6 font-sans">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors"
            >
              Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
