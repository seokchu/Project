from sklearn.feature_extraction.text import TfidfVectorizer #문서를 벡터화 하기
from sklearn.metrics.pairwise import cosine_similarity #코사인 유사도

def search(query, documents, top_k=5): #top_k:연관검색어개수
    vectorizer = TfidfVectorizer()
    all_texts = query + documents #자료형 어떻게 맞출지 미정/단 0번째 item이 쿼리가 되도록
    tfidf_matrix = vectorizer.fit_transform(all_texts) #모든 텍스트 벡터화 진행
    
    #코사인 유사도 계산 -> 검색 알고리즘에서 중요
    cosine_similarities  = cosine_similarity(tfidf_matrix[0:1],tfidf_matrix[1:]).flatten()
    
    similar_idx = cosine_similarities.argsort()[-top_k][::-1]
    
    result = []
    for idx