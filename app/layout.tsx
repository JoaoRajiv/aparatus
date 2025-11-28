import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./_providers/query-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "./_providers/theme-provider";
import Header from "./_components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aparatus - Assistente de Agendamentos",
  description:
    "Agende cortes de cabelo e barba facilmente com o Aparatus, seu assistente pessoal de agendamentos para barbearias.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Aparatus - Assistente de Agendamentos",
    description:
      "Agende cortes de cabelo e barba facilmente com o Aparatus, seu assistente pessoal de agendamentos para barbearias.",
    url: "https://aparatus-flame.vercel.app/",
    siteName: "Aparatus",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
