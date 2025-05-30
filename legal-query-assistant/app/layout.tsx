import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Query Assistant",
  description: "A tool for submitting legal queries and documents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
