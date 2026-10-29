import pytest
from app.services.circuit_breaker import circuit_breaker

def test_normal_velocity_allowed():
    allowed, reason, anomalies = circuit_breaker.evaluate(15.0)
    assert allowed is True
    assert "satisfied" in reason.lower()
    assert len(anomalies) == 0

def test_single_transaction_limit_exceeded():
    allowed, reason, anomalies = circuit_breaker.evaluate(75.0)
    assert allowed is False
    assert "MAX_TRANSACTION_LIMIT_EXCEEDED" in anomalies
    assert "cap exceeded" in reason.lower()

def test_velocity_limit_exceeded():
    # Record 4 transactions of $24.0 = $96.0
    for _ in range(4):
        circuit_breaker.record_transaction(24.0)
    
    assert circuit_breaker.get_current_velocity() == 96.0
    
    # Next transaction of $10 would push it to $106.0 > $100.0 limit
    allowed, reason, anomalies = circuit_breaker.evaluate(10.0)
    assert allowed is False
    assert "VELOCITY_OVERRUN_TRIGGERED" in anomalies
    assert circuit_breaker.is_kill_switch_active is True

def test_kill_switch_manual_override():
    circuit_breaker.trip_kill_switch("Manual test trip")
    assert circuit_breaker.is_kill_switch_active is True
    
    allowed, reason, anomalies = circuit_breaker.evaluate(5.0)
    assert allowed is False
    assert "KILL_SWITCH_ENGAGED" in anomalies
    
    circuit_breaker.reset_kill_switch()
    assert circuit_breaker.is_kill_switch_active is False
