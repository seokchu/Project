from firebase_admin import credentials, db
from dotenv import load_dotenv
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from typing import List,Dict,Any
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from collections import namedtuple
import os,firebase_admin





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

model = SentenceTransformer("jhgan/ko-sroberta-multitask") #모델 초기화(전역으로)
def query_to_v(query:str) -> List[float]: 
    """query 벡터화 진행(검색어를 벡터로 변환)

    Args:
        query (str): 검색어 입력받음

    Returns:
       List[float]: 검색어 벡터 리스트화
    """
    return model.encode(query).tolist()




@app.get("/search")
def search_products(query : str):
    """ 사용자의 검색어와 가장 유사한 상품을 반환

    Args:
        query (str): 검색할 문자열 쿼리
    Returns:
       List[str(?)] : 유사한 상품(최대 5개) 정보 리스트 반환
    """
    
    ref = db.reference("/") #DB 루트에서 모든 데이터 접근
    products = ref.get()    
    query_vector = query_to_v(query)
    
    # 상품 벡터와 검색어 벡터 간의 코사인 유사도 계산
    results = [] ; product_info = namedtuple("product_info",["id","info","similarity"])
    for product_id, info in products.items():
        product_vector = info.get("vector") #상품당 벡터 접근
        similarity = cosine_similarity([query_vector],[product_vector])[0][0]
        results.append(product_info(product_id,info,similarity)) #상품 id, 상품 정보, 유사도
        
    result = sorted(results,key = lambda x: x.similarity, reverse=True)[:5] #상위 5개
    
    return [
        {
            "name": item.info["name"],
            "rating" : item.info["rating"],
            "pos_keyword": item.info["pos_keyword"],
            "neg_keyword": item.info["neg_keyword"]
        }
        for item in result
        ]




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
   