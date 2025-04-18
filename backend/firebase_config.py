# import firebase_admin
# from firebase_admin import credentials, firestore

# # Load Firebase credentials
# cred = credentials.Certificate("agritech2-83807-firebase-adminsdk-fbsvc-e8016253d0.json")  
# firebase_admin.initialize_app(cred)

# # Connect to Firestore database
# db = firestore.client()

# print("✅ Firebase connected successfully!")
import firebase_admin
from firebase_admin import credentials, firestore

def initialize_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate("agritech2-83807-firebase-adminsdk-fbsvc-e8016253d0.json")
        firebase_admin.initialize_app(cred)
    return firestore.client()

db = initialize_firebase()
