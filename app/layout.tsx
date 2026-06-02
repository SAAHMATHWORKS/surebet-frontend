import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScanProvider } from "@/context/ScanContext";
import { Footer } from "@/components/Footer"; // <-- ajoute cet import

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "SurebetPro - Arbitrage Betting",
  description: "Détecteur de surebets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}
      >
        <ScanProvider>
          <div className="flex-1">{children}</div>
          <Footer />
        </ScanProvider>
      </body>
    </html>
  );
}
