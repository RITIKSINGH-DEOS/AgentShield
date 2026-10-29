"use client";

import React from "react";
import { ShieldCheck, FileSpreadsheet, Lock, Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { LedgerRecord, SystemStats } from "@/types";
import AgGridLedger from "@/components/AgGridLedger";

interface LedgerViewProps {
  records: LedgerRecord[];
  stats: SystemStats;
  onSelectRecord: (record: LedgerRecord) => void;
}

export default function LedgerView({ records, stats, onSelectRecord }: LedgerViewProps) {
  const verifiedCount = records.filter((r) => r.status === "VERIFIED_PAID").length;
  const quarantinedCount = records.filter(
    (r) => r.status === "QUARANTINED_DRIFT" || r.status === "INJECTION_BLOCKED"
  ).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl glass-card glass-card-interactive flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/10">
            <FileSpreadsheet className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Autonomous FinOps Audit Ledger</h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm">
                AG GRID ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-purple-300/60 mt-0.5">
              Immutable SHA-256 intent verification log for autonomous swarm disbursements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-surface-canvas/60 border border-purple-500/20 text-[11px] font-mono text-purple-200 flex items-center gap-2 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographic Hashing: SHA-256</span>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Strips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card glass-card-interactive border-purple-500/10">
          <span className="text-[10px] font-mono text-purple-300/50 uppercase">Total Transactions</span>
          <div className="text-xl font-bold text-white font-mono mt-1">
            {records.length}
          </div>
          <span className="text-[10px] text-purple-300/60 mt-0.5 block">Audited in memory</span>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-interactive border-purple-500/10">
          <span className="text-[10px] font-mono text-purple-300/50 uppercase">PayPal Settled</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{verifiedCount}</span>
          </div>
          <span className="text-[10px] text-purple-300/60 mt-0.5 block">Payouts v1 dispatched</span>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-interactive border-purple-500/10">
          <span className="text-[10px] font-mono text-purple-300/50 uppercase">Quarantined Attacks</span>
          <div className="text-xl font-bold text-rose-400 font-mono mt-1 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{quarantinedCount}</span>
          </div>
          <span className="text-[10px] text-purple-300/60 mt-0.5 block">Threats neutralized</span>
        </div>

        <div className="p-4 rounded-2xl glass-card glass-card-interactive border-purple-500/10">
          <span className="text-[10px] font-mono text-purple-300/50 uppercase">Circuit Breaker</span>
          <div className="text-xl font-bold font-mono mt-1 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                stats.circuit_breaker_active ? "bg-rose-400 animate-ping" : "bg-emerald-400"
              }`}
            />
            <span className={stats.circuit_breaker_active ? "text-rose-400" : "text-emerald-400"}>
              {stats.circuit_breaker_active ? "TRIPPED" : "ARMED"}
            </span>
          </div>
          <span className="text-[10px] text-purple-300/60 mt-0.5 block">Sliding velocity cap: $100/min</span>
        </div>
      </div>

      {/* Full Height AG Grid Enterprise Table */}
      <div className="p-5 rounded-3xl glass-card border-purple-500/20 shadow-2xl">
        <AgGridLedger
          records={records}
          onSelectRecord={onSelectRecord}
          heightClass="h-[540px]"
          pageSize={10}
        />
      </div>
    </div>
  );
}
