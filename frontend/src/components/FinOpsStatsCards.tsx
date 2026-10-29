"use client";

import React from "react";
import { ArrowUpRight, ShieldAlert, Cpu, CheckCircle2, ShieldCheck } from "lucide-react";
import { SystemStats } from "@/types";

interface FinOpsStatsCardsProps {
  stats: SystemStats;
}

export default function FinOpsStatsCards({ stats }: FinOpsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Verified Micro-Disbursements */}
      <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Clean Settlements</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ArrowUpRight className="w-2.5 h-2.5" />
            Verified
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold font-mono text-white">
            ${stats.total_spent_usd.toFixed(2)}
          </span>
          <span className="text-[11px] text-purple-300/40 font-mono">USD</span>
        </div>

        {/* Smooth Purple Wave Sparkline */}
        <div className="h-8 w-full overflow-hidden my-1">
          <svg viewBox="0 0 100 25" className="w-full h-full" fill="none">
            <path
              d="M0 20 Q25 5, 50 15 T100 8"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="15" r="2.5" fill="#10b981" />
          </svg>
        </div>

        <span className="text-[10px] text-purple-300/40">Disbursed via PayPal Payouts</span>
      </div>

      {/* 2. Quarantined Attacks */}
      <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Threats Neutralized</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-danger/10 text-danger border border-danger/20">
            <ShieldAlert className="w-2.5 h-2.5" />
            100% Intercept
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold font-mono text-white">
            {stats.quarantined_count}
          </span>
          <span className="text-[11px] text-purple-300/40">Attacks Blocked</span>
        </div>

        {/* Smooth Pink Anomaly Wave Sparkline */}
        <div className="h-8 w-full overflow-hidden my-1">
          <svg viewBox="0 0 100 25" className="w-full h-full" fill="none">
            <path
              d="M0 12 Q20 18, 45 8 T70 22 T100 10"
              stroke="#ec4899"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="70" cy="22" r="2.5" fill="#ec4899" className="animate-ping" />
          </svg>
        </div>

        <span className="text-[10px] text-purple-300/40">Prompt Injections &amp; Drift Quarantined</span>
      </div>

      {/* 3. Active Agent Swarm */}
      <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Active Agent Nodes</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <Cpu className="w-2.5 h-2.5" />
            Live Swarm
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold font-mono text-white">
            {stats.active_agents}
          </span>
          <span className="text-[11px] text-purple-300/40">Autonomous Bots</span>
        </div>

        {/* Smooth Violet Wave Sparkline */}
        <div className="h-8 w-full overflow-hidden my-1">
          <svg viewBox="0 0 100 25" className="w-full h-full" fill="none">
            <path
              d="M0 15 Q30 5, 60 18 T100 5"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="60" cy="18" r="2.5" fill="#a855f7" />
          </svg>
        </div>

        <span className="text-[10px] text-purple-300/40">Deterministic PoI Cryptographic Isolation</span>
      </div>

      {/* 4. PayPal Settlement Pipeline */}
      <div className="p-5 rounded-3xl glass-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">PayPal Settlement Pipeline</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <ShieldCheck className="w-2.5 h-2.5" />
            Sandbox Live
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold font-mono text-white">
            Ready
          </span>
          <span className="text-[11px] text-purple-300/40 font-mono">REST v1/v2</span>
        </div>

        {/* Smooth Cyan Wave Sparkline */}
        <div className="h-8 w-full overflow-hidden my-1">
          <svg viewBox="0 0 100 25" className="w-full h-full" fill="none">
            <path
              d="M0 10 Q25 18, 50 8 T100 16"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="8" r="2.5" fill="#06b6d4" />
          </svg>
        </div>

        <span className="text-[10px] text-purple-300/40">Atomic Payouts v1 &amp; Orders v2</span>
      </div>
    </div>
  );
}
