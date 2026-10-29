export interface LedgerRecord {
  id: string;
  timestamp: string;
  agent_id: string;
  category: "INFRASTRUCTURE" | "DATASET" | "API_SUBSCRIPTION" | "CONTRACTOR" | "MISC" | string;
  amount: number;
  recipient: string;
  status: "VERIFIED_PAID" | "QUARANTINED_DRIFT" | "CIRCUIT_TRIPPED" | "INJECTION_BLOCKED";
  risk_score: number;
  latency_ms: number;
  intent_hash: string;
  decision_reason: string;
  paypal_batch_id: string | null;
}

export interface SystemStats {
  total_spent_usd: number;
  quarantined_count: number;
  active_agents: number;
  circuit_breaker_active: boolean;
  velocity_1min_usd: number;
  total_transactions: number;
  system_status: "OPERATIONAL" | "CIRCUIT_TRIPPED" | string;
}

export interface ScenarioResult {
  scenario: string;
  title: string;
  outcome: string;
  summary: string;
  data: any;
}
