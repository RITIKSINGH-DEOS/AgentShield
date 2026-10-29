"use client";

import React from "react";
import { Shield, ShieldAlert, RefreshCw, Zap, Bell } from "lucide-react";

interface HeaderProps {
  systemStatus: string;
  isKillSwitchActive: boolean;
  onToggleKillSwitch: () => void;
  onResetSystem: () => void;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({
  systemStatus,
  isKillSwitchActive,
  onToggleKillSwitch,
  onResetSystem,
  isLoading,
  activeTab,
  setActiveTab,
}: HeaderProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "ledger", label: "Audit Ledger" },
    { id: "scenarios", label: "Scenarios" },
    { id: "paypal", label: "PayPal Sandbox" },
  ];

  return (
    <header className="px-6 py-4 border-b border-surface-border/40 bg-background/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-fuchsia flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">AgentShield</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                FinOps Firewall
              </span>
            </div>
          </div>
        </div>

        {/* Center Pill Navigation for AgentShield */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-surface-card border border-surface-border/60 backdrop-blur-lg">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-violet text-white shadow-md shadow-purple-600/30 font-semibold"
                    : "text-purple-200/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-2.5">
          {/* PayPal Sandbox Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-[11px] font-mono text-purple-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PayPal Sandbox Live</span>
          </div>

          {/* Kill Switch Toggle Button */}
          <button
            onClick={onToggleKillSwitch}
            disabled={isLoading}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isKillSwitchActive
                ? "bg-danger/20 border-danger/50 text-danger shadow-md shadow-danger/20"
                : "bg-surface-card hover:bg-surface-card-hover border-surface-border text-slate-300"
            }`}
          >
            {isKillSwitchActive ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-danger animate-bounce" />
                <span>Kill-Switch: ACTIVE</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>System Operational</span>
              </>
            )}
          </button>

          {/* Reset System Button */}
          <button
            onClick={onResetSystem}
            disabled={isLoading}
            title="Reset Telemetry Data"
            className="w-8 h-8 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border flex items-center justify-center text-purple-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
