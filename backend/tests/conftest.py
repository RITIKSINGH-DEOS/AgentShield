import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.circuit_breaker import circuit_breaker
from app.services.ledger import ledger_service

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture(autouse=True)
def reset_system_state():
    """Ensures each test starts with a clean slate."""
    circuit_breaker.reset_kill_switch()
    circuit_breaker.transaction_history.clear()
    ledger_service.reset_ledger()
    yield
    circuit_breaker.reset_kill_switch()
    circuit_breaker.transaction_history.clear()
    ledger_service.reset_ledger()
