"use client";

import { useMemo, useState } from "react";
import { evaluateGates, gateMetrics, recommendFromGates, recordOverride, type GateOperator, type GateRule, type OverrideRecord } from "@/lib/gates";
import { sampleEvaluationSnapshots, sampleGateRules } from "@/lib/gate-data";
import { StatusBadge } from "./status-badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const operators: GateOperator[] = ["GT", "GTE", "LT", "LTE", "EQ", "NEQ"];
const labels: Record<string, string> = { GT: ">", GTE: "≥", LT: "<", LTE: "≤", EQ: "=", NEQ: "≠", PASSED: "Passed", FAILED: "Failed", INSUFFICIENT_EVIDENCE: "Insufficient Evidence" };
const field = "h-9 rounded-md border bg-white px-2 text-sm";

export function GateWorkbench() {
  const [runId, setRunId] = useState(sampleEvaluationSnapshots[0].id);
  const [rules, setRules] = useState(sampleGateRules);
  const [override, setOverride] = useState({ finalOutcome: "INVESTIGATE" as "SHIP" | "INVESTIGATE" | "BLOCK", rationale: "", approver: "", reviewDate: "" });
  const [overrideRecord, setOverrideRecord] = useState<OverrideRecord>();
  const [overrideError, setOverrideError] = useState("");
  const snapshot = sampleEvaluationSnapshots.find((item) => item.id === runId)!;
  const results = useMemo(() => evaluateGates(rules, snapshot), [rules, snapshot]);
  const recommendation = useMemo(() => recommendFromGates(results), [results]);
  const update = (id: string, patch: Partial<GateRule>) => setRules((current) => current.map((rule) => rule.id === id ? { ...rule, ...patch } : rule));
  const saveOverride = () => { try { setOverrideRecord(recordOverride(override, recommendation, snapshot.evidenceVersion)); setOverrideError(""); } catch (error) { setOverrideError(error instanceof Error ? error.message : "Override could not be recorded"); } };

  return <div className="space-y-6">
    <Card><CardContent className="grid gap-4 pt-5 md:grid-cols-[1fr_auto] md:items-end"><label className="grid gap-2 text-sm font-semibold">Selected evaluation run<select className={field} value={runId} onChange={(event) => { setRunId(event.target.value); setOverrideRecord(undefined); }}>{sampleEvaluationSnapshots.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><p className="text-xs text-slate-500">Evidence {snapshot.evidenceVersion} · Fictional sample data</p></CardContent></Card>
    <section aria-labelledby="configured-gates"><div className="mb-3 flex items-center justify-between"><div><h2 id="configured-gates" className="text-lg font-semibold">Configured policy</h2><p className="text-sm text-slate-600">Edits recalculate results against the selected evidence snapshot.</p></div><Button variant="outline" onClick={() => setRules((current) => [...current, { ...sampleGateRules[2], id: `gate-${current.length + 1}`, name: "New release gate", owner: "Unassigned" }])}>Add gate</Button></div>
      <div className="space-y-4">{results.map((result) => <Card key={result.id}><CardContent className="space-y-4 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-3"><input aria-label={`Name for ${result.name}`} className={`${field} min-w-64 flex-1 font-semibold`} value={result.name} onChange={(e) => update(result.id, { name: e.target.value })}/><StatusBadge status={labels[result.status]}/></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <label className="grid gap-1 text-xs font-semibold text-slate-600">Metric<select className={field} value={result.metric} onChange={(e) => update(result.id, { metric: e.target.value as GateRule["metric"] })}>{gateMetrics.map((metric) => <option key={metric}>{metric}</option>)}</select></label>
          <label className="grid gap-1 text-xs font-semibold text-slate-600">Operator<select className={field} value={result.operator} onChange={(e) => update(result.id, { operator: e.target.value as GateOperator })}>{operators.map((operator) => <option key={operator} value={operator}>{labels[operator]}</option>)}</select></label>
          <label className="grid gap-1 text-xs font-semibold text-slate-600">Threshold<input className={field} type="number" step="any" value={result.threshold} onChange={(e) => update(result.id, { threshold: Number(e.target.value) })}/></label>
          <label className="grid gap-1 text-xs font-semibold text-slate-600">Scope<select className={field} value={result.scope} onChange={(e) => update(result.id, { scope: e.target.value as GateRule["scope"] })}><option>ALL_RUNS</option><option>SAFETY_CASES</option><option>TOOL_FAILURES</option><option>CRITICAL_FAILURES</option></select></label>
          <label className="grid gap-1 text-xs font-semibold text-slate-600">Severity<select className={field} value={result.severity} onChange={(e) => update(result.id, { severity: e.target.value as GateRule["severity"] })}><option>CRITICAL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></label>
          <label className="grid gap-1 text-xs font-semibold text-slate-600">Behavior<select className={field} value={result.behavior} onChange={(e) => update(result.id, { behavior: e.target.value as GateRule["behavior"] })}><option value="HARD_BLOCK">Hard blocker</option><option value="ADVISORY">Advisory</option></select></label>
        </div>
        <div className="grid gap-3 md:grid-cols-2"><label className="grid gap-1 text-xs font-semibold text-slate-600">Rationale<input className={field} value={result.rationale} onChange={(e) => update(result.id, { rationale: e.target.value })}/></label><label className="grid gap-1 text-xs font-semibold text-slate-600">Owner<input className={field} value={result.owner} onChange={(e) => update(result.id, { owner: e.target.value })}/></label></div>
        <div className="flex flex-wrap justify-between gap-3 text-xs text-slate-600"><span>Observed: {result.observation ? `${result.observation.value} ${result.observation.unit}${result.observation.denominator !== undefined ? ` · denominator ${result.observation.denominator}` : ""}` : "No matching evidence"}</span><label className="flex items-center gap-2"><input type="checkbox" checked={result.required} onChange={(e) => update(result.id, { required: e.target.checked })}/>Required evidence</label></div>
      </CardContent></Card>)}</div>
    </section>
    <Card><CardHeader><CardTitle>Recommended outcome</CardTitle></CardHeader><CardContent className="space-y-3"><StatusBadge status={recommendation.outcome}/><p className="text-sm">Failed hard blockers yield Block. Missing required evidence or advisory failures yield Investigate. Otherwise, all required gates passing yields Ship.</p><ul className="space-y-1">{recommendation.reasonCodes.map((code) => <li className="font-mono text-xs" key={code}>{code}</li>)}</ul></CardContent></Card>
    <Card><CardHeader><CardTitle>Human override</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-slate-600">The system recommendation remains visible. A different outcome requires accountable, time-bounded review details.</p><div className="grid gap-3 md:grid-cols-3"><label className="grid gap-1 text-xs font-semibold">Final outcome<select className={field} value={override.finalOutcome} onChange={(e) => setOverride({ ...override, finalOutcome: e.target.value as typeof override.finalOutcome })}><option value="SHIP">Ship</option><option value="INVESTIGATE">Investigate</option><option value="BLOCK">Block</option></select></label><label className="grid gap-1 text-xs font-semibold">Approver<input className={field} value={override.approver} onChange={(e) => setOverride({ ...override, approver: e.target.value })}/></label><label className="grid gap-1 text-xs font-semibold">Expiration / review date<input className={field} type="date" value={override.reviewDate} onChange={(e) => setOverride({ ...override, reviewDate: e.target.value })}/></label></div><label className="grid gap-1 text-xs font-semibold">Required rationale<textarea className="min-h-20 rounded-md border p-2 text-sm" value={override.rationale} onChange={(e) => setOverride({ ...override, rationale: e.target.value })}/></label>{overrideError && <p role="alert" className="text-sm font-semibold text-red-700">{overrideError}</p>}<Button onClick={saveOverride}>Record override and audit event</Button>{overrideRecord && <div className="rounded-md bg-slate-100 p-3 text-sm"><strong>Override recorded</strong><p>System: {overrideRecord.systemRecommendation} · Final: {overrideRecord.finalOutcome} · Review: {overrideRecord.reviewDate}</p><p>Audit: {overrideRecord.auditEvent.action} by {overrideRecord.auditEvent.actor}</p></div>}</CardContent></Card>
  </div>;
}
