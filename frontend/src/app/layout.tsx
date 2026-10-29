import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentShield | Autonomous FinOps & Spending Firewall",
  description: "The Sovereign Financial Operating System for Multi-Agent Swarms powered by the PayPal Developer Platform and AG Grid Enterprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
