import pytest
from app.schemas.firewall import PayPalPayoutRequest, PayPalPayoutItem
from app.services.paypal_service import paypal_service

@pytest.mark.asyncio
async def test_oauth2_token_generation():
    token = await paypal_service.get_access_token()
    assert token is not None
    assert len(token) > 10

@pytest.mark.asyncio
async def test_payouts_batch_dispatch():
    items = [
        PayPalPayoutItem(recipient_email="node1@compute.io", amount=12.50, note="Compute Unit 1"),
        PayPalPayoutItem(recipient_email="node2@compute.io", amount=17.50, note="Compute Unit 2")
    ]
    req = PayPalPayoutRequest(
        agent_id="agent_batch_test",
        intent_hash="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        items=items,
        subject="Automated Cluster Settlement"
    )
    res = await paypal_service.create_payout_batch(req)
    assert res.batch_status == "SUCCESS"
    assert res.total_amount == 30.00
    assert res.item_count == 2
    assert res.paypal_payout_batch_id is not None
    assert "PAYOUTS" in res.paypal_payout_batch_id or "AgentShield" in res.paypal_payout_batch_id

@pytest.mark.asyncio
async def test_webhook_verification():
    headers = {
        "paypal-transmission-id": "trans_12345",
        "paypal-transmission-time": "2026-10-29T12:00:00Z",
        "paypal-auth-algo": "SHA256withRSA"
    }
    is_valid = await paypal_service.verify_webhook_signature(headers, "{}")
    assert is_valid is True
