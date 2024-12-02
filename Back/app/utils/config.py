import os
from dotenv import load_dotenv

load_dotenv()

FIREBASE_CREDENTIALS = os.getenv(
    "FIREBASE_CREDENTIALS" #개인 로컬 firebase.json 경로 추가
)
FIREBASE_DATABASE_URL = os.getenv(
    "FIREBASE_DATABASE_URL", "https://osp-revkeyrec-default-rtdb.firebaseio.com"
)
