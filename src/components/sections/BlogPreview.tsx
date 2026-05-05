"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { allPosts } from "@/data/blog";

export default function BlogPreview() {
  const previewPosts = allPosts.slice(0, 2);

  return (
    <section id="blog" className="relative w-full py-32 px-6 md:px-12">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="section-label block mb-4">Writings</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Latest <span className="gradient-text">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="space-y-5">
          {previewPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className="glass-card rounded-2xl p-6 md:p-8 group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary-light transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="flex gap-3 text-xs text-text-secondary whitespace-nowrap shrink-0">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-white transition-colors group/link"
              >
                Read Article
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex md:hidden justify-center">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
