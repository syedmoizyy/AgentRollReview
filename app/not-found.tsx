import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() { return <div className="py-20 text-center"><p className="text-sm font-semibold text-slate-500">404</p><h1 className="mt-2 text-2xl font-semibold">Review record not found</h1><p className="mt-2 text-slate-600">It may have been archived or the link is incorrect.</p><Button asChild className="mt-6"><Link href="/workflows">View workflows</Link></Button></div>; }
