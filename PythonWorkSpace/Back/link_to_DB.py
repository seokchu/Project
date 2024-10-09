import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from typing import Any
import os

app = FastAPI() #FasAPI 인스턴스 생성

class Process_of_DB: #firebase에 연결 및 데이터를 가져오는 클래스
    def __init__(self,service_account_path: str):
        self._initialize_firebase(service_account_path) #초기화함수
        self.db = firestore.client() #데베 인스턴스 생성
        
    def _initialize_firebase(self,service_account_path: str):
        if not firebase_admin._apps: #초기화 되지 않은 경우(연결 되지 않은 경우)
            cred = credentials.Certificate(service_account_path) #서비스 계정 키 파일을 통해 자격 증명 객체 생성
            firebase_admin.initialize_app(cred) #자격증명을 통해 초기화
        
    def get_document(self,collection_name: str,document_name: str) -> Any: #반환값의 type이 어떤 것이든 상관이 없다는 것
        doc_ref = self.db.collection(collection_name).document(document_name)
        doc = doc_ref.get() #문서 데이터 가져오기
        
        if doc.exists: #문서가 존재하면
            return doc.to_dict() #딕셔너리 형태로 문서 반환
        else:
            #raise -> 예외를 발생시키는 코드(의도적으로 예외 발생시키기 위함)
            raise HTTPException(status_code=404,detail='Data is not exist') #HTTP404오류 발생시키기_문서 데이터가 존재하지않는 경우
        
        
firebase_client = Process_of_DB("/Users/minji/Desktop/한밭대/[강의]24_2학년_2학기/오픈소스/RevKeyRec/osp-revkeyrec-firebase-adminsdk-rvlp5-034c3d1c56.json")

class RequestModel(BaseModel):
    collection_name:str
    document_name: str
    
@app.get("/")
def read_root(): #서버 정상 작동하는지 확인하기 위한 기본 경로
    return {"message":'Firebase FaseAPI 테스트'} 

@app.post("/get_data")
def get_data(request: RequestModel):
    try:
        data = firebase_client.get_document(request.collection_name,request.document_name)
        return {"data":data}
    except HTTPException as e:
        return {"error":e.detail}
    