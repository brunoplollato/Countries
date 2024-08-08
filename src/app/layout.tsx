import Header from "@/components/Header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: ["400", "700", "900"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Contries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
        <body className={inter.className}>
          <div className='flex flex-col justify-start pb-20 h-full'>
            <Header />
            {children}
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
