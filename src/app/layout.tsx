import Header from "@/components/Header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: ["400", "700", "900"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Contries",
  description: "Discover the world at your fingertips. Find detailed information about any country with our app."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <div className='flex flex-col justify-start pb-20 h-full'>
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
