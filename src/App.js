// src/App.js
import React, { useState } from "react";
import { Container, TextField, IconButton, InputAdornment, Typography, Divider, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// 임시 이미지 URL 설정
import placeholderImage1 from "./assets/1page_howtouse_1.webp";
import placeholderImage2 from "./assets/1page_howtouse_2.webp";
import placeholderImage3 from "./assets/1page_howtouse_3.webp";
import placeholderLargeImage from "./assets/page1_part1_1.webp"; // 우측 메인 이미지

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // 검색 처리 함수
  const handleSearch = async () => {
    if (query) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query}`);
        const positiveReviews = ["좋은 제품이에요!", "만족스러워요!", "훌륭한 품질입니다."];
        const negativeReviews = ["품질이 별로예요.", "만족스럽지 않아요.", "다시 사지 않을 것 같아요."];

        // 새로운 창에 검색 결과 페이지 표시
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
            <head>
              <title>검색 결과</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 60px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  background-color: #f8f9fa;
                }
                h1 { color: #333; }
                .result-card {
                  display: flex;
                  max-width: 1000px;
                  width: 100%;
                  background-color: white;
                  border-radius: 12px;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                  padding: 50px;
                  margin-bottom: 40px;
                  text-align: left;
                }
                .product-image {
                  max-width: 45%;
                  height: 65vh;
                  border-radius: 8px;
                  margin-right: 40px;
                }
                .separator {
                  width: 1px;
                  background-color: #ddd;
                  opacity: 0.7;
                  margin-right: 40px;
                }
                .product-details {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                }
                .product-details h2 { margin: 0; font-size: 48px; color: #333; }
                .product-details p { font-size: 36px; color: #777; margin-top: 20px; }
                .view-button {
                  background-color: #007bff;
                  color: white;
                  padding: 20px 40px;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 24px;
                  margin-top: 40px;
                  text-decoration: none;
                  display: inline-block;
                }
                .view-button:hover { background-color: #0056b3; }
                .reviews-section {
                  max-width: 1000px;
                  width: 100%;
                  background-color: white;
                  border-radius: 12px;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                  padding: 40px;
                  margin-top: 20px;
                  text-align: left;
                }
                .reviews-header { display: flex; justify-content: space-between; align-items: center; }
                .reviews-header h2 { font-size: 36px; color: #333; }
                .review {
                  background-color: #f0f0f0;
                  border: 1px solid #ddd;
                  padding: 20px;
                  margin: 15px 0;
                  border-radius: 8px;
                  font-size: 22px;
                  color: #333;
                  line-height: 1.6;
                }
                .filter-checkbox { margin-right: 10px; }
              </style>
              <script>
                let showPositive = false;
                let showNegative = false;
                function togglePositiveReviews() {
                  showPositive = !showPositive;
                  filterReviews();
                }
                function toggleNegativeReviews() {
                  showNegative = !showNegative;
                  filterReviews();
                }
                function filterReviews() {
                  document.querySelectorAll('.positive-review').forEach(review => {
                    review.style.display = showPositive || (!showPositive && !showNegative) ? 'block' : 'none';
                  });
                  document.querySelectorAll('.negative-review').forEach(review => {
                    review.style.display = showNegative || (!showPositive && !showNegative) ? 'block' : 'none';
                  });
                }
              </script>
            </head>
            <body>
              <h1>검색 결과</h1>
              <div class="result-card">
                <img src="https://example.com/path-to-headset-image.jpg" alt="Product Image" class="product-image" />
                <div class="separator"></div>
                <div class="product-details">
                  <h2>${response.data.title}</h2>
                  <p>₩123,000</p>
                </div>
              </div>
              <a href="https://www.coupang.com" target="_blank" class="view-button">쿠팡에서 보기</a>
              <div class="reviews-section">
                <div class="reviews-header">
                  <h2>리뷰</h2>
                  <div>
                    <label><input type="checkbox" class="filter-checkbox" onclick="togglePositiveReviews()"> 좋아요</label>
                    <label><input type="checkbox" class="filter-checkbox" onclick="toggleNegativeReviews()"> 별로에요</label>
                  </div>
                </div>
                ${positiveReviews.map(review => `<div class="review positive-review">${review}</div>`).join('')}
                ${negativeReviews.map(review => `<div class="review negative-review">${review}</div>`).join('')}
              </div>
            </body>
          </html>
        `);
        setError("");
      } catch (err) {
        setError("No posts found or an error occurred.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container 
      maxWidth={false}
      style={{ 
        backgroundColor: "#FAFAFA", 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        padding: "0px 140px"
      }}
    >
      {/* 상단 OSP, Coupang 및 검색바 섹션 */}
      <Box display="flex" width="100%" alignItems="center" mb={30}>
        <Box textAlign="left" flex={1} mr={3}>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold", fontSize: "5.5rem", marginBottom: "-17px" }}>
            <span style={{ color: '#121212', fontFamily: "Coupang Sans" }}>OSP</span>
          </Typography>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold", fontSize: "5rem" }}>
            <span style={{ color: "#4B1613", fontFamily: "Coupang Sans" }}>C</span>
            <span style={{ color: "#4B1613", fontFamily: "Coupang Sans" }}>o</span>
            <span style={{ color: "#4B1613", fontFamily: "Coupang Sans" }}>u</span>
            <span style={{ color: "#C64132", fontFamily: "Coupang Sans" }}>p</span>
            <span style={{ color: "#DE9D41", fontFamily: "Coupang Sans" }}>a</span>
            <span style={{ color: "#9AB952", fontFamily: "Coupang Sans" }}>n</span>
            <span style={{ color: "#65A1D4", fontFamily: "Coupang Sans" }}>g</span>
          </Typography>
          <TextField
            label="찾고 싶은 상품을 검색해보세요!"
            variant="outlined"
            margin="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon style={{ color: "#5383EC" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                height: "50px",
                fontSize: "1rem",
                padding: "0 10px",
                "& fieldset": {
                  borderColor: "#5383EC",
                  borderWidth: "2px",
                },
              },
            }}
          />
          {error && <p>{error}</p>}
        </Box>

        {/* OSP 옆의 이미지 */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <img 
            src={placeholderLargeImage} 
            alt="Example Large Image" 
            style={{ width: "100%", maxWidth: "640px", maxHeight: "600px", borderRadius: "12px",marginTop: "120px" }} 
          />
        </Box>
      </Box>

      {/* How To Use? 섹션 */}
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ fontWeight: "bold", color: "#121212", mb: 3, fontSize: "4.5rem" }} // How To Use? 크기 증가
      >
        How To Use?
      </Typography>

      {/* How To Use? 가이드 섹션 */}
      <Box sx={{ display: "flex", alignItems: "flex-start", marginBottom: "20px",marginTop: "100px" }}> {/* 첫번째 공간 텍스트 위치 조정 */}
        <img src={placeholderImage1} alt="Search" style={{ width: "100%", maxWidth: "360px", borderRadius: "12px", marginRight: "20px" }} />
        <Box>
          <Typography variant="h5" sx={{ color: "#121212", fontWeight: "bold", fontSize: "3.5rem" }}>Search</Typography>
          <Typography sx={{ color: "#252525", fontSize: "2.5rem" }}> {/* 텍스트 스타일 설정 */}
            Please write the name of the product you want to find in the search bar!
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "row-reverse", marginBottom: "20px", marginTop: "90px"}}> {/* 두번째 공간 텍스트 위치 조정 */}
        <img src={placeholderImage2} alt="Look at reviews" style={{ width: "100%", maxWidth: "360px", borderRadius: "12px", marginLeft: "20px" }} />
        <Box>
          <Typography variant="h5" sx={{ color: "#121212", fontWeight: "bold", fontSize: "3.5rem" }}>Look at reviews</Typography>
          <Typography sx={{ color: "#252525", fontSize: "2.5rem" }}> {/* 텍스트 스타일 설정 */}
            Check the information and reviews of the searched product!
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", marginBottom: "20px",marginTop: "90px"}}> {/* 세번째 공간 텍스트 위치 조정 */}
        <img src={placeholderImage3} alt="Click for buying" style={{ width: "100%", maxWidth: "360px", borderRadius: "12px", marginRight: "20px" }} />
        <Box>
          <Typography variant="h5" sx={{ color: "#121212", fontWeight: "bold", fontSize: "3.5rem" }}>Click for buying</Typography>
          <Typography sx={{ color: "#252525", fontSize: "2.5rem" }}> {/* 텍스트 스타일 설정 */}
            You can purchase your favorite product by clicking the link button!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
