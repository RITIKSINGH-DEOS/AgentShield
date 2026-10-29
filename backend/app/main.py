from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router

app = FastAPI(
    title=f"{settings.PROJECT_NAME} API Engine",
    description="Deterministic FinOps & Cryptographic Spending Firewall for Autonomous AI Agents powered by the PayPal Developer Platform.",
    version="1.1.0"
)

# Enable CORS for Next.js frontend and local evaluators
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "project": settings.PROJECT_NAME,
        "version": "1.1.0",
        "status": "ONLINE",
        "paypal_mode": settings.PAYPAL_MODE,
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
