// URL에서 쿼리 파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product'); // 'product' 파라미터 가져오기

// 제품명이 있을 경우 제품명 표시
if (productName) {
    document.getElementById('productName').textContent = productName;
}

// 제품 정보를 가져오는 함수
async function loadProductInfo() {
    try {
        // API 요청 URL (예시로 '/api/products' 경로 사용)
        const response = await fetch(`/api/products?name=${encodeURIComponent(productName)}`); // 상품명으로 API 요청
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.'); // 오류 처리
        }
        const productData = await response.json(); // JSON 형태로 데이터 변환

        // 받아온 데이터로 HTML 업데이트
        document.querySelector('.product-price').textContent = productData.price + "원"; // 가격 표시
        const buyButton = document.querySelector('.buy-button');
        buyButton.href = productData.link; // 링크 버튼 설정
    } catch (error) {
        console.error('제품 정보를 불러오는 중 오류 발생:', error); // 오류 메시지 출력
    }
}

// 리뷰 데이터를 가져와서 표시하는 함수
async function loadReviews() {
    try {
        const response = await fetch('/api/reviews'); // 리뷰 API 요청
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.'); // 오류 처리
        }
        const reviewsData = await response.json(); // JSON 형태로 데이터 변환

        const reviewsContainer = document.getElementById('reviews-container'); // 리뷰 표시 컨테이너
        reviewsContainer.innerHTML = ''; // 기존 리뷰 지우기

        // 받아온 리뷰 데이터로 HTML 업데이트
        reviewsData.forEach(review => {
            const reviewDiv = document.createElement('div'); // 새로운 div 생성
            reviewDiv.classList.add('review'); // 'review' 클래스 추가
            reviewDiv.innerHTML = `<h3>${review.name}</h3><p>${review.comment}</p>`; // 리뷰 제목과 내용 설정
            reviewsContainer.appendChild(reviewDiv); // 컨테이너에 리뷰 추가
        });
    } catch (error) {
        console.error('리뷰 정보를 불러오는 중 오류 발생:', error); // 오류 메시지 출력
    }
}

// 페이지가 로드될 때 상품 정보와 리뷰 데이터를 불러오기
window.onload = () => {
    loadProductInfo(); // 상품 정보 로드
    loadReviews(); // 리뷰 데이터 로드
};
