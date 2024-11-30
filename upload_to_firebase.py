import os
import json
from collections import OrderedDict
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Firebase 서비스 계정 키 파일 경로
cred = credentials.Certificate('-')

# Firebase 앱 초기화
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://osp-revkeyrec-default-rtdb.firebaseio.com/'
})

# 리뷰 데이터가 저장된 디렉토리
review_dir = 'C:/Users/tlsdu/Desktop/찐 100개/save_data'

# 데이터베이스 참조 생성
ref = db.reference('/')

# 키 값을 숫자로 부여하기 위한 초기값
product_counter = 1

for file_name in os.listdir(review_dir):
    if file_name.endswith('.json'):
        file_path = os.path.join(review_dir, file_name)
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                # JSON 파일에서 리뷰 데이터를 읽어옴
                product_reviews = json.load(f)

                # 리뷰 데이터를 firebase 에 업데이트 하고 싶은 형태로 변환
                if product_reviews:
                    total_rating = sum(review['평점'] for review in product_reviews)
                    average_rating = total_rating / len(product_reviews)

                    product_data = OrderedDict({
                        'name': file_name.replace('review_about_', '').replace('.json', '').strip(),
                        'rating': round(average_rating, 2),
                        'pos_keyword': [1],
                        'neg_keyword': [1],
                        'vector': [1]
                    })

                    # 각 제품을 숫자 키로 저장
                    ref.child(str(product_counter)).set(dict(product_data))  # Firebase에서는 OrderedDict 지원 X
                    product_counter += 1
            except json.JSONDecodeError:
                print(f"Could not decode JSON in file: {file_name}")

print("데이터 업로드 완료")
