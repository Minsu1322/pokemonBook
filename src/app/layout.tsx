import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QureyProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minsu's Pokemon",
  description: "포켓몬 도감  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-4 border-black justify-center content-center text-center bg-[red] h-[60px]">
          <h1 className="text-black font-extrabold">포켓몬 도감</h1>
        </header>
        <QureyProvider>{children}</QureyProvider>
      </body>
    </html>
  );
}
