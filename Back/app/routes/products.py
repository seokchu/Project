from fastapi import APIRouter, HTTPException
from firebase_admin import db
from app.utils.firebase_client import FirebaseClient
from app.utils.config import FIREBASE_CREDENTIALS, FIREBASE_DATABASE_URL

router = APIRouter()

firebase_client = FirebaseClient(FIREBASE_CREDENTIALS, FIREBASE_DATABASE_URL)


# @router.get("/get_products")
# def get_products():
#     ref = db.reference("/")
#     products = ref.get()
#     if not products:
#         raise HTTPException(status_code=404, detail="No products found")
#     return {"products": products}


@router.get("/get_data")
def get_data(path: str):
    try:
        data = firebase_client.get_data(path)
        return {"data": data}
    except HTTPException as e:
        return {"error": e.detail}

