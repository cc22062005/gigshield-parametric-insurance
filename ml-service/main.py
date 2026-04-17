from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import random

app = FastAPI(title="GigShield Fraud ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
model = RandomForestClassifier(n_estimators=50, random_state=42)

def train_mock_model():
    """
    Trains a lightweight Random Forest model on dummy data
    to make the hackathon demo fully functional and honest.
    Features: [gps_distance_m, time_since_event_s, past_claims_count]
    """
    print("Training ML Fraud Model...")
    
    # 1. Generate Synthetic Valid Claims (Class 0: Genuine)
    genuine_gps = np.random.normal(50, 20, 500) # Close to zone
    genuine_time = np.random.normal(120, 60, 500) # Claimed shortly after event
    genuine_past = np.random.poisson(1, 500) # Few past claims
    
    # 2. Generate Synthetic Fraud Claims (Class 1: Fraudulent)
    fraud_gps = np.random.normal(5000, 2000, 100) # GPS mismatch is very high
    fraud_time = np.random.normal(12, 5, 100) # Claimed impossibly fast (bot script)
    fraud_past = np.random.poisson(5, 100) # High abuse rate
    
    X_genuine = np.column_stack((genuine_gps, genuine_time, genuine_past))
    y_genuine = np.zeros(500)
    
    X_fraud = np.column_stack((fraud_gps, fraud_time, fraud_past))
    y_fraud = np.ones(100)
    
    X = np.vstack((X_genuine, X_fraud))
    y = np.concatenate((y_genuine, y_fraud))
    
    model.fit(X, y)
    print("Model Training Complete! Ready to serve predictions.")

@app.on_event("startup")
async def startup_event():
    train_mock_model()

class ClaimTelemetry(BaseModel):
    claim_id: str
    gps_distance_m: float
    time_since_event_s: float
    past_claims_count: int

@app.post("/predict")
async def predict_fraud(data: ClaimTelemetry):
    try:
        # Prepare input
        features = np.array([[data.gps_distance_m, data.time_since_event_s, data.past_claims_count]])
        
        # Get probability of class 1 (Fraud)
        probability = model.predict_proba(features)[0][1]
        
        # Determine status
        if probability < 0.3:
            status = 'GREEN'
            approved = True
            reason = 'Score is < threshold. Auto-approved.'
        else:
            status = 'RED'
            approved = False
            reason = 'High probability of GPS spoofing or behavioral anomaly.'

        return {
            "claimId": data.claim_id,
            "confidence": round(probability, 3),
            "riskLevel": status,
            "approved": approved,
            "reason": reason,
            "signalsAnalyzed": [
                f"GPS Distance: {data.gps_distance_m}m",
                f"Time delta: {data.time_since_event_s}s"
            ]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ML Fraud Detection"}
