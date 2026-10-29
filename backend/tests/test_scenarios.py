import pytest

def test_scenario_01_happy_path(client):
    resp = client.post("/api/scenarios/run", json={"scenario_id": "SCENARIO_01_HAPPY_PATH"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["outcome"] == "PASSED_AND_SETTLED"
    assert data["data"]["status"] == "APPROVED"

def test_scenario_02_injection_defense(client):
    resp = client.post("/api/scenarios/run", json={"scenario_id": "SCENARIO_02_INJECTION"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["outcome"] == "QUARANTINED_AND_DEFENDED"
    assert data["data"]["status"] == "QUARANTINED"

def test_scenario_03_circuit_trip(client):
    resp = client.post("/api/scenarios/run", json={"scenario_id": "SCENARIO_03_CIRCUIT_TRIP"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["outcome"] == "KILL_SWITCH_TRIPPED"
    assert data["data"]["status"] == "CIRCUIT_TRIPPED"

def test_scenario_04_multi_agent_split(client):
    resp = client.post("/api/scenarios/run", json={"scenario_id": "SCENARIO_04_MULTI_AGENT_SPLIT"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["outcome"] == "BATCH_DISBURSED_ATOMICALLY"
    assert data["data"]["batch_status"] == "SUCCESS"
    assert data["data"]["total_amount"] == 100.00
