import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "AgentShield")
    ENV: str = os.getenv("ENV", "development")
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")
    
    # Circuit Breaker & Safety Thresholds
    MAX_VELOCITY_USD_PER_MINUTE: float = float(os.getenv("MAX_VELOCITY_USD_PER_MINUTE", "100.00"))
    MAX_TRANSACTION_LIMIT_USD: float = float(os.getenv("MAX_TRANSACTION_LIMIT_USD", "50.00"))
    MAX_DRIFT_THRESHOLD: float = float(os.getenv("MAX_DRIFT_THRESHOLD", "0.25"))
    AUTOMATIC_KILL_SWITCH_ENABLED: bool = os.getenv("AUTOMATIC_KILL_SWITCH_ENABLED", "true").lower() == "true"
    
    # PayPal Sandbox Configuration
    PAYPAL_CLIENT_ID: str = os.getenv("PAYPAL_CLIENT_ID", "sandbox_client_id_placeholder")
    PAYPAL_CLIENT_SECRET: str = os.getenv("PAYPAL_CLIENT_SECRET", "sandbox_client_secret_placeholder")
    PAYPAL_MODE: str = os.getenv("PAYPAL_MODE", "sandbox")
    PAYPAL_BASE_URL: str = os.getenv("PAYPAL_BASE_URL", "https://api-m.sandbox.paypal.com")
    PAYPAL_WEBHOOK_ID: str = os.getenv("PAYPAL_WEBHOOK_ID", "sandbox_webhook_id_placeholder")

settings = Settings()
