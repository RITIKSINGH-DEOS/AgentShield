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
      {/* 1. Verified Micro-Disbursements (Sinusoidal Fluid Flow) */}
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

        {/* 3D Flowing Motion Wave (Left-to-Right) */}
        <div className="h-10 w-full overflow-hidden relative my-2 rounded-xl bg-purple-950/25 border border-purple-500/20 shadow-inner">
          {/* Edge Blur Masks for Seamless In/Out */}
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#20143f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#20143f] to-transparent z-10 pointer-events-none" />

          {/* Animated 200% Width Track Moving Left to Right */}
          <div className="w-[200%] h-full flex animate-wave-flow-1">
            <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradFlow1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="strokeGrad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>

              {/* 3D Ghost Wave (Parallax Depth) */}
              <path
                d="M 0 24 Q 25 10, 50 24 T 100 24 Q 125 10, 150 24 T 200 24"
                fill="none"
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Luminous Area Fill */}
              <path
                d="M 0 20 Q 25 6, 50 20 T 100 20 Q 125 6, 150 20 T 200 20 L 200 40 L 0 40 Z"
                fill="url(#gradFlow1)"
              />

              {/* Primary 3D Specular Wave Line */}
              <path
                d="M 0 20 Q 25 6, 50 20 T 100 20 Q 125 6, 150 20 T 200 20"
                fill="none"
                stroke="url(#strokeGrad1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 5px rgba(192, 132, 252, 0.7))" }}
              />

              {/* Luminous Travelling Photon Nodes */}
              <circle cx="25" cy="6" r="3" fill="#34d399" style={{ filter: "drop-shadow(0 0 8px #10b981)" }} />
              <circle cx="125" cy="6" r="3" fill="#34d399" style={{ filter: "drop-shadow(0 0 8px #10b981)" }} />
            </svg>
          </div>
        </div>

        <span className="text-[10px] text-purple-200/70">Disbursed via PayPal Payouts</span>
      </div>

      {/* 2. Quarantined Attacks (Adversarial Anomaly Radar Pulse) */}
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

        {/* 3D Flowing Anomaly Spike Wave (Left-to-Right) */}
        <div className="h-10 w-full overflow-hidden relative my-2 rounded-xl bg-rose-950/20 border border-rose-500/25 shadow-inner">
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#20143f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#20143f] to-transparent z-10 pointer-events-none" />

          <div className="w-[200%] h-full flex animate-wave-flow-2">
            <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradFlow2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Ghost Horizon Baseline */}
              <line x1="0" y1="24" x2="200" y2="24" stroke="rgba(244, 63, 94, 0.25)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Anomaly Threat Fill */}
              <path
                d="M 0 24 Q 15 24, 25 24 L 35 4 L 45 32 L 55 14 L 65 24 Q 85 24, 100 24 Q 115 24, 125 24 L 135 4 L 145 32 L 155 14 L 165 24 Q 185 24, 200 24 L 200 40 L 0 40 Z"
                fill="url(#gradFlow2)"
              />

              {/* Primary High-Energy Anomaly Line */}
              <path
                d="M 0 24 Q 15 24, 25 24 L 35 4 L 45 32 L 55 14 L 65 24 Q 85 24, 100 24 Q 115 24, 125 24 L 135 4 L 145 32 L 155 14 L 165 24 Q 185 24, 200 24"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: "drop-shadow(0 0 6px #f43f5e)" }}
              />

              {/* Intercept Alert Radar Ping Beacons */}
              <circle cx="35" cy="4" r="3.5" fill="#f43f5e" style={{ filter: "drop-shadow(0 0 10px #f43f5e)" }} />
              <circle cx="35" cy="4" r="6" stroke="#fb7185" strokeWidth="1" fill="none" className="animate-ping" />
              <circle cx="135" cy="4" r="3.5" fill="#f43f5e" style={{ filter: "drop-shadow(0 0 10px #f43f5e)" }} />
              <circle cx="135" cy="4" r="6" stroke="#fb7185" strokeWidth="1" fill="none" className="animate-ping" />
            </svg>
          </div>
        </div>

        <span className="text-[10px] text-purple-200/70">Prompt Injections &amp; Drift Quarantined</span>
      </div>

      {/* 3. Active Agent Swarm (Harmonic Swarm Resonance) */}
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

        {/* 3D Flowing Harmonic Swarm Wave (Left-to-Right) */}
        <div className="h-10 w-full overflow-hidden relative my-2 rounded-xl bg-purple-950/25 border border-purple-500/20 shadow-inner">
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#20143f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#20143f] to-transparent z-10 pointer-events-none" />

          <div className="w-[200%] h-full flex animate-wave-flow-3">
            <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradFlow3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Ghost Resonant Sub-harmonic */}
              <path
                d="M 0 16 Q 25 28, 50 16 T 100 16 Q 125 28, 150 16 T 200 16"
                fill="none"
                stroke="rgba(216, 180, 254, 0.25)"
                strokeWidth="1.5"
              />

              {/* Area Fill */}
              <path
                d="M 0 22 C 20 8, 35 30, 50 16 C 65 6, 80 26, 100 22 C 120 8, 135 30, 150 16 C 165 6, 180 26, 200 22 L 200 40 L 0 40 Z"
                fill="url(#gradFlow3)"
              />

              {/* Primary Harmonic Line */}
              <path
                d="M 0 22 C 20 8, 35 30, 50 16 C 65 6, 80 26, 100 22 C 120 8, 135 30, 150 16 C 165 6, 180 26, 200 22"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.8))" }}
              />

              {/* Coordinated Swarm Agent Beads */}
              <circle cx="20" cy="8" r="2.8" fill="#e879f9" style={{ filter: "drop-shadow(0 0 6px #e879f9)" }} />
              <circle cx="65" cy="6" r="2.8" fill="#c084fc" style={{ filter: "drop-shadow(0 0 6px #c084fc)" }} />
              <circle cx="120" cy="8" r="2.8" fill="#e879f9" style={{ filter: "drop-shadow(0 0 6px #e879f9)" }} />
              <circle cx="165" cy="6" r="2.8" fill="#c084fc" style={{ filter: "drop-shadow(0 0 6px #c084fc)" }} />
            </svg>
          </div>
        </div>

        <span className="text-[10px] text-purple-200/70">Swarm Cryptographic Identity</span>
      </div>

      {/* 4. Velocity Circuit Breaker (Velocity Buffer Wave) */}
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

        {/* 3D Flowing Velocity Buffer Wave (Left-to-Right) */}
        <div className="h-10 w-full overflow-hidden relative my-2 rounded-xl bg-purple-950/25 border border-purple-500/20 shadow-inner">
          <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#20143f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#20143f] to-transparent z-10 pointer-events-none" />

          {/* Velocity Ceiling Limit Line ($100 cap indicator) */}
          <div className="absolute top-2 inset-x-0 border-t border-dashed border-purple-400/30 z-10 pointer-events-none" />

          <div className="w-[200%] h-full flex animate-wave-flow-4">
            <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradFlow4" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={stats.circuit_breaker_active ? "#ff3366" : "#10b981"}
                    stopOpacity="0.38"
                  />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <path
                d="M 0 24 C 25 30, 45 10, 65 18 C 85 24, 95 12, 100 24 C 125 30, 145 10, 165 18 C 185 24, 195 12, 200 24 L 200 40 L 0 40 Z"
                fill="url(#gradFlow4)"
              />

              {/* Primary Velocity Wave */}
              <path
                d="M 0 24 C 25 30, 45 10, 65 18 C 85 24, 95 12, 100 24 C 125 30, 145 10, 165 18 C 185 24, 195 12, 200 24"
                fill="none"
                stroke={stats.circuit_breaker_active ? "#ff3366" : "#34d399"}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 6px ${stats.circuit_breaker_active ? "#ff3366" : "#10b981"})`,
                }}
              />

              {/* Velocity Packet Pulse Beads */}
              <circle
                cx="65"
                cy="18"
                r="3"
                fill={stats.circuit_breaker_active ? "#ff3366" : "#34d399"}
                style={{
                  filter: `drop-shadow(0 0 8px ${stats.circuit_breaker_active ? "#ff3366" : "#10b981"})`,
                }}
              />
              <circle
                cx="165"
                cy="18"
                r="3"
                fill={stats.circuit_breaker_active ? "#ff3366" : "#34d399"}
                style={{
                  filter: `drop-shadow(0 0 8px ${stats.circuit_breaker_active ? "#ff3366" : "#10b981"})`,
                }}
              />
            </svg>
          </div>
        </div>

        <span className="text-[10px] text-purple-200/70">Autonomous Spend Velocity Cap</span>
      </div>
    </div>
  );
}
