


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current directory
json_path = os.path.join(BASE_DIR, "agritech2-83807-firebase-adminsdk-fbsvc-e8016253d0.json")

cred = credentials.Certificate(json_path)  # Use the correct path
firebase_admin.initialize_app(cred)
db = firestore.client()


# Initialize Firebase once
if not firebase_admin._apps:
    cred = credentials.Certificate("agritech2-83807-firebase-adminsdk-fbsvc-e8016253d0.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}

@app.get("/favicon.ico")
def favicon():
    return FileResponse("favicon.ico")



# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Farmer(BaseModel):
    name: str
    email: str
    landSize: float
    location: str
    budget: float

@app.post("/submit-form/")
async def submit_form(farmer: Farmer):
    try:
        # Store in Firestore
        doc_ref = db.collection("farmers").add(farmer.dict())
        
        # Return success with additional recommendations
        return {
            "message": "Data saved successfully!",
            "doc_id": doc_ref[1].id,
            "recommendations": {
                "crops": ["Wheat", "Vegetables"],
                "budget_allocation": {
                    "seeds": farmer.budget * 0.4,
                    "equipment": farmer.budget * 0.3
                }
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


#chatgpt
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Define request body model
class FarmerInput(BaseModel):
    district: str
    land_size: float
    budget: float

@app.post("/submit")
async def process_farmer_data(data: FarmerInput):
    # Simulating some processing
    recommendation = {
        "district": data.district,
        "recommended_crops": ["Wheat", "Rice", "Maize"],  # Example crops
        "estimated_profit": data.land_size * 5000  # Example calculation
    }
    return {"message": "Data received", "recommendation": recommendation}
