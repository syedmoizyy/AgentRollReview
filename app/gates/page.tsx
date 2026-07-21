import { GateWorkbench } from "@/components/gate-workbench";
import { PageHeader } from "@/components/page-header";

export default function GatesPage() {
  return <div className="space-y-7">
    <PageHeader eyebrow="Support Refund Agent · Fictional sample" title="Release gates" description="Configure explicit policy, evaluate it against a selected evidence run, and preserve accountable exceptions without hiding the system recommendation."/>
    <GateWorkbench/>
  </div>;
}
