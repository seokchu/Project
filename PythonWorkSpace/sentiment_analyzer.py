from deep_translator import GoogleTranslator
from textblob import TextBlob #영어 감성 분석을 위한 라이브러리
from sklearn.feature_extraction.text import CountVectorizer #키워드 추출을 위한 라이브러리
from collections import Counter #단어 빈도수 계산
from pathlib import Path
import os,json

class SentimentAnalyzer:
    def __init__(self,reviews):
        self.reviews = reviews
        
    def translate_to_eng(self,text): #번역해주는 메서드 (한->영)
        return GoogleTranslator(source="ko", target="en").translate(text)
    
    def translate_to_ko(self,text): #영->한
        return GoogleTranslator(source="en", target="ko").translate(text)
    
    def analyzer(self,reviews): #감성분석 수행
        positive = [] ; negative =[]
        
        for review in reviews:
            eng_text = self.translate_to_eng(review["리뷰내용"]) #리뷰 내용 접근
            blob = TextBlob(eng_text)
            polarity = blob.sentiment.polarity #0을 기준으로 긍정/부정을 가려냄, 1->긍정 / -1 ->부정 / 0 -> 중립
            
            if polarity > 0 : #긍정적인 리뷰임
                positive.append(eng_text)
            else: #0과 같거나 작은 경우는 부정적인 리뷰로 분류
                negative.append(eng_text)
        
        return positive,negative #긍•부정 분류한 text로 구성된 리스트 반환
    
    def extract_keywords(self,reviews,k): #top-k 적용, default=5
        if not reviews: #리뷰가 비어있다면
            return []
        
        vectorizer = CountVectorizer(stop_words="english") #영여 불용어를 제거하는 parameter라고 함
        all_reviews = " ".join(reviews)
        word_cnt = vectorizer.fit_transform([all_reviews]) #각 단어의 빈도수 계산
        
        #전체로 묶어서 전체 문장에대한 단어 나열 및 전체 빈도수 확인
        word_frq = dict(zip(vectorizer.get_feature_names_out(),word_cnt.toarray().sum(axis=0)))
        
        #키워드 추출(k개만)
        keywords = [word for word,cnt in Counter(word_frq).most_common(k)]
        return keywords
    
    #감성분석 + 키워드 추출 수행하는 메인함수!
    def get_keywords(self,k=5):
        pos_rev,neg_rev = self.analyzer(self.reviews) #리뷰 분류
        
        positive_keywords = self.extract_keywords(pos_rev,k) #긍정 키워드
        negative_keywords = self.extract_keywords(neg_rev,k) #부정 키워드
        
        #번역작업
        positive_ko = [self.translate_to_ko(text) for text in positive_keywords] 
        negative_ko= [self.translate_to_ko(text) for text in negative_keywords]
        
        return {
            "pos":positive_ko,
            "neg":negative_ko
        } #test용 return 값
        
        
if __name__ == "__main__": 
    test_file = Path("/Users/minji/Desktop/한밭대/[강의]24_2학년_2학기/오픈소스/RevKeyRec/rsc/crawled_review/review_about_갈란츠 미니 1도어 냉장고..json")
    with open(test_file,'r',encoding='utf-8') as f:
        file = json.load(f)
        
    analyzer = SentimentAnalyzer(file)
    keywords = analyzer.get_keywords()
    
    print(f"긍정 키워드:{keywords["pos"]}")
    print(f"부정 키워드:{keywords["neg"]}")