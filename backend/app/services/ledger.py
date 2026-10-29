import uuid
import time
from typing import List, Dict, Any, Optional
from app.schemas.firewall import LedgerRecord, SystemStats
from app.services.circuit_breaker import circuit_breaker

class LedgerService:
    def __init__(self):
        self.records: List[LedgerRecord] = []
        self._seed_initial_demo_records()

    def _seed_initial_demo_records(self):
        """Pre-populates realistic records so evaluators experience an active, populated AG Grid console."""
        demo_events = [
            {
                "agent_id": "agent_infra_cloud_01",
                "category": "INFRASTRUCTURE",
                "amount": 14.50,
                "recipient": "aws-compute-sandbox@enterprise.com",
                "status": "VERIFIED_PAID",
                "risk_score": 5,
                "latency_ms": 11.2,
                "intent_hash": "f2d8a41c9b83e10034a78129e924bc10982347ab",
                "decision_reason": "Cryptographic PoI verified; velocity and semantic safety confirmed.",
                "paypal_batch_id": "PAYOUTS-SANDBOX-782194"
            },
            {
                "agent_id": "agent_data_crawler_04",
                "category": "DATASET",
                "amount": 28.00,
                "recipient": "kaggle-dataset-vendor@merchant.org",
                "status": "VERIFIED_PAID",
                "risk_score": 12,
                "latency_ms": 14.8,
                "intent_hash": "a190ef82190bb431289cf00921a8b1998240ef1a",
                "decision_reason": "Cryptographic PoI verified; velocity and semantic safety confirmed.",
                "paypal_batch_id": "PAYOUTS-SANDBOX-891024"
            },
            {
                "agent_id": "agent_untrusted_bot_13",
                "category": "MISC",
                "amount": 450.00,
                "recipient": "hacked-offshore-drop@malicious.net",
                "status": "INJECTION_BLOCKED",
                "risk_score": 96,
                "latency_ms": 9.4,
                "intent_hash": "7710bc892a00119e248b901a8820c410982347ff",
                "decision_reason": "Security quarantine: PROMPT_INJECTION_FLAGGED:transfer\\s+all\\s+(remaining\\s+)?funds",
                "paypal_batch_id": None
            },
            {
                "agent_id": "agent_contract_dev_07",
                "category": "CONTRACTOR",
                "amount": 35.00,
                "recipient": "freelance-ui-auditor@consulting.io",
                "status": "VERIFIED_PAID",
                "risk_score": 8,
                "latency_ms": 12.1,
                "intent_hash": "6290aa00192bc87123984019a820c71098234882",
                "decision_reason": "Cryptographic PoI verified; velocity and semantic safety confirmed.",
                "paypal_batch_id": "PAYOUTS-SANDBOX-440192"
            }
        ]
        
        now = time.time()
        for idx, item in enumerate(demo_events):
            record = LedgerRecord(
                id=f"REC_{uuid.uuid4().hex[:8].upper()}",
                timestamp=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(now - (300 - idx * 60))),
                **item
            )
            self.records.append(record)

    def add_record(self, record: LedgerRecord) -> LedgerRecord:
        """Prepends a new record to ensure latest transactions appear at the top of AG Grid."""
        self.records.insert(0, record)
        return record

    def get_all_records(self) -> List[LedgerRecord]:
        return self.records

    def get_stats(self) -> SystemStats:
        total_spent = sum(r.amount for r in self.records if r.status == "VERIFIED_PAID")
        quarantined = sum(1 for r in self.records if r.status in ("QUARANTINED_DRIFT", "CIRCUIT_TRIPPED", "INJECTION_BLOCKED"))
        unique_agents = len(set(r.agent_id for r in self.records))
        velocity = circuit_breaker.get_current_velocity()
        
        return SystemStats(
            total_spent_usd=round(total_spent, 2),
            quarantined_count=quarantined,
            active_agents=max(unique_agents, 1),
            circuit_breaker_active=circuit_breaker.is_kill_switch_active,
            velocity_1min_usd=velocity,
            total_transactions=len(self.records),
            system_status="CIRCUIT_TRIPPED" if circuit_breaker.is_kill_switch_active else "OPERATIONAL"
        )

    def reset_ledger(self):
        """Clears live records and re-seeds baseline demo data."""
        self.records.clear()
        self._seed_initial_demo_records()

ledger_service = LedgerService()
