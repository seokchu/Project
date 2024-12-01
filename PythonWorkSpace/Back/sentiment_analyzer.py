from transformers import AutoTokenizer, AutoModelForSequenceClassification
from pathlib import Path
from typing import Any,Dict
import torch,json,os,tqdm


model_name = "nlp04/korean_sentiment_analysis_kcelectra"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
device = "cpu" ; model.to(device)

def analyze_sentiment(text):
    """감석 분석 수행 함수

    Args:
        text (_type_): 감석 분석 대상 텍스트
    Returns:
        Dict : 부정,중립,긍정 각 레이블 수치

    """
    
    inputs = tokenizer(
        text,                        # 분석할 텍스트
        return_tensors="pt",         # PyTorch 텐서로 반환
        truncation=True,             # 최대 길이를 초과하는 텍스트는 자름
        max_length=512               # 최대 512 토큰으로 제한
    ).to(device)                     # 텐서를 GPU 또는 CPU로 이동
    
    # 모델 추론 수행 (기울기 계산 없이)
    with torch.no_grad():
        outputs = model(**inputs)   # 모델에 입력 데이터를 전달하고 결과를 얻음
    
    # 출력 로짓(logits)을 소프트맥스 함수로 확률 값으로 변환
    probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)

    # 확률값을 리스트 형식으로 변환
    sentiment_score = probabilities[0].tolist()

    # 모델이 반환하는 각 레이블: 부정, 중립, 긍정
    labels = ["neg", "neut", "pos"]

    # 레이블과 점수를 딕셔너리로 매핑하여 결과 생성
    result = {label: score for label, score in zip(labels, sentiment_score)}
    
    return result  # 분석 결과 반환



def divide_state(input_path:str,output_path:str):
    """긍정/중립/부정 감성 분석 모델 진행

    Args:
        input_path (str): Phrases_JSON의 절대경로
        output_path (str): 분석 파일의 저장 절대경로
    """
    phrases_json = Path(input_path) ; container = {}
    with tqdm(total=100,desc = "Progress") as bar:
        for file in phrases_json.glob('*.json'):
            with open(file,'r',encoding='utf-8') as f:
                data = json.load(f)["data"]
                
            tmp = []
            for text in data:
                result = analyze_sentiment(text) 
                
                #sentence 단위
                tmp.append([text,result]) 
            
            
            #파일 단위로
            container[file.name] = tmp 
            bar.update(1)
        
    save_name = Path("divide_state.json")
    with open(output_path/save_name,'w',encoding='utf-8') as f:
        json.dump(container,f,ensure_ascii=False,indent=4)
      
      
      
      
if __name__ == "__main__" : 
    divide_state("""Phrases_Json의 경로""","""분석한 데이터가 저장될 폴더 경로""")
            
    
        
    
