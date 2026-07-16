import Link from "next/link";
import { BarChart3, ClipboardCheck, FileCheck2, FlaskConical, GitPullRequestArrow, Settings, ShieldCheck } from "lucide-react";

const links = [
  ["Dashboard", "/dashboard", BarChart3], ["Workflows", "/workflows", GitPullRequestArrow], ["Evaluations", "/evaluations", FlaskConical],
  ["Release gates", "/gates", ShieldCheck], ["Reviews", "/reviews", ClipboardCheck], ["Decisions", "/decisions", FileCheck2], ["Settings", "/settings", Settings],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
    <aside className="border-b bg-slate-950 text-slate-100 md:min-h-screen md:border-b-0 md:border-r md:border-slate-800">
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-5"><div className="grid size-8 place-items-center rounded-lg bg-white text-sm font-black text-slate-950">AR</div><div><p className="text-sm font-semibold">Agent Rollout</p><p className="text-xs text-slate-400">Review workspace</p></div></div>
      <nav aria-label="Primary navigation" className="flex gap-1 overflow-x-auto p-3 md:block md:space-y-1">{links.map(([label, href, Icon]) => <Link key={href} href={href} className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"><Icon aria-hidden size={16}/>{label}</Link>)}</nav>
      <div className="m-4 hidden rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100 md:block"><strong className="block">Sample workspace</strong>All evidence and identities are fictional.</div>
    </aside>
    <div><div className="flex min-h-16 items-center justify-between border-b bg-white px-5 md:px-8"><p className="text-sm font-medium">Launch governance · Sample data</p><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">No model API required</span></div><main className="mx-auto max-w-7xl p-5 md:p-8">{children}</main></div>
  </div>;
}
