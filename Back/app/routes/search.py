from fastapi import APIRouter
from sklearn.metrics.pairwise import cosine_similarity
from collections import namedtuple
from app.utils.vectorizer import query_to_vector
from firebase_admin import db

router = APIRouter()


@router.get("/search")
def search_products(query: str):
    ref = db.reference("/")
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
            "name": item.info["name"],
            "rating": item.info["rating"],
            "pos_keyword": item.info["pos_keyword"],
            "neg_keyword": item.info["neg_keyword"],
        }
        for item in result
    ]
