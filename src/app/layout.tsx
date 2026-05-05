import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AiChatWidget from "@/components/AiChatWidget";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Umesh Patel | Full-Stack Developer",
    template: "%s | Umesh Patel",
  },
  description:
    "AI-powered portfolio of Umesh Patel — Full-Stack Developer specialising in Next.js, Supabase, and intelligent web experiences.",
  keywords: ["Umesh Patel", "Full-Stack Developer", "Next.js", "React", "Supabase", "Portfolio"],
  authors: [{ name: "Umesh Patel", url: "https://github.com/UmeshCode1" }],
  creator: "Umesh Patel",
  metadataBase: new URL("https://umesh-protfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://umesh-protfolio.vercel.app",
    siteName: "Umesh Patel Portfolio",
    title: "Umesh Patel | Full-Stack Developer",
    description:
      "AI-powered portfolio of Umesh Patel — Full-Stack Developer specialising in Next.js, Supabase, and intelligent web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umesh Patel | Full-Stack Developer",
    description:
      "AI-powered portfolio of Umesh Patel — Full-Stack Developer specialising in Next.js, Supabase, and intelligent web experiences.",
    creator: "@UmeshCode1",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans relative">
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
