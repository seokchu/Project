from sentence_transformers import SentenceTransformer
import json
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
# sentences = ["Apple", "애플"]
# model = SentenceTransformer('jhgan/ko-sroberta-multitask')
# embeddings = model.encode(sentences)
# print(embeddings)


with open("C:/RevKeyRec/RevKeyRec/PythonWorkSpace/Back/osp-revkeyrec-default-rtdb-export.json", 'r+', encoding='utf-8') as f:
    data = json.load(f)
# texts = [product['name'] for product in data.values()] 
    texts = [product['name'] for product in data['products'] if product and 'name' in product]
#지능형 리스트 사용!
#json의 구조가 딕셔너리 안에 products 라는 키에 대해 리스트로 값을 갖고 있으며, 리스트 안에 다시 딕셔너리 형태로 상품을 저장 중
#product가 None이 아니고, product 안에 'name' 키가 있는지 확인

    model = SentenceTransformer('jhgan/ko-sroberta-multitask')
    embeddings = model.encode(texts) #주의! iterable한 객체여야함

    print(type(embeddings))

    
    list_sample = embeddings.tolist() #json 파일에 저장하기 위해 리스트 형태로 변환 진행

    #json 파일 vextor 키에 계산한 벡터값 넣어주기

    i = 0 #list_sample 의 인덱스에 접근하기 위한 변수
    for  product in data['products']: #각 상품에 접근
        if product and 'vector' in product: #NULL 이 아니고 상품 딕셔너리 안에 vector라는 키가 있다면
            product["vector"].clear() #내부를 초기화 하고
            product["vector"]=list_sample[i][:] #값 추가
            i+=1 #다음 인덱스로 넘어가기 위해 1 증가

    # 파일 포인터를 파일의 시작 위치로 이동
    f.seek(0)
    
    # 수정된 데이터를 파일에 덮어쓰기
    json.dump(data, f, ensure_ascii=False, indent=4)

def search_similar_products(query, top_n=5):
    query_embedding = model.encode([query])
    similarities = cosine_similarity(query_embedding, embeddings)
    similarities = similarities[0]
    top_indices = np.argsort(similarities)[::-1][:top_n]
    
    similar_products = []
    for idx in top_indices:
        similar_products.append({
            'name': data['products'][idx]['name'],
            'similarity': similarities[idx]
        })
    return similar_products

# 예시 검색 쿼리
query = "애플"
similar_products = search_similar_products(query)
print(similar_products)
