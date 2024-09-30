#전처리 과정 -> 이름,맛 만족도 제거
#판다스 사용하여 데이터프레임 이요하여 수정 자동화

import pandas,json,os
from pathlib import Path
from tqdm import tqdm


def cleaning_data(path): #parameter 는 xlsx 파일이 저장되어있는 디렉토리 -> 상위 디렉토리는 반드시 현재 작업 디렉토리여야합니다.
    save_dir = Path(f"{path}/save_data") ; save_dir.mkdir(parents=True,exist_ok=True) #저장용 디렉토리 : 전처리된 전체 데이터를 여기에 저장합니다.
    with tqdm (total=len(os.listdir(path)),desc='Progress bar') as bar:
        for file in os.listdir(path):
            if file == '.DS_Store' or file == "save_data": #숨김파일(mac os인경우)무시     
                continue
            df = pandas.read_excel(Path(os.path.join(path,file))) #해당 xlsx파일 현재 작업 디렉토리로 옮겨서 진행함 
            
            df = df[df['리뷰 내용'] !="등록된 리뷰내용이 없습니다"] #리뷰 내용 없는 것들 삭제 
            df = df.drop(['이름','맛 만족도'],axis=1) #이름, 맛 만족도 버리기     
            tmp = [] #임시 저장 변수

            for i in range(0,len(df)):
                json_data = {
                    "작성일자":df.iloc[i]['작성일자'], 
                    "평점": int(df.iloc[i]['평점']),
                    "리뷰내용": df.iloc[i]['리뷰 내용']
                } ; tmp.append(json_data) #json 형식의 데이터를 저장합니다.
                
            with open(f"{save_dir}/review_about_{file.replace('xlsx','')}.json",'w',encoding='utf-8') as f:
                json.dump(tmp,f,ensure_ascii= False,indent=4)
                
            bar.update(1) 
    return
    
    


if __name__ == "__main__":
    cleaning_data("xlsx 이 저장되어있는 디렉토리 경로 넣어주세요. 넣어준 디렉토리 경로의 상위 디렉토리는 반드시 작업디렉토리여야 합니다.")