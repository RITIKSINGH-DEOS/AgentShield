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
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-200/90 font-medium">Clean Settlements</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm">
              <ArrowUpRight className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold font-mono text-white">
              ${stats.total_spent_usd.toFixed(2)}
            </span>
            <span className="text-[11px] text-purple-200/80 font-mono">USD</span>
          </div>
        </div>

        {/* Single Clean Line with Moving Dot (Floating directly inside card) */}
        <div className="h-8 w-full my-1 overflow-visible">
          <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible" fill="none">
            <path
              d="M 0 18 Q 25 4, 50 16 T 100 8"
              stroke="#c084fc"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(192, 132, 252, 0.5))" }}
            />
            <circle r="3.2" fill="#34d399" style={{ filter: "drop-shadow(0 0 6px #10b981)" }}>
              <animateMotion
                path="M 0 18 Q 25 4, 50 16 T 100 8"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <span className="text-[10px] text-purple-200/70">Disbursed via PayPal Payouts</span>
      </div>

      {/* 2. Quarantined Attacks */}
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-200/90 font-medium">Threats Neutralized</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-danger/15 text-rose-300 border border-danger/30 shadow-sm">
              <ShieldAlert className="w-2.5 h-2.5" />
              100% Intercept
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold font-mono text-white">
              {stats.quarantined_count}
            </span>
            <span className="text-[11px] text-purple-200/80">Attacks Blocked</span>
          </div>
        </div>

        {/* Single Clean Line with Moving Dot (Floating directly inside card) */}
        <div className="h-8 w-full my-1 overflow-visible">
          <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible" fill="none">
            <path
              d="M 0 14 Q 25 22, 50 6 T 100 12"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(244, 63, 94, 0.6))" }}
            />
            <circle r="3.2" fill="#ff3366" style={{ filter: "drop-shadow(0 0 6px #ff3366)" }}>
              <animateMotion
                path="M 0 14 Q 25 22, 50 6 T 100 12"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <span className="text-[10px] text-purple-200/70">Prompt Injections &amp; Drift Quarantined</span>
      </div>

      {/* 3. Active Agent Swarm */}
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-200/90 font-medium">Active Agent Nodes</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-200 border border-purple-500/30 shadow-sm">
              <Cpu className="w-2.5 h-2.5" />
              Live Swarm
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold font-mono text-white">
              {stats.active_agents}
            </span>
            <span className="text-[11px] text-purple-200/80">Autonomous Bots</span>
          </div>
        </div>

        {/* Single Clean Line with Moving Dot (Floating directly inside card) */}
        <div className="h-8 w-full my-1 overflow-visible">
          <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible" fill="none">
            <path
              d="M 0 18 Q 30 6, 60 18 T 100 10"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))" }}
            />
            <circle r="3.2" fill="#e9d5ff" style={{ filter: "drop-shadow(0 0 6px #c084fc)" }}>
              <animateMotion
                path="M 0 18 Q 30 6, 60 18 T 100 10"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <span className="text-[10px] text-purple-200/70">Swarm Cryptographic Identity</span>
      </div>

      {/* 4. Velocity Circuit Breaker */}
      <div className="p-5 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-200/90 font-medium">Sliding Circuit Breaker</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shadow-sm ${
                stats.circuit_breaker_active
                  ? "bg-danger/20 text-rose-300 border-danger/40"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
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
            <span className="text-[11px] text-purple-200/80">/ $100 min</span>
          </div>
        </div>

        {/* Single Clean Line with Moving Dot (Floating directly inside card) */}
        <div className="h-8 w-full my-1 overflow-visible">
          <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible" fill="none">
            <path
              d="M 0 16 Q 25 22, 55 8 T 100 6"
              stroke={stats.circuit_breaker_active ? "#ff3366" : "#34d399"}
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 4px ${stats.circuit_breaker_active ? "#ff3366" : "#34d399"})`,
              }}
            />
            <circle
              r="3.2"
              fill={stats.circuit_breaker_active ? "#ff3366" : "#34d399"}
              style={{
                filter: `drop-shadow(0 0 6px ${stats.circuit_breaker_active ? "#ff3366" : "#10b981"})`,
              }}
            >
              <animateMotion
                path="M 0 16 Q 25 22, 55 8 T 100 6"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <span className="text-[10px] text-purple-200/70">Autonomous Spend Velocity Cap</span>
      </div>
    </div>
  );
}
