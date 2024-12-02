from sentence_transformers import SentenceTransformer
from typing import List

model = SentenceTransformer("jhgan/ko-sroberta-multitask")


def query_to_vector(query: str) -> List[float]:
    return model.encode(query).tolist()
