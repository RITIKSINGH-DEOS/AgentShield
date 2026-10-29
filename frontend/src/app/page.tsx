"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import HeroOverview from "@/components/HeroOverview";
import FinOpsStatsCards from "@/components/FinOpsStatsCards";
import ScenarioBar from "@/components/ScenarioBar";
import AgGridLedger from "@/components/AgGridLedger";
import LedgerView from "@/components/LedgerView";
import ScenariosView from "@/components/ScenariosView";
import PayPalSandboxView from "@/components/PayPalSandboxView";
import InspectorDrawer from "@/components/InspectorDrawer";
import { LedgerRecord, SystemStats, ScenarioResult } from "@/types";
import { fetchLedger, fetchStats, runScenario, toggleKillSwitch, resetSystem } from "@/lib/api";

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
    <div className="min-h-screen flex flex-col bg-background text-slate-100 selection:bg-brand-violet selection:text-white">
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
        {/* Tab 1: OVERVIEW */}
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

            {/* 1-Click Interactive Scenarios */}
            <ScenarioBar
              onRunScenario={handleRunScenario}
              runningScenario={runningScenario}
              lastResult={lastScenarioResult}
            />

            {/* AG Grid Enterprise Streaming Audit Ledger */}
            <AgGridLedger
              records={records}
              onSelectRecord={(rec) => setSelectedRecord(rec)}
              heightClass="h-[380px]"
              pageSize={8}
            />
          </div>
        )}

        {/* Tab 2: AUDIT LEDGER */}
        {activeTab === "ledger" && (
          <LedgerView
            records={records}
            stats={stats}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />
        )}

        {/* Tab 3: SCENARIOS */}
        {activeTab === "scenarios" && (
          <ScenariosView
            onRunScenario={handleRunScenario}
            runningScenario={runningScenario}
            lastResult={lastScenarioResult}
            onResetSystem={handleResetSystem}
            isLoading={isLoading}
          />
        )}

        {/* Tab 4: PAYPAL SANDBOX */}
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
      <footer className="border-t border-surface-border/30 bg-surface-canvas/50 py-4 px-6 text-center text-[11px] text-purple-300/40">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
          <span>AgentShield Sovereign FinOps Gateway &copy; 2026. MIT License.</span>
          <span>Engineered for PayPal AI Hackathon 2026 (Agentic Commerce &amp; AG Grid Tracks)</span>
        </div>
      </footer>
    </div>
  );
}
