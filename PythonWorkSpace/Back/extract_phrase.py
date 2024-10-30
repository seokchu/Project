from openai import OpenAI
import os


review = {
        "작성일자": "2024.07.30",
        "평점": 4,
        "리뷰내용": "사용한지 한 달 도 되지 않아서 정확하진 않지만 지금 까지는 만족 합니다. 상단에 집중 냉장실 이라고 하면 할 말 없지만 냉동실이라고 한다면 조금 애매 합니다.얼음이 얼지는 않고 구매한 얼음을 넣어두면 녹지는 않습니다.그런데 며칠 지나면 조금씩 녹으면서 다시 얼고 하는지 얼음이 뭉치고 뭉개 집니다.얼음에 성에도 많이 생기고 뭐 비슷한 다른 제품도 사용해 봤지만 거의 동일 한 것 같습니다. 물론 이 삼일 정도는 괜찮아요. 느낌 상 온도에 변화가 조금씩 있는 것 같긴 하지만 소음도 생각보다 거의 없고 모양이나 색상도 괜찮고 모든 제품이 동일 할지는 모르겠지만 제가 받은 제품은 현 상태로는 대체로 만족 입니다. 물론 가격 대비 해서는 좋은 제품 인 것 같습니다. 일반 가정집에서 쓰기에는 힘들 것 같은데 사무실 에서 사용 하기 에는 적당한 것 같습니다. 배송은 아주 만족 입니다. 배송기사님 께 감사합니다."
    }

shot = {
  "output": ["정확","만족","애매","얼지 않고","녹지는 않습니다.","얼음이 뭉치고 뭉개 집니다.","소음도 생각보다 거의 없고","모양이나 색상도 괜찮고","대체로 만족","가격 대비 해서는 좋은 재품","가정집에서 쓰기에는 힘들 것","사무실 에서 사용 하기 에는 적당","배송은 아주 만족"]
}

check = True

prompt = f"""
    우리는 문장의 키워드를 추출하여 감성분석을 진행하기 위해, 한국어 문장의 불용어를 제거 및 문장의 핵심 어구를 뽑아내야 합니다. 조사, 접속사, 의존명사, 어미, 고유명사 등과 같은 키워드 분류에 적합하지 않은 불용어를 제거해야합니다. 용언 위주로 문장을 분석해주세요. 해당 프로세스의 예시는 {review["리뷰내용"]}의 프로세스 처리 결과인 {shot}입니다. 
"""

client = OpenAI(api_key= os.getenv("gpt_api_ver1"))

response = client.chat.completions.create(
    model="gpt-4o", #모델 설정
    messages=[
        {"role" : "system","content": "You are an assistant that provides concise and accurate JSON formatted responses. Answer questions based on previous context." },
        {"role":"user","content": prompt+"를 참고하여 JSON 형식으로 제공하세요."}
    ],
    response_format = {"type":"json_object"}  #json 형식으로 출력 진행 -> prompt에서 'json' 언급해줘야함.
)

test = response.choices[0].message.content  # 결과
print(test)