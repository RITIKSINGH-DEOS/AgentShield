import { LedgerRecord, SystemStats, ScenarioResult } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchLedger(): Promise<LedgerRecord[]> {
  try {
    const res = await fetch(`${BASE_URL}/ledger`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch ledger");
    return await res.json();
  } catch (err) {
    console.error("Error fetching ledger:", err);
    return [];
  }
}

export async function fetchStats(): Promise<SystemStats> {
  try {
    const res = await fetch(`${BASE_URL}/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return await res.json();
  } catch (err) {
    console.error("Error fetching stats:", err);
    return {
      total_spent_usd: 0,
      quarantined_count: 0,
      active_agents: 0,
      circuit_breaker_active: false,
      velocity_1min_usd: 0,
      total_transactions: 0,
      system_status: "CONNECTING",
    };
  }
}

export async function runScenario(scenarioId: string): Promise<ScenarioResult | null> {
  try {
    const res = await fetch(`${BASE_URL}/scenarios/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario_id: scenarioId }),
    });
    if (!res.ok) throw new Error("Failed to execute scenario");
    return await res.json();
  } catch (err) {
    console.error("Error running scenario:", err);
    return null;
  }
}

export async function toggleKillSwitch(): Promise<{ circuit_breaker_active: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/circuit-breaker/toggle`, { method: "POST" });
  return await res.json();
}

export async function resetSystem(): Promise<{ status: string; message: string }> {
  const res = await fetch(`${BASE_URL}/circuit-breaker/reset`, { method: "POST" });
  return await res.json();
}
