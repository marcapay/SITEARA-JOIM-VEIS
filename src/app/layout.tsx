import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sitearaujoimoveis.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Araújo Imóveis | Aluguel, Compra e Lançamentos em Caratinga",
    template: "%s | Araújo Imóveis - CRECI-MG J 08993"
  },
  description: "Imobiliária Araújo Imóveis em Caratinga - MG. Encontre imóveis para alugar, comprar e lançamentos com atendimento rápido pelo WhatsApp. Credibilidade começa no nome.",
  keywords: ["imobiliária Caratinga", "imóveis Caratinga", "alugar casa Caratinga", "comprar apartamento Caratinga", "Araújo Imóveis", "CRECI Caratinga"],
  authors: [{ name: "Araújo Imóveis" }],
  creator: "Araújo Imóveis",
  publisher: "Araújo Imóveis",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Araújo Imóveis',
    title: 'Araújo Imóveis | Credibilidade começa no nome',
    description: 'Encontre o imóvel ideal para comprar ou alugar em Caratinga e região com atendimento rápido pelo WhatsApp.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Araújo Imóveis Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Araújo Imóveis',
    image: `${siteUrl}/logo.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '(33) 99999-9999',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Caratinga',
      addressRegion: 'MG',
      addressCountry: 'BR'
    },
    slogan: 'Credibilidade começa no nome'
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd data={localBusinessJsonLd} />
      </head>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50">
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
