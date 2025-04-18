import firebase_admin
from firebase_admin import credentials, firestore

# Check if Firebase is already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate("agritech2-83807-firebase-adminsdk-fbsvc-e8016253d0.json")
    firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Test Data
data = {
    "name": "Test Farmer",
    "email": "test@example.com",
    "location": "Test Location"
}

# Try writing to Firestore
doc_ref = db.collection("farmers").add(data)
print("Successfully added:", doc_ref)
