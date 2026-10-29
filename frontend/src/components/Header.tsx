"use client";

import React from "react";
import { Shield, ShieldAlert, RefreshCw, Zap, ExternalLink } from "lucide-react";

interface HeaderProps {
  systemStatus: string;
  isKillSwitchActive: boolean;
  onToggleKillSwitch: () => void;
  onResetSystem: () => void;
  isLoading: boolean;
}

export default function Header({
  systemStatus,
  isKillSwitchActive,
  onToggleKillSwitch,
  onResetSystem,
  isLoading,
}: HeaderProps) {
  return (
    <header className="border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-accent/40 shadow-lg shadow-cyan-500/10">
            <Shield className="w-5 h-5 text-accent" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isKillSwitchActive ? "bg-danger" : "bg-success"}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isKillSwitchActive ? "bg-danger" : "bg-success"}`} />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                AgentShield
              </h1>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30">
                v1.3 Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous FinOps & Cryptographic Spending Firewall for AI Agents
            </p>
          </div>
        </div>

        {/* Sponsor Badges & Live Status */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* PayPal Sandbox Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003087]/20 border border-[#0070BA]/40 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-[#0070BA] animate-pulse" />
            <span>PayPal Sandbox Live</span>
            <span className="text-slate-500">|</span>
            <span className="text-[11px] text-slate-300 font-sans">Orders v2 & Payouts v1</span>
          </div>

          {/* AG Grid Enterprise Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs font-mono text-slate-300">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>AG Grid Enterprise</span>
          </div>

          {/* System Health Status */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              isKillSwitchActive
                ? "bg-danger/10 border-danger/40 text-danger glow-red"
                : "bg-success/10 border-success/40 text-success glow-green"
            }`}
          >
            {isKillSwitchActive ? (
              <>
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>KILL-SWITCH ACTIVE</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>SYSTEM OPERATIONAL</span>
              </>
            )}
          </div>

          {/* Emergency Kill-Switch Button */}
          <button
            onClick={onToggleKillSwitch}
            disabled={isLoading}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 ${
              isKillSwitchActive
                ? "bg-success/20 hover:bg-success/30 text-success border border-success/50"
                : "bg-danger/20 hover:bg-danger/30 text-danger border border-danger/50"
            }`}
          >
            {isKillSwitchActive ? "Deactivate Kill-Switch" : "Engage Kill-Switch"}
          </button>

          {/* Reset System */}
          <button
            onClick={onResetSystem}
            disabled={isLoading}
            title="Reset Ledger & History"
            className="p-1.5 rounded-lg bg-surface-card hover:bg-surface-border border border-surface-border text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
