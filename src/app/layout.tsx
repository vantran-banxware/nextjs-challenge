import type { Metadata } from "next";

import "terminal.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js",
  description: `Let's have fun`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="terminal">{children}</body>
    </html>
  );
}
