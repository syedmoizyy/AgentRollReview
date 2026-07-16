import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const tone = /block|fail|critical/i.test(status) ? "bg-red-50 text-red-800 ring-red-200" : /ship|pass|complete/i.test(status) ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-amber-50 text-amber-900 ring-amber-200";
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset", tone)}>{status}</span>;
}
