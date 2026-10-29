"use client";

import React from "react";
import { TrendingUp, Target, ArrowUpRight, Zap } from "lucide-react";
import { SystemStats } from "@/types";

interface HeroOverviewProps {
  stats: SystemStats;
  isKillSwitchActive: boolean;
  onToggleKillSwitch: () => void;
}

export default function HeroOverview({
  stats,
  isKillSwitchActive,
  onToggleKillSwitch,
}: HeroOverviewProps) {
  const velocityPercentage = Math.min(
    Math.round((stats.velocity_1min_usd / 100) * 100) || (stats.total_spent_usd > 0 ? 38 : 0),
    100
  );

  const matrixCols = 24;
  const matrixRows = 6;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 1. Left Card: Total Agentic Spend & Telemetry Stream (Span 8) */}
      <div className="lg:col-span-8 p-6 rounded-3xl glass-card relative overflow-hidden flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-brand-purple">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-purple-200/80 tracking-wide">
                Total Autonomous Spend (USD)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
              <span className="text-[11px] text-purple-300/60 font-mono">PayPal Live Stream</span>
            </div>
          </div>

          {/* Big Dollar Figure */}
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-white font-mono">
              ${stats.total_spent_usd.toFixed(2)}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <ArrowUpRight className="w-3 h-3" />
              {stats.total_transactions} Verified Transactions
            </span>
          </div>

          <p className="text-xs text-purple-300/50 mb-6">
            Programmatic micro-disbursements mediated via PayPal Orders v2 &amp; Payouts v1 under cryptographic PoI verification.
          </p>

          {/* Dot Matrix Agent Activity Stream */}
          <div className="py-2">
            <div className="grid grid-flow-col gap-1.5 h-20 items-center justify-between">
              {Array.from({ length: matrixCols }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1.5 justify-center">
                  {Array.from({ length: matrixRows }).map((_, rowIdx) => {
                    const isFuchsia = (colIdx * 3 + rowIdx * 7) % 5 === 0;
                    const isPurple = (colIdx * 2 + rowIdx * 3) % 3 === 0;
                    const isActive = isFuchsia || isPurple;
                    const opacity = isActive
                      ? isFuchsia
                        ? "bg-fuchsia-400 shadow-sm shadow-fuchsia-500/40"
                        : "bg-purple-500/80 shadow-sm shadow-purple-500/30"
                      : "bg-purple-950/40";

                    return (
                      <div
                        key={rowIdx}
                        className={`w-2 h-2 rounded-[2.5px] transition-all duration-300 ${opacity}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-purple-300/40 font-mono pt-3 border-t border-purple-500/10">
              <span>Agent Ingestion</span>
              <span>PoI Verification</span>
              <span>Semantic Drift</span>
              <span>Circuit Breaker</span>
              <span>PayPal Payout</span>
              <span>Settled</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Right Card: Speedometer Arc Gauge (Span 4) */}
      <div className="lg:col-span-4 p-6 rounded-3xl glass-card flex flex-col justify-between">
        <div>
          {/* Header with Auto-Kill Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-brand-purple">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-purple-200/80">Velocity Limit</span>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-purple-300/60 font-mono">Auto-kill</span>
              <button
                onClick={onToggleKillSwitch}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative ${
                  isKillSwitchActive ? "bg-purple-600" : "bg-purple-950/70 border border-purple-500/30"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    isKillSwitchActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Speedometer Radial Gauge */}
          <div className="relative flex flex-col items-center justify-center my-2">
            <span className="text-3xl font-extrabold text-white font-mono mb-1">
              ${stats.velocity_1min_usd.toFixed(2)}
            </span>
            <span className="text-[11px] text-purple-300/50 uppercase tracking-widest font-mono mb-2">
              Per-Minute Velocity
            </span>

            {/* Semi-Circle Speedometer SVG */}
            <div className="relative w-48 h-24 overflow-hidden">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#261b46"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="url(#purpleGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * velocityPercentage) / 100}
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glowing Needle Indicator */}
              <div
                className="absolute bottom-0 left-1/2 w-1 h-20 bg-gradient-to-t from-transparent via-purple-300 to-white origin-bottom transform transition-all duration-700 shadow-md shadow-fuchsia-500/50 rounded-full"
                style={{
                  transform: `translateX(-50%) rotate(${
                    (velocityPercentage / 100) * 180 - 90
                  }deg)`,
                }}
              />
            </div>

            <div className="w-full flex justify-between text-[10px] text-purple-300/40 font-mono px-6 mt-1">
              <span>$0</span>
              <span>$50</span>
              <span>$100.00/min Limit</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-purple-500/10 flex justify-between items-center text-xs text-purple-300/60">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-brand-purple" />
            <span>&lt;18ms Hardware Trip</span>
          </span>
          <span className="text-brand-violet font-mono text-[11px]">
            {stats.circuit_breaker_active ? "TRIPPED" : "HEALTHY"}
          </span>
        </div>
      </div>
    </div>
  );
}
