import time
from typing import List, Tuple
from app.core.config import settings

class CircuitBreakerService:
    def __init__(self):
        # Sliding window history of (timestamp, amount_usd)
        self.transaction_history: List[Tuple[float, float]] = []
        self.is_kill_switch_active: bool = False
        self.kill_switch_reason: str = ""
        self.trip_count: int = 0

    def _clean_window(self, window_seconds: float = 60.0):
        """Purge records older than the sliding window."""
        now = time.time()
        self.transaction_history = [
            (ts, amt) for ts, amt in self.transaction_history if (now - ts) <= window_seconds
        ]

    def get_current_velocity(self) -> float:
        """Returns total USD processed in the active 60-second sliding window."""
        self._clean_window(60.0)
        return round(sum(amt for _, amt in self.transaction_history), 2)

    def evaluate(self, amount_usd: float) -> Tuple[bool, str, List[str]]:
        """
        Evaluates whether a transaction should be permitted or if the circuit breaker trips.
        Returns: (is_allowed, reason, anomaly_flags)
        """
        anomalies = []

        # 1. Check if Kill Switch is already active
        if self.is_kill_switch_active:
            anomalies.append("KILL_SWITCH_ENGAGED")
            return False, f"Transaction blocked: System Kill-Switch active ({self.kill_switch_reason})", anomalies

        # 2. Check Single-Transaction Limit
        if amount_usd > settings.MAX_TRANSACTION_LIMIT_USD:
            anomalies.append("MAX_TRANSACTION_LIMIT_EXCEEDED")
            return False, f"Single-transaction cap exceeded: ${amount_usd:.2f} > ${settings.MAX_TRANSACTION_LIMIT_USD:.2f}", anomalies

        # 3. Check Sliding Window Velocity
        current_velocity = self.get_current_velocity()
        projected_velocity = current_velocity + amount_usd
        
        if projected_velocity > settings.MAX_VELOCITY_USD_PER_MINUTE:
            anomalies.append("VELOCITY_OVERRUN_TRIGGERED")
            # Automatically trip kill switch if enabled
            if settings.AUTOMATIC_KILL_SWITCH_ENABLED:
                self.trip_kill_switch(f"Velocity Overrun: ${projected_velocity:.2f}/min exceeds limit of ${settings.MAX_VELOCITY_USD_PER_MINUTE:.2f}/min")
            return False, f"Sliding velocity limit exceeded: projected ${projected_velocity:.2f}/min", anomalies

        # 4. Check for High-Frequency Burst (e.g. > 10 requests within 5 seconds)
        now = time.time()
        burst_count = sum(1 for ts, _ in self.transaction_history if (now - ts) <= 5.0)
        if burst_count >= 10:
            anomalies.append("RAPID_BURST_ATTACK_DETECTED")
            self.trip_kill_switch("Rapid loop/burst attack detected (10+ calls in 5 seconds)")
            return False, "Rapid recursive burst detected, circuit breaker tripped", anomalies

        return True, "Velocity policy satisfied", anomalies

    def record_transaction(self, amount_usd: float):
        """Records an approved transaction in the sliding window."""
        self.transaction_history.append((time.time(), amount_usd))
        self._clean_window(60.0)

    def trip_kill_switch(self, reason: str):
        """Manually or programmatically trip the emergency kill-switch."""
        self.is_kill_switch_active = True
        self.kill_switch_reason = reason
        self.trip_count += 1

    def reset_kill_switch(self):
        """Administrative reset of the kill-switch."""
        self.is_kill_switch_active = False
        self.kill_switch_reason = ""
        self._clean_window(60.0)

circuit_breaker = CircuitBreakerService()
