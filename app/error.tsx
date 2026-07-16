"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="rounded-xl border border-red-200 bg-red-50 p-8"><h1 className="text-xl font-semibold text-red-950">This review could not be loaded</h1><p className="mt-2 text-sm text-red-800">No data was changed. Try the request again or return to the workflow list.</p><Button className="mt-5" onClick={reset}>Try again</Button></div>; }
