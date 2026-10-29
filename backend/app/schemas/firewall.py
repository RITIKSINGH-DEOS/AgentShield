from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime

class TaskContext(BaseModel):
    agent_id: str
    task_description: str
    target_deliverable: str
    max_budget_usd: float
    category: Literal["INFRASTRUCTURE", "DATASET", "API_SUBSCRIPTION", "CONTRACTOR", "MISC"] = "INFRASTRUCTURE"

class IntentVerificationRequest(BaseModel):
    agent_id: str = Field(..., description="Unique identifier of the requesting autonomous agent")
    intent_description: str = Field(..., description="Action description requested by the agent")
    original_task_prompt: str = Field(..., description="Original user prompt or task specification given to the agent")
    requested_amount_usd: float = Field(..., gt=0, description="Amount requested in USD")
    recipient_account: str = Field(..., description="Recipient PayPal email or merchant ID")
    category: Literal["INFRASTRUCTURE", "DATASET", "API_SUBSCRIPTION", "CONTRACTOR", "MISC"] = "INFRASTRUCTURE"
    declared_hash: Optional[str] = Field(None, description="Optional pre-committed SHA-256 task hash")

class IntentVerificationResponse(BaseModel):
    status: Literal["APPROVED", "QUARANTINED", "KILL_SWITCH_TRIPPED"]
    decision_reason: str
    intent_hash: str
    semantic_drift_score: float
    anomaly_flags: List[str]
    authorized_amount: float
    evaluation_latency_ms: float
    timestamp: str

class PayPalPayoutItem(BaseModel):
    recipient_email: str
    amount: float = Field(..., gt=0)
    currency: str = "USD"
    note: str
    item_id: Optional[str] = None

class PayPalPayoutRequest(BaseModel):
    agent_id: str
    intent_hash: str
    items: List[PayPalPayoutItem]
    subject: str = "Automated Autonomous Agent Disbursement via AgentShield"

class PayPalPayoutResponse(BaseModel):
    batch_id: str
    batch_status: str
    total_amount: float
    currency: str = "USD"
    item_count: int
    paypal_payout_batch_id: str
    raw_response: dict
    timestamp: str

class LedgerRecord(BaseModel):
    id: str
    timestamp: str
    agent_id: str
    category: str
    amount: float
    recipient: str
    status: Literal["VERIFIED_PAID", "QUARANTINED_DRIFT", "CIRCUIT_TRIPPED", "INJECTION_BLOCKED"]
    risk_score: int  # 0 to 100
    latency_ms: float
    intent_hash: str
    decision_reason: str
    paypal_batch_id: Optional[str] = None

class ScenarioRunRequest(BaseModel):
    scenario_id: Literal[
        "SCENARIO_01_HAPPY_PATH",
        "SCENARIO_02_INJECTION",
        "SCENARIO_03_CIRCUIT_TRIP",
        "SCENARIO_04_MULTI_AGENT_SPLIT"
    ]

class SystemStats(BaseModel):
    total_spent_usd: float
    quarantined_count: int
    active_agents: int
    circuit_breaker_active: bool
    velocity_1min_usd: float
    total_transactions: int
    system_status: str = "HEALTHY"
