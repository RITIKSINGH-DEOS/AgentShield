"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import ScenarioBar from "@/components/ScenarioBar";
import AgGridLedger from "@/components/AgGridLedger";
import InspectorDrawer from "@/components/InspectorDrawer";
import { LedgerRecord, SystemStats, ScenarioResult } from "@/types";
import { fetchLedger, fetchStats, runScenario, toggleKillSwitch, resetSystem } from "@/lib/api";

export default function Home() {
  const [records, setRecords] = useState<LedgerRecord[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    total_spent_usd: 0,
    quarantined_count: 0,
    active_agents: 0,
    circuit_breaker_active: false,
    velocity_1min_usd: 0,
    total_transactions: 0,
    system_status: "CONNECTING",
  });

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

  // Initial load and periodic 3-second live polling
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3500);
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
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-black">
      {/* 1. Header with Status & Emergency Kill Switch */}
      <Header
        systemStatus={stats.system_status}
        isKillSwitchActive={stats.circuit_breaker_active}
        onToggleKillSwitch={handleToggleKillSwitch}
        onResetSystem={handleResetSystem}
        isLoading={isLoading}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 space-y-6">
        {/* 2. Real-Time FinOps Metrics Banner */}
        <StatsBar stats={stats} />

        {/* 3. 1-Click Evaluator Scenarios */}
        <ScenarioBar
          onRunScenario={handleRunScenario}
          runningScenario={runningScenario}
          lastResult={lastScenarioResult}
        />

        {/* 4. The AG Grid Enterprise Streaming Ledger */}
        <AgGridLedger
          records={records}
          onSelectRecord={(rec) => setSelectedRecord(rec)}
        />
      </main>

      {/* Forensic Deep-Dive Drawer */}
      <InspectorDrawer
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface/40 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AgentShield Sovereign FinOps Gateway &copy; 2026. Licensed under MIT.</span>
          <span>Engineered for the PayPal AI Hackathon (Agentic Commerce &amp; AG Grid Tracks)</span>
        </div>
      </footer>
    </div>
  );
}
