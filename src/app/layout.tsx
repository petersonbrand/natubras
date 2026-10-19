import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.natubras.com.br"),
  title: "Natubras Pescados | Balneário Piçarras, SC",
  description:
    "Conheça a Natubras Pescados Ltda., empresa de beneficiamento e congelamento de pescados em Balneário Piçarras, Santa Catarina.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Natubras Pescados — O sabor faz a diferença",
    description:
      "Pescados e frutos do mar. Conheça a Natubras, em Balneário Piçarras, Santa Catarina.",
    url: "https://www.natubras.com.br",
    siteName: "Natubras Pescados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/natubras-social.jpg",
        width: 1200,
        height: 630,
        alt: "Prato com peixe e camarões da Natubras.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${sourceSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
