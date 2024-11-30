import os
import json
from collections import OrderedDict
from sentence_transformers import SentenceTransformer
import firebase_admin
from firebase_admin import credentials, db


cred = credentials.Certificate('C:/Users/tlsdu/Desktop/파데베/osp-revkeyrec-firebase-adminsdk-rvlp5-3efd852ed2.json') # Firebase 서비스 계정 키 경로
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://osp-revkeyrec-default-rtdb.firebaseio.com/'
})

# SentenceTransformer 모델 로드
model = SentenceTransformer('jhgan/ko-sroberta-multitask')

# 리뷰 데이터가 저장된 디렉토리(각 리뷰 데이터로 100개)
review_dir = 'C:/Users/tlsdu/Desktop/찐 100개/save_data'

# 데이터베이스 참조 생성
ref = db.reference('/')

# 키 값을 숫자로 부여하기 위한 초기값
product_counter = 0

for file_name in os.listdir(review_dir):
    if file_name.endswith('.json'):
        file_path = os.path.join(review_dir, file_name)
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                product_reviews = json.load(f)

                if product_reviews:
                    total_rating = sum(review['평점'] for review in product_reviews)
                    average_rating = total_rating / len(product_reviews)

                    # 파일 이름에서 불필요한 부분 제외한 상품 이름 생성
                    product_name = file_name.replace('review_about_', '').replace('.json', '').strip()

                    # 상품명 벡터화
                    embeddings = model.encode([product_name])
                    vector = embeddings[0].tolist()

                    # Firebase에 업로드할 데이터 구성(OrderedDict)
                    product_data = OrderedDict({
                        'name': product_name,
                        'rating': round(average_rating, 2),
                        'pos_keyword': [1],  # 임시 데이터로 설정(비워두면 생성되지 않음)
                        'neg_keyword': [1],
                        'vector': vector
                    })

                    # Firebase에 데이터 업로드
                    ref.child(str(product_counter)).set(dict(product_data))  # Firebase는 OrderedDict 지원 X
                    product_counter += 1

            except json.JSONDecodeError:
                print(f"디코드 오류: {file_name}")
            except Exception as e:
                print(f"처리 중 오류 {file_name}: {e}")

print("모든 데이터 Firebase에 업로드 완료")
