"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import HeroOverview from "@/components/HeroOverview";
import FinOpsStatsCards from "@/components/FinOpsStatsCards";
import LedgerView from "@/components/LedgerView";
import ScenariosView from "@/components/ScenariosView";
import PayPalSandboxView from "@/components/PayPalSandboxView";
import InspectorDrawer from "@/components/InspectorDrawer";
import { LedgerRecord, SystemStats, ScenarioResult } from "@/types";
import { fetchLedger, fetchStats, runScenario, toggleKillSwitch, resetSystem } from "@/lib/api";
import { ShieldCheck, FileSpreadsheet, Play } from "lucide-react";

export default function Home() {
  const [records, setRecords] = useState<LedgerRecord[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    total_spent_usd: 77.5,
    quarantined_count: 1,
    active_agents: 4,
    circuit_breaker_active: false,
    velocity_1min_usd: 0,
    total_transactions: 4,
    system_status: "OPERATIONAL",
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [runningScenario, setRunningScenario] = useState<string | null>(null);
  const [lastScenarioResult, setLastScenarioResult] = useState<ScenarioResult | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<LedgerRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load telemetry data from FastAPI backend
  const refreshData = useCallback(async () => {
    try {
      const [newLedger, newStats] = await Promise.all([fetchLedger(), fetchStats()]);
      if (newLedger && newLedger.length > 0) {
        setRecords(newLedger);
      }
      if (newStats) {
        setStats(newStats);
      }
    } catch (err) {
      console.error("Telemetry sync error:", err);
    }
  }, []);

  // Initial load and periodic live polling
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Execute a scenario
  const handleRunScenario = async (scenarioId: string) => {
    setRunningScenario(scenarioId);
    try {
      const result = await runScenario(scenarioId);
      if (result) {
        setLastScenarioResult(result);
        await refreshData();
      }
    } catch (err) {
      console.error("Scenario execution error:", err);
    } finally {
      setRunningScenario(null);
    }
  };

  // Toggle Kill Switch
  const handleToggleKillSwitch = async () => {
    setIsLoading(true);
    try {
      await toggleKillSwitch();
      await refreshData();
    } catch (err) {
      console.error("Kill switch toggle error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset System
  const handleResetSystem = async () => {
    setIsLoading(true);
    try {
      await resetSystem();
      setLastScenarioResult(null);
      await refreshData();
    } catch (err) {
      console.error("System reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-slate-100 selection:bg-brand-violet selection:text-white relative overflow-hidden">
      {/* 3D Ambient Glowing Mesh Background (Reflects through frosted glass) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-brand-violet/12 rounded-full blur-[140px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-brand-fuchsia/10 rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Top Pill Navigation Bar (Matching Nivo styling, AgentShield motive) */}
        <Header
          systemStatus={stats.system_status}
          isKillSwitchActive={stats.circuit_breaker_active}
          onToggleKillSwitch={handleToggleKillSwitch}
          onResetSystem={handleResetSystem}
          isLoading={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Dashboard Canvas - Dynamically Rendered per Tab */}
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-6 space-y-6">
          {/* Tab 1: OVERVIEW - Executive Cockpit (Clean & Uncluttered) */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Hero: Total Agentic Spend Heatmap + Speedometer Arc Velocity Gauge */}
              <HeroOverview
                stats={stats}
                isKillSwitchActive={stats.circuit_breaker_active}
                onToggleKillSwitch={handleToggleKillSwitch}
              />

              {/* Middle Section: 4 FinOps KPI Cards with Smooth Wave Sparklines */}
              <FinOpsStatsCards stats={stats} />

              {/* Bottom Grid: FinOps Security Gates + Quick Module Navigation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left: 4 FinOps Security Gates (Zero-Trust Pipeline) */}
                <div className="lg:col-span-7 p-6 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between border-purple-500/15">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-purple" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Autonomous Security Pipeline
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                        Zero-Trust Air Gap
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-2xl bg-surface-canvas/60 border border-purple-500/10 flex items-center justify-between hover:bg-surface-card-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-200 flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                            1
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-white">Cryptographic Proof-of-Intent</p>
                            <p className="text-[11px] text-purple-300/50">SHA-256 deterministic intent hashing before payout</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-surface-canvas/60 border border-purple-500/10 flex items-center justify-between hover:bg-surface-card-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-200 flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                            2
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-white">Cosine Semantic Drift Engine</p>
                            <p className="text-[11px] text-purple-300/50">Adversarial prompt injection &amp; jailbreak quarantine (&lt;18ms)</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">ARMED</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-surface-canvas/60 border border-purple-500/10 flex items-center justify-between hover:bg-surface-card-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-200 flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                            3
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-white">Sliding-Window Velocity Breaker</p>
                            <p className="text-[11px] text-purple-300/50">Autonomous runaway loop trip switch ($100/min cap)</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">MONITORED</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-surface-canvas/60 border border-purple-500/10 flex items-center justify-between hover:bg-surface-card-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-200 flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                            4
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-white">PayPal Developer Platform</p>
                            <p className="text-[11px] text-purple-300/50">Payouts v1 &amp; Orders v2 micro-disbursements</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Module Switcher */}
                <div className="lg:col-span-5 p-6 rounded-3xl glass-card glass-card-interactive flex flex-col justify-between border-purple-500/15">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Module Navigation
                      </h4>
                      <span className="text-[10px] font-mono text-purple-300/50">1-Click Jump</span>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab("ledger")}
                        className="w-full p-3.5 rounded-2xl bg-surface-canvas/60 hover:bg-surface-card-hover border border-purple-500/10 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group shadow-sm hover:translate-x-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:bg-brand-violet transition-colors">
                            <FileSpreadsheet className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">
                              Audit Ledger (AG Grid)
                            </p>
                            <p className="text-[11px] text-purple-300/50">Immutable telemetry &amp; CSV export</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-purple-300/60 group-hover:translate-x-1 transition-transform">
                          &rarr;
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab("scenarios")}
                        className="w-full p-3.5 rounded-2xl bg-surface-canvas/60 hover:bg-surface-card-hover border border-purple-500/10 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group shadow-sm hover:translate-x-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:text-white group-hover:bg-brand-violet transition-colors">
                            <Play className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">
                              Evaluator Scenarios
                            </p>
                            <p className="text-[11px] text-purple-300/50">4 live attack vector simulations</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-purple-300/60 group-hover:translate-x-1 transition-transform">
                          &rarr;
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab("paypal")}
                        className="w-full p-3.5 rounded-2xl bg-surface-canvas/60 hover:bg-surface-card-hover border border-purple-500/10 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group shadow-sm hover:translate-x-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#003087]/20 border border-[#0070BA]/30 flex items-center justify-center text-cyan-300 group-hover:bg-[#0070BA]/40 transition-colors">
                            <span className="text-xs font-black italic font-mono">P</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                              PayPal Sandbox Console
                            </p>
                            <p className="text-[11px] text-purple-300/50">Live REST endpoints &amp; webhooks</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-purple-300/60 group-hover:translate-x-1 transition-transform">
                          &rarr;
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: AUDIT LEDGER - Dedicated AG Grid Enterprise View */}
          {activeTab === "ledger" && (
            <LedgerView
              records={records}
              stats={stats}
              onSelectRecord={(rec) => setSelectedRecord(rec)}
            />
          )}

          {/* Tab 3: SCENARIOS - Dedicated Evaluator Test Workbench */}
          {activeTab === "scenarios" && (
            <ScenariosView
              onRunScenario={handleRunScenario}
              runningScenario={runningScenario}
              lastResult={lastScenarioResult}
              onResetSystem={handleResetSystem}
              isLoading={isLoading}
            />
          )}

          {/* Tab 4: PAYPAL SANDBOX - Dedicated PayPal Platform View */}
          {activeTab === "paypal" && (
            <PayPalSandboxView stats={stats} />
          )}
        </main>

        {/* Forensic Audit Modal */}
        <InspectorDrawer
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />

        {/* Minimalist Footer */}
        <footer className="border-t border-surface-border/30 bg-surface-canvas/50 py-4 px-6 text-center text-[11px] text-purple-300/40 mt-auto">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
            <span>AgentShield Sovereign FinOps Gateway &copy; 2026. MIT License.</span>
            <span>Engineered for PayPal AI Hackathon 2026 (Agentic Commerce &amp; AG Grid Tracks)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
