"use client";

import React from "react";
import { DollarSign, Activity, AlertTriangle, Cpu, TrendingUp } from "lucide-react";
import { SystemStats } from "@/types";

interface StatsBarProps {
  stats: SystemStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const velocityPercentage = Math.min(Math.round((stats.velocity_1min_usd / 100) * 100), 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Budget Spent */}
      <div className="p-4 rounded-xl bg-surface-card border border-surface-border shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Total Disbursed (USD)</span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-white">
            ${stats.total_spent_usd.toFixed(2)}
          </span>
          <span className="text-xs text-slate-500">via PayPal Sandbox</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{stats.total_transactions} verified transactions processed</span>
        </div>
      </div>

      {/* 2. 1-Minute Velocity Gauge */}
      <div className="p-4 rounded-xl bg-surface-card border border-surface-border shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">1-Min Velocity Cap</span>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-white">
            ${stats.velocity_1min_usd.toFixed(2)}
          </span>
          <span className="text-xs font-mono text-slate-400">/ $100.00 max</span>
        </div>
        {/* Visual Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-surface-border rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                velocityPercentage > 80
                  ? "bg-danger"
                  : velocityPercentage > 50
                  ? "bg-warning"
                  : "bg-accent"
              }`}
              style={{ width: `${velocityPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-[10px] text-slate-500">
            <span>Sliding 60s Window</span>
            <span>{velocityPercentage}% of limit</span>
          </div>
        </div>
      </div>

      {/* 3. Quarantined Threats */}
      <div className="p-4 rounded-xl bg-surface-card border border-surface-border shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Quarantined Attacks</span>
          <div className="p-2 rounded-lg bg-danger/10 text-danger border border-danger/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-white">
            {stats.quarantined_count}
          </span>
          <span className="text-xs text-slate-500">Threats Neutralized</span>
        </div>
        <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-danger animate-ping" />
          <span>Semantic Drift & Injections Quarantined</span>
        </div>
      </div>

      {/* 4. Active Autonomous Agents */}
      <div className="p-4 rounded-xl bg-surface-card border border-surface-border shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Active Agent Swarm</span>
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-white">
            {stats.active_agents}
          </span>
          <span className="text-xs text-slate-500">Authorized Nodes</span>
        </div>
        <div className="mt-3 text-[11px] text-purple-400 flex items-center gap-1.5">
          <span>Deterministic PoI cryptographic isolation</span>
        </div>
      </div>
    </div>
  );
}
