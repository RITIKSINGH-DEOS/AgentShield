import pytest
from app.services.ledger import ledger_service
from app.schemas.firewall import LedgerRecord

def test_ag_grid_event_stream():
    records = ledger_service.get_all_records()
    assert len(records) >= 4
    sample = records[0]
    
    # Assert all AG Grid Enterprise column bindings exist
    assert hasattr(sample, "id")
    assert hasattr(sample, "timestamp")
    assert hasattr(sample, "agent_id")
    assert hasattr(sample, "category")
    assert hasattr(sample, "amount")
    assert hasattr(sample, "recipient")
    assert hasattr(sample, "status")
    assert hasattr(sample, "risk_score")
    assert hasattr(sample, "latency_ms")
    assert hasattr(sample, "intent_hash")

def test_stats_calculation():
    stats = ledger_service.get_stats()
    assert stats.total_spent_usd > 0
    assert stats.quarantined_count >= 1
    assert stats.active_agents >= 1
    assert stats.total_transactions == len(ledger_service.get_all_records())
    assert stats.system_status in ("OPERATIONAL", "CIRCUIT_TRIPPED")
