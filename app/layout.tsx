import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = { title: "Agent Rollout Review", description: "Defensible launch decisions for tool-using AI workflows" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="antialiased"><AppShell>{children}</AppShell></body></html>; }
