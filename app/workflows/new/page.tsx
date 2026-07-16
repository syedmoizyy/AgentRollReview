import { WorkflowForm } from "@/components/workflow-form";
import { PageHeader } from "@/components/page-header";
export default function NewWorkflowPage() { return <div className="space-y-7"><PageHeader title="Create workflow profile" description="Capture the user value and risk context before importing evaluation evidence."/><WorkflowForm/></div>; }
