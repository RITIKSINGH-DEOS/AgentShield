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
      {/* 1. Left Card: Total Agentic Spend & Animated Telemetry Stream (Span 8) */}
      <div className="lg:col-span-8 p-6 rounded-3xl glass-card glass-card-interactive relative overflow-hidden flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/25 border border-purple-500/35 flex items-center justify-center text-brand-purple shadow-sm">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-purple-100 tracking-wide">
                Total Autonomous Spend (USD)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse shadow-sm shadow-purple-400" />
              <span className="text-[11px] text-purple-200/90 font-mono">PayPal Live Stream</span>
            </div>
          </div>

          {/* Big Dollar Figure */}
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-white font-mono">
              ${stats.total_spent_usd.toFixed(2)}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm">
              <ArrowUpRight className="w-3 h-3" />
              {stats.total_transactions} Verified Transactions
            </span>
          </div>

          <p className="text-xs text-purple-200/75 mb-6 leading-relaxed">
            Programmatic micro-disbursements mediated via PayPal Orders v2 &amp; Payouts v1 under cryptographic PoI verification.
          </p>

          {/* Dot Matrix Agent Activity Stream with Constant Pattern Wave Motion */}
          <div className="py-2">
            <div className="grid grid-flow-col gap-1.5 h-20 items-center justify-between">
              {Array.from({ length: matrixCols }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1.5 justify-center">
                  {Array.from({ length: matrixRows }).map((_, rowIdx) => {
                    // Constant cascading wave pattern flowing from Left to Right
                    const cycleDuration = 7.5;
                    const colProgress = (colIdx / matrixCols) * cycleDuration;
                    const waveOffset = Math.sin(colIdx * 0.45 + rowIdx * 0.75) * 0.45;
                    const delay = (colProgress + waveOffset + cycleDuration) % cycleDuration;

                    return (
                      <div
                        key={rowIdx}
                        className="w-2 h-2 rounded-[2.5px] animate-matrix-dot"
                        style={{
                          animationDelay: `-${delay.toFixed(2)}s`,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-purple-200/70 font-mono pt-3 border-t border-purple-500/20">
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
      <div className="lg:col-span-4 p-6 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between">
        <div>
          {/* Header with Auto-Kill Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/25 border border-purple-500/35 flex items-center justify-center text-brand-purple shadow-sm">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-purple-100">Velocity Limit</span>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-purple-200/80 font-mono">Auto-kill</span>
              <button
                onClick={onToggleKillSwitch}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative shadow-inner ${
                  isKillSwitchActive ? "bg-purple-600" : "bg-purple-900/70 border border-purple-500/40"
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

          {/* Speedometer Percentage and Subtitle */}
          <div className="text-center mt-2 mb-4">
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {velocityPercentage}%
            </div>
            <div className="text-[11px] text-purple-200/75 mt-0.5 font-mono">
              ${stats.velocity_1min_usd.toFixed(2)} / $100.00 min cap
            </div>
          </div>

          {/* Glowing Arc Speedometer SVG */}
          <div className="relative flex justify-center items-center py-2">
            <svg viewBox="0 0 200 120" className="w-52 h-32 overflow-visible">
              <defs>
                <linearGradient id="speedometerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="60%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
                <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Inactive Track */}
              <path
                d="M 25 100 A 75 75 0 0 1 175 100"
                fill="none"
                stroke="rgba(168, 85, 247, 0.25)"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Active Glowing Arc Track */}
              <path
                d="M 25 100 A 75 75 0 0 1 175 100"
                fill="none"
                stroke="url(#speedometerGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="235.6"
                strokeDashoffset={235.6 - (235.6 * velocityPercentage) / 100}
                filter="url(#arcGlow)"
                className="transition-all duration-700 ease-out"
              />

              {/* Center Pivot Point */}
              <circle cx="100" cy="100" r="5" fill="#e9d5ff" filter="url(#arcGlow)" />
            </svg>
          </div>

          {/* Scale Labels: 0 and 100 */}
          <div className="flex justify-between items-center text-[10px] text-purple-200/70 font-mono px-6 -mt-2">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Bottom Status Pill */}
        <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-purple-100">
            <Zap className="w-3.5 h-3.5 text-brand-purple" />
            <span className="font-mono text-[11px]">Sliding Window</span>
          </div>
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded-full border shadow-sm ${
              isKillSwitchActive
                ? "bg-danger/20 text-danger border-danger/40"
                : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
            }`}
          >
            {isKillSwitchActive ? "TRIPPED" : "NOMINAL"}
          </span>
        </div>
      </div>
    </div>
  );
}
