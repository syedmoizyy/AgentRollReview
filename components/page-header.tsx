import { ReactNode } from "react";
export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: ReactNode }) {
  return <header className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between">
    <div>{eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>}<h1 className="text-3xl font-semibold tracking-tight">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p></div>
    {actions && <div className="flex gap-2">{actions}</div>}
  </header>;
}
