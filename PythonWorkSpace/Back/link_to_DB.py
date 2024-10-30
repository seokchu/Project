import firebase_admin
from firebase_admin import credentials, db
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from typing import Any
import os

import firebase_admin



app = FastAPI() #FasAPI 인스턴스 생성

class Process_of_DB: #firebase에 연결 및 데이터를 가져오는 클래스
    def __init__(self,service_account_path: str,database_url: str):
        self._initialize_firebase(service_account_path,database_url) #초기화함수
        
    def _initialize_firebase(self,service_account_path: str,database_url: str):
        if not firebase_admin._apps: #초기화 되지 않은 경우(연결 되지 않은 경우)
            cred = credentials.Certificate(service_account_path) #서비스 계정 키 파일을 통해 자격 증명 객체 생성
            firebase_admin.initialize_app(cred, {'databaseURL': database_url}) #자격증명을 통해 초기화
        
    def get_data(self,path: str) -> Any: #반환값의 type이 어떤 것이든 상관이 없다는 것
        doc_ref = db.reference(path)
        doc = doc_ref.get() #문서 데이터 가져오기
        
        if doc: #문서가 존재하면
            return doc
        else:
            #raise -> 예외를 발생시키는 코드(의도적으로 예외 발생시키기 위함)
            raise HTTPException(status_code=404,detail='Data is not exist') #HTTP404오류 발생시키기_문서 데이터가 존재하지않는 경우
        
        
firebase_client = Process_of_DB(
    "환경변수로 firbase 인증 json 등록하세요",
    "https://osp-revkeyrec-default-rtdb.firebaseio.com"
    )

class RequestModel(BaseModel):
    collection_name:str
    document_name: str
    
@app.get("/")
def read_root(): #서버 정상 작동하는지 확인하기 위한 기본 경로
    return {"message":'Firebase FaseAPI 테스트'} 

@app.get("/get_data")
def get_data(path: str):
    try:
        data = firebase_client.get_data(path)
        return {"data":data}
    except HTTPException as e:
        return {"error":e.detail}
    