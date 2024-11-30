import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from typing import List,Dict,Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os




app = FastAPI() #FasAPI 인스턴스 생성
load_dotenv()

from fastapi.middleware.cors import CORSMiddleware # CORS 설정 추가

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 앱의 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    os.getenv("firebase"),
    "https://osp-revkeyrec-default-rtdb.firebaseio.com"
    )


def query_to_v(query:str) -> List[float]: 
    """query 벡터화 진행(검색어를 벡터로 변환)

    Args:
        query (str): 검색어 입력받음

    Returns:
       List[float]: 검색어의 TF-IDF 벡터
    """
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform([query]) #iterable
    return tfidf_matrix[0].toarray()[0] 


@app.get("/search")
def search_products(query : str):
    """ 사용자의 검색어와 가장 유사한 상품을 반환

    Args:
        query (str): 검색할 문자열 쿼리
    Returns:
    
    """
    
    ref = db.reference("/") #DB 루트에서 모든 데이터 접근
    products = ref.get()    
    query_vector = query_to_v(query)
    
    # 상품 벡터와 검색어 벡터 간의 코사인 유사도 계산
    results = []
    
    for key,info in products.items():
        p_vector = info["vector"]
        
        
        similarities = cosine_similarity([query_vector],p_vector)
        results.append()
    
    results = sorted(
        [
            
        ]
    )
    











------------------------------------------




# Firebase에서 모든 데이터를 가져오는 엔드포인트 추가
@app.get("/get_products")
def get_products():
    ref = db.reference("/") #루트 경로 참조
    products = ref.get() # 모든 데이터 가져오기
    if not products:
        raise HTTPException(status_code=404, detail="No products found")

    return {"products": products}

#특정 데이터 경로로 firebase 데이터 접근
@app.get("/get_data")
def get_data(path: str):
    try:
        data = firebase_client.get_data(path)
        return {"data":data}
    except HTTPException as e:
        return {"error":e.detail}
    
@app.get("/search")
def search_products(query : str):
    """ 사용자의 검색어와 가장 유사한 상품을 반환

    Args:
        query (str): 검색할 문자열 쿼리
    Returns:
    
    """
    
    ref = db.reference("/") #DB 루트에서 모든 데이터 접근
    products = ref.get()
    products_list = [item for item in products]
    
    query_vector = 


