from fastapi import APIRouter
from sklearn.metrics.pairwise import cosine_similarity
from collections import namedtuple
from app.utils.vectorizer import query_to_vector
from firebase_admin import db

router = APIRouter()


@router.get("/search")
def search_products(query: str):
    ref = db.reference("/all_data")
    products = ref.get()
    query_vector = query_to_vector(query)

    results = []
    product_info = namedtuple("product_info", ["id", "info", "similarity"])

    for product in products:
        for product_id,info in product.items():
            product_vector = info.get("vector")
            similarity = cosine_similarity([query_vector], [product_vector])[0][0]
            results.append(product_info(product_id, info, similarity))

    result = sorted(results, key=lambda x: x.similarity, reverse=True)[:5]

    return [
        {
            "product_id" : item.id,
            "name": item.info["name"],
            "rating": item.info["rating"],
            "pos_keyword": item.info["pos_keyword"],
            "neg_keyword": item.info["neg_keyword"],
        }
        for item in result
    ]

@router.get("/{category}")
def category_items():
    ref = db.reference("/{category}")
    products = ref.get()    
    
    return products

@router.get("/{category}_search")
def search_category_items(category:str,query:str):
    ref = db.reference("/{category}")
    products = ref.get()
    query_vector = query_to_vector(query)
    
    
    results = []
    product_info = namedtuple("product_info", ["id", "info", "similarity"])

    for product_id, info in products.items():
        product_vector = info.get("vector")
        similarity = cosine_similarity([query_vector], [product_vector])[0][0]
        results.append(product_info(product_id, info, similarity))

    result = sorted(results, key=lambda x: x.similarity, reverse=True)[:5]

    return [
        {
            "product_id" : item.product_id,
            "name": item.info["name"],
            "rating": item.info["rating"],
            "pos_keyword": item.info["pos_keyword"],
            "neg_keyword": item.info["neg_keyword"],
        }
        for item in result
    ]
    
    
@router.get("/all_data/{product_id}")
def get_prodct_detail(product_id:str):
    ref = db.reference("/all_data")
    products = ref.get() ; target = None
    
    for item in products:
        #특정 상품 파싱
        if product_id in item: target = item[product_id] ; break
    
    return {
        "name":target["name"],
        "img_url":target["img_url"],
        "neg_keyword":target["neg_keyword"],
        "pos_keyword":target["pos_keyword"],
        "rating":target["rating"]
    }
    