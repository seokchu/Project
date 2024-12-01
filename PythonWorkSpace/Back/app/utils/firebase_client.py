from firebase_admin import credentials, db
from firebase_admin import initialize_app
from fastapi import HTTPException
import firebase_admin


class FirebaseClient:
    def __init__(self, service_account_path: str, database_url: str):
        self._initialize_firebase(service_account_path, database_url)

    def _initialize_firebase(self, service_account_path: str, database_url: str):
        if not firebase_admin._apps:
            cred = credentials.Certificate(service_account_path)
            initialize_app(cred, {"databaseURL": database_url})

    def get_data(self, path: str):
        ref = db.reference(path)
        data = ref.get()
        if data:
            return data
        raise HTTPException(status_code=404, detail="Data not found")
