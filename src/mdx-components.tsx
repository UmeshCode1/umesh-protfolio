import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="text-4xl font-heading font-bold mb-6 text-text-primary">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-heading font-semibold mb-4 mt-8 text-text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-heading font-medium mb-3 mt-6 text-text-primary">{children}</h3>,
    p: ({ children }) => <p className="text-text-secondary leading-relaxed mb-6 font-sans">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">{children}</ul>,
    li: ({ children }) => <li>{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4">
        {children}
      </a>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto', borderRadius: '0.75rem', margin: '2rem 0' }}
        {...(props as ImageProps)}
        alt={props.alt || "Blog image"}
      />
    ),
    ...components,
  };
}
