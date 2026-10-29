"use client";

import React from "react";
import { ArrowUpRight, ShieldAlert, Cpu, CheckCircle2, Zap } from "lucide-react";
import { SystemStats } from "@/types";

interface FinOpsStatsCardsProps {
  stats: SystemStats;
}

export default function FinOpsStatsCards({ stats }: FinOpsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Verified Micro-Disbursements */}
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Clean Settlements</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
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
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Threats Neutralized</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-danger/10 text-danger border border-danger/20 shadow-sm">
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
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Active Agent Nodes</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-sm">
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
              d="M0 18 Q30 8, 55 16 T100 12"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="55" cy="16" r="2.5" fill="#8b5cf6" />
          </svg>
        </div>

        <span className="text-[10px] text-purple-300/40">Swarm Cryptographic Identity</span>
      </div>

      {/* 4. Velocity Circuit Breaker */}
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-purple-300/60 font-medium">Sliding Circuit Breaker</span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shadow-sm ${
              stats.circuit_breaker_active
                ? "bg-danger/10 text-danger border-danger/30"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                stats.circuit_breaker_active ? "bg-danger animate-ping" : "bg-emerald-400"
              }`}
            />
            {stats.circuit_breaker_active ? "Tripped" : "Armed"}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold font-mono text-white">
            ${stats.velocity_1min_usd.toFixed(2)}
          </span>
          <span className="text-[11px] text-purple-300/40">/ $100 min</span>
        </div>

        {/* Velocity Breaker Wave Sparkline */}
        <div className="h-8 w-full overflow-hidden my-1">
          <svg viewBox="0 0 100 25" className="w-full h-full" fill="none">
            <path
              d="M0 15 Q25 22, 50 10 T75 14 T100 6"
              stroke={stats.circuit_breaker_active ? "#ff3366" : "#10b981"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="10"
              r="2.5"
              fill={stats.circuit_breaker_active ? "#ff3366" : "#10b981"}
            />
          </svg>
        </div>

        <span className="text-[10px] text-purple-300/40">Autonomous Spend Velocity Cap</span>
      </div>
    </div>
  );
}
