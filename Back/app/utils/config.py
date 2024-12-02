import os
from dotenv import load_dotenv

load_dotenv()

FIREBASE_CREDENTIALS = os.getenv(
    "FIREBASE_CREDENTIALS","/Users/minji/Desktop/Work/한밭대_학업관리/[강의]24_2학년_2학기/오픈소스/RevKeyRec/Back/app/utils/firebase.json"
)
FIREBASE_DATABASE_URL = os.getenv(
    "FIREBASE_DATABASE_URL", "https://osp-revkeyrec-default-rtdb.firebaseio.com"
)
