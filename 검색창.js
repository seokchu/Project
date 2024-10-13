// 검색 버튼 클릭 이벤트 리스너 추가
document.getElementById('searchButton').addEventListener('click', function() {
    // 검색 입력값 가져오기
    const query = document.getElementById('searchInput').value;
    if (query) {
        // 리뷰_키워드창.html 페이지로 검색어를 URL로 보내면서 새 창을 엽니다.
        window.open(`리뷰_키워드창.html?q=${encodeURIComponent(query)}`, '_blank');
    }
});

// Enter 키로 검색하기
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});

// 추가된 코드: 페이지 전환을 위한 새로운 기능
document.getElementById('searchButton').addEventListener('click', function() {
    // 검색 입력값 가져오기
    const searchInput = document.getElementById('searchInput').value;
    // 입력값이 있을 경우 두 번째 페이지로 이동
    if (searchInput) {
        // 오브젝트_리뷰.html 페이지로 검색어를 URL로 보내면서 이동
        window.location.href = `오브젝트_리뷰.html?product=${encodeURIComponent(searchInput)}`;
    } else {
        alert("상품명을 입력하세요.");
    }
});

// Enter 키로 오브젝트_리뷰.html 페이지로 이동하기
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});
