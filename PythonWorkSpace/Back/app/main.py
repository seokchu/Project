from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import search, products

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(search.router)
app.include_router(products.router)
