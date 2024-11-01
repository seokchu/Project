from openai import OpenAI,OpenAIError
from pathlib import Path
from tqdm import tqdm
#from dotenv import load_dotenv #윈도우 전용 .env 로드하기 위한 라이브러리 / pip install python-dotenv 먼저 실행할 것
from collections import defaultdict #defaultdict -> dict관련 강의때 학습 응용
import os,json,time

#윈도우 전용 명령 실행
#load_dotenv() 

def generate_JSON(review_dir:str,phrases_JSON:str):
    review = {
            "작성일자": "2024.07.30",
            "평점": 4,
            "리뷰내용": "사용한지 한 달 도 되지 않아서 정확하진 않지만 지금 까지는 만족 합니다. 상단에 집중 냉장실 이라고 하면 할 말 없지만 냉동실이라고 한다면 조금 애매 합니다.얼음이 얼지는 않고 구매한 얼음을 넣어두면 녹지는 않습니다.그런데 며칠 지나면 조금씩 녹으면서 다시 얼고 하는지 얼음이 뭉치고 뭉개 집니다.얼음에 성에도 많이 생기고 뭐 비슷한 다른 제품도 사용해 봤지만 거의 동일 한 것 같습니다. 물론 이 삼일 정도는 괜찮아요. 느낌 상 온도에 변화가 조금씩 있는 것 같긴 하지만 소음도 생각보다 거의 없고 모양이나 색상도 괜찮고 모든 제품이 동일 할지는 모르겠지만 제가 받은 제품은 현 상태로는 대체로 만족 입니다. 물론 가격 대비 해서는 좋은 제품 인 것 같습니다. 일반 가정집에서 쓰기에는 힘들 것 같은데 사무실 에서 사용 하기 에는 적당한 것 같습니다. 배송은 아주 만족 입니다. 배송기사님 께 감사합니다."
        }
    shot = """{
        "output" : ["정확","만족","애매","얼지 않고","녹지는 않습니다.","얼음이 뭉치고 뭉개 집니다.","소음도 생각보다 거의 없고","모양이나 색상도 괜찮고","대체로 만족","가격 대비 해서는 좋은 재품","가정집에서 쓰기에는 힘들 것","사무실 에서 사용 하기 에는 적당","배송은 아주 만족"]
        }
    """

    json_format = """
        {
            "output" : []
        }
    """
    prompt = f"""
        우리는 문장의 키워드를 추출하여 감성분석을 진행하기 위해, 한국어 문장의 불용어를 제거 및 문장의 핵심 어구를 뽑아내야 합니다. 조사, 접속사, 의존명사, 어미, 고유명사 등과 같은 키워드 분류에 적합하지 않은 불용어를 제거하여 핵심 어구를 뽑아내야 합니다. 해당 프로세스의 예시는 {review["리뷰내용"]}의 프로세스 처리 결과인 {shot}입니다. return 형식은 {json_format}을 참고하세요.
    """

    client = OpenAI(api_key= os.getenv("gpt_osp")) ; error_stop = False
    with tqdm(total=len(Path(review_dir).iterdir()),desc = "Progress") as bar:
        for file in Path(review_dir).iterdir():
            if os.path.split(str(file))[1] == '.DS_Store':
                continue
            
            #저장 파일 이름 설정 / 파일마다 output 존재
            name = os.path.split(str(file))[1].split("_")[-1] ; name = name.replace("..json","") ; print(name)
            output = defaultdict(list); output["object"] = name  ; output["object"] = str(output["object"])
            review_cnt = 0 #임시 리뷰 카운팅 변수
            
            
            with open(file,'r',encoding='utf-8') as f:
                data_set = json.load(f)
            
            for data in data_set:
                if review_cnt > 30 :
                    break
                try:
                    data = data["리뷰내용"]
                    response = client.chat.completions.create(
                        model="gpt-4o", #모델 설정
                        messages=[
                            {"role" : "system","content": "You are an assistant that provides concise and accurate JSON formatted responses." },
                            {"role":"user","content": prompt+f"를 참고하여 {data}를 처리하여 json 형식으로 제공하세요."}
                        ],
                        response_format = {"type":"json_object"}  #json 형식으로 출력 진행 -> prompt에서 'json' 언급해줘야함.
                    )
                    #json객체
                    res = response.choices[0].message.content ; res = eval(res)
                    print(res)
                    
                    output["data"].extend(res["output"]) ; time.sleep(1)
                    review_cnt += 1
                except OpenAIError as e:
                    print(f"ERROR : {e}") ; error_stop = True
                    break
                
            if error_stop:
                with open(Path(phrases_JSON)/f"{name}_ErrorStop.json",'w',encoding='utf-8') as f:
                    json.dump(output,f,ensure_ascii=False,indent=4)
                break
            #하나의 상품의 모든 어구 추출이 끝난 경우 파일 저장
            with open(Path(phrases_JSON)/f"{name}.json",'w',encoding='utf-8') as f:
                json.dump(output,f,ensure_ascii=False,indent=4)
            bar.update(1)


if __name__ == "__main__":
    generate_JSON("리뷰 경로","저장 경로")