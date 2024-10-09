import requests

# FastAPI 서버 URL
url = "http://127.0.0.1:8000/get_data"

# Firestore에서 가져올 컬렉션 이름과 문서 이름
data = {
    "collection_name": "test",
    "document_name": "test_doc"
}

# POST 요청 보내기
response = requests.post(url, json=data)

# 응답 결과 출력
print(response.json())
