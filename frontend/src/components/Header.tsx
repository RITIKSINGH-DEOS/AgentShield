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

  const tabRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    const updateIndicator = () => {
      const currentBtn = tabRefs.current[activeTab];
      if (currentBtn) {
        setIndicatorStyle({
          left: currentBtn.offsetLeft,
          width: currentBtn.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);

  return (
    <header className="px-6 py-4 border-b border-purple-500/25 bg-background/85 backdrop-blur-2xl sticky top-0 z-40 shadow-lg shadow-black/20">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo with 3D Specular Glow */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab("overview")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-fuchsia flex items-center justify-center shadow-sm shadow-black/40 border border-purple-400/30 group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
                AgentShield
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/35 shadow-sm">
                FinOps Firewall
              </span>
            </div>
          </div>
        </div>

        {/* Center Pill Navigation with Smooth Gliding Indicator */}
        <nav className="relative hidden md:flex items-center p-1 rounded-full bg-surface-card/90 border border-purple-500/30 backdrop-blur-2xl shadow-inner shadow-black/30">
          {/* Smooth Sliding Active Pill */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-brand-violet border border-purple-400/35 shadow-sm shadow-black/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-250 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-purple-200/80 hover:text-white"
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
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-[11px] font-mono text-purple-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse " />
            <span>PayPal Sandbox Live</span>
          </div>

          {/* Kill Switch Toggle Button */}
          <button
            onClick={onToggleKillSwitch}
            disabled={isLoading}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all interactive-pill ${
              isKillSwitchActive
                ? "bg-danger/25 border-danger/60 text-danger shadow-sm shadow-black/30"
                : "bg-surface-card hover:bg-surface-card-hover border-purple-500/30 text-slate-200 hover:text-white"
            }`}
          >
            {isKillSwitchActive ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-danger animate-bounce" />
                <span>Kill-Switch: ACTIVE</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span>System Operational</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
