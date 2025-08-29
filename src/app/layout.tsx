import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Acervo de TCCs - ICEIA',
  description: 'Repositório de Trabalhos de Conclusão de Curso do ICEIA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-[#18191A] text-gray-100 flex flex-col min-h-screen`}
        
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
