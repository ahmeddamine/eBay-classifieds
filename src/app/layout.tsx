import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BazaarLane Marketplace",
  description: "Modern classifieds marketplace"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
