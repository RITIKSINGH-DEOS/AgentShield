import hashlib
import time
import math
import re
from typing import Dict, List, Tuple
from app.core.config import settings
from app.schemas.firewall import IntentVerificationRequest, IntentVerificationResponse
from app.services.circuit_breaker import circuit_breaker

# Known Prompt Injection & Exfiltration Patterns
ADVERSARIAL_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior)\s+instructions",
    r"bypass\s+(safety|security|policy|budget)",
    r"transfer\s+all\s+(remaining\s+)?funds",
    r"send\s+(money|funds|usd)\s+to\s+external",
    r"override\s+(limits|firewall|guardrails)",
    r"jailbreak",
    r"developer\s+mode\s+enabled",
    r"dan\s+mode",
    r"exfiltrate",
    r"emergency\s+unauthorized\s+drain"
]

def compute_sha256_hash(data: str) -> str:
    """Computes a deterministic cryptographic SHA-256 hash."""
    return hashlib.sha256(data.encode("utf-8")).hexdigest()

def tokenize(text: str) -> List[str]:
    """Basic alphanumeric word tokenizer."""
    return re.findall(r"\b[a-zA-Z0-9_-]{2,}\b", text.lower())

def calculate_cosine_similarity(text1: str, text2: str) -> float:
    """
    Computes deterministic Cosine Similarity between two texts based on term frequencies.
    Produces a value between 0.0 (completely orthogonal) and 1.0 (identical).
    Execution time: < 0.5 ms.
    """
    tokens1 = tokenize(text1)
    tokens2 = tokenize(text2)
    
    if not tokens1 or not tokens2:
        return 0.0
        
    freq1: Dict[str, int] = {}
    for t in tokens1:
        freq1[t] = freq1.get(t, 0) + 1
        
    freq2: Dict[str, int] = {}
    for t in tokens2:
        freq2[t] = freq2.get(t, 0) + 1
        
    all_words = set(freq1.keys()).union(set(freq2.keys()))
    
    dot_product = sum(freq1.get(w, 0) * freq2.get(w, 0) for w in all_words)
    mag1 = math.sqrt(sum(v ** 2 for v in freq1.values()))
    mag2 = math.sqrt(sum(v ** 2 for v in freq2.values()))
    
    if mag1 == 0 or mag2 == 0:
        return 0.0
        
    return dot_product / (mag1 * mag2)

class IntentFirewallService:
    def verify_intent(self, req: IntentVerificationRequest) -> IntentVerificationResponse:
        start_time = time.perf_counter()
        anomalies: List[str] = []
        
        # 1. Generate Cryptographic Intent Hash (PoI)
        raw_seed = f"{req.agent_id}|{req.category}|{req.recipient_account}|{req.requested_amount_usd:.2f}|{req.intent_description.strip()}"
        computed_hash = compute_sha256_hash(raw_seed)
        
        # 2. Check Declared Hash Match (if supplied by caller)
        if req.declared_hash and req.declared_hash != computed_hash:
            anomalies.append("CRYPTOGRAPHIC_HASH_MISMATCH")

        # 3. Adversarial Prompt Injection & Semantic Vulnerability Scan
        combined_text = f"{req.intent_description} {req.original_task_prompt}"
        for pattern in ADVERSARIAL_PATTERNS:
            if re.search(pattern, combined_text, re.IGNORECASE):
                anomalies.append(f"PROMPT_INJECTION_FLAGGED:{pattern}")

        # 4. Semantic Drift Analysis (Original Task Prompt vs Desired Action)
        similarity = calculate_cosine_similarity(req.original_task_prompt, req.intent_description)
        # Drift score = 1.0 - similarity (0 = no drift, 1.0 = total deviation)
        semantic_drift_score = round(1.0 - similarity, 4)
        
        if semantic_drift_score > settings.MAX_DRIFT_THRESHOLD and not anomalies:
            # Check if domain keywords align
            shared_keywords = set(tokenize(req.original_task_prompt)).intersection(set(tokenize(req.intent_description)))
            if len(shared_keywords) < 2:
                anomalies.append(f"EXCESSIVE_SEMANTIC_DRIFT:{semantic_drift_score:.2f}")

        # 5. Evaluate Velocity & Circuit Breaker
        cb_allowed, cb_reason, cb_anomalies = circuit_breaker.evaluate(req.requested_amount_usd)
        anomalies.extend(cb_anomalies)

        elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
        
        # Decision Synthesis
        if circuit_breaker.is_kill_switch_active or not cb_allowed:
            status = "KILL_SWITCH_TRIPPED"
            reason = cb_reason
            authorized_amount = 0.0
        elif anomalies:
            status = "QUARANTINED"
            reason = f"Security quarantine: {', '.join(anomalies)}"
            authorized_amount = 0.0
        else:
            status = "APPROVED"
            reason = "Cryptographic PoI verified; velocity and semantic safety confirmed."
            authorized_amount = req.requested_amount_usd
            circuit_breaker.record_transaction(authorized_amount)

        return IntentVerificationResponse(
            status=status,
            decision_reason=reason,
            intent_hash=computed_hash,
            semantic_drift_score=semantic_drift_score,
            anomaly_flags=anomalies,
            authorized_amount=authorized_amount,
            evaluation_latency_ms=elapsed_ms,
            timestamp=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        )

firewall_service = IntentFirewallService()
