import React, { useState } from "react";
import {
  Container, TextField, IconButton, InputAdornment, Typography, Box, Button, AppBar, Toolbar,
}
  from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// 이미지 파일 import
import placeholderImage1 from "./assets/1page_howtouse_1.webp";
import placeholderImage2 from "./assets/1page_howtouse_2.webp";
import placeholderImage3 from "./assets/1page_howtouse_3.webp";
import hbuLogo from "./assets/hbu_logo.png";
import backgroundImage from "./assets/temp_back2_brightened.jpg";
import applelogo from "./assets/apple_logo.png";

// Dashboard 이미지 예제
import itDevicesImage from "./assets/it_devices.webp";
import homeAppliancesImage from "./assets/home_appliance.webp";
import healthWellnessImage from "./assets/health&wellness.webp";
import othersImage from "./assets/etc_removed_background.png";

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Dashboard 드롭다운 상태 추가 (수정됨)
  const [dashboardDropdowns, setDashboardDropdowns] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  // 드롭다운 토글 함수 추가 (수정됨)
  const handleDropdownToggle = (index) => {
    setDashboardDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  // Apple 전용관 상품 데이터 및 섹션 추가 (수정됨)
  const appleProducts = [
    { name: "1", image: "https://via.placeholder.com/300" },
    { name: "MacBook Pro", image: "https://via.placeholder.com/300" },
    { name: "iPad Air", image: "https://via.placeholder.com/300" },
    { name: "Apple Watch Ultra", image: "https://via.placeholder.com/300" },
    { name: "AirPods Pro", image: "https://via.placeholder.com/300" },
    { name: "Apple TV", image: "https://via.placeholder.com/300" },
    { name: "iMac", image: "https://via.placeholder.com/300" },
    { name: "HomePod Mini", image: "https://via.placeholder.com/300" },
  ];

  // 검색 핸들러: 상품명을 받아 검색 결과 페이지 생성
  const handleSearch = async (productName = "") => {
    const searchQuery = productName || query; // 검색어 또는 선택된 제품 이름 사용
    if (searchQuery) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/search`, { params: { query: searchQuery } }); // /search로 요청
        const results = response.data;

        if (results.length === 0) {
          setError("검색 결과가 없습니다."); // 검색 결과가 없을 때
          return;
        }

        setError(""); // 오류 메시지 초기화

        // 새 창에 결과를 표시
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
          <head>
            <title>Search Results</title>
            <style>
              body {
                font-family: Montserrat, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f9f9f9;
                color: #333;
              }
              h1 {
                font-size: 24px;
                color: #444;
                margin-bottom: 20px;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 10px;
              }
              h2 {
                font-size: 18px;
                margin: 0 0 10px;
              }
              p {
                font-size: 14px;
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            <h1>Search Results</h1>
            <ul>
              ${results.map(product => `
                <li>
                  <h2>${product.name}</h2>
                  <p>Rating: ${product.rating}</p>
                  <p>Positive Keywords: ${product.pos_keyword.join(", ")}</p>
                  <p>Negative Keywords: ${product.neg_keyword.join(", ")}</p>
                </li>
              `).join("")}
            </ul>
          </body>
          </html>
        `);
      } catch (err) {
        setError("검색 결과를 가져오는 데 실패했습니다."); // 오류 처리
      }
    }
  };




  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAppleExclusiveClick = (productName) => {
    handleSearch(productName); // 검색 함수 호출
  };

  const handleAppleExclusive = () => {
    // Apple 전용관 클릭 시 새로운 창 열기
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Apple 전용관</title>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:800')

          body {
            font-family: 'Nanum Gothic', sans-serif; /* 나눔 고딕 폰트 적용 */
            margin: 0;
            font-family: Montserrat, sans-serif;
            background-color: #ffffff;
            color: #000000;
          }
          header {
          text-align: center;
          padding: 20px 0;
        }

        header img {
          display: block;
          margin: 0 auto;
          width: 150px;
          height: auto;
        }

        header h1 {
          font-size: 3rem;
          font-weight: bold;
          margin: 10px 0;
        }
          .products-section {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 20px;
          }
          .product-card {
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 10px;
          }
          .product-card img {
            width: 100%;
            height: auto;
            border-radius: 8px;
          }
          .product-name {
            margin-top: 10px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
          }
        </style>
      </head>
      <body>
  <header>
    <!-- 이미지 추가 -->
    <img src="${applelogo}" alt="Apple Logo" />
    <h1>Apple 전용관</h1>
  </header>
  <section class="products-section">
    ${appleProducts
        .map(
          (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-name">${product.name}</div>
        </div>
      `
        )
        .join("")}
  </section>
</body>

      </html>
    `);
  };
  const handleNavigation = (section) => {
    const sectionMap = {
      HowToUse: "how-to-use",
      Dashboard: "dashboard-section",
      Search: null,
    };
    if (section === "Search") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document
        .getElementById(sectionMap[section])
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dashboard 데이터에 상품명 추가 (수정됨)
  const dashboardData = [
    {
      title: "IT Devices",
      image: itDevicesImage,
      products: ["1", "Smartphone", "Tablet", "Smartwatch"],
    },
    {
      title: "Home Appliances",
      image: homeAppliancesImage,
      products: ["Refrigerator", "Microwave", "Air Conditioner", "Washing Machine"],
    },
    {
      title: "Health & Wellness",
      image: healthWellnessImage,
      products: ["Treadmill", "Yoga Mat", "Massager", "Supplements"],
    },
    {
      title: "Others",
      image: othersImage,
      products: ["Books", "Clothing", "Accessories", "Toys"],
    },
  ];

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0px 0",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* 상단 배너 섹션 */}
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#222529",
          marginBottom: "20px",
          width: "100%",
          left: 0,
          zIndex: 10,
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 190px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={hbuLogo}
              alt="HBU Logo"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "200",
                color: "#9B9D9E",
                fontSize: "1.8rem",
              }}
            >
              RevKeyRec
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "60px",
              flexGrow: 1,
            }}
          >
            <Button
              color="inherit"
              style={{
                fontSize: "1.2rem",
                fontWeight: "550",
                color: "#9B9D9E",
                textTransform: "none",
              }}
              onClick={() => handleNavigation("Search")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              style={{
                fontSize: "1.2rem",
                fontWeight: "550",
                color: "#9B9D9E",
                textTransform: "none",
              }}
              onClick={() => handleNavigation("HowToUse")}
            >
              How To Use?
            </Button>
            <Button
              color="inherit"
              style={{
                fontSize: "1.2rem",
                fontWeight: "550",
                color: "#989D9E",
                textTransform: "none",
              }}
              onClick={handleAppleExclusive} // Apple 전용관 클릭 핸들러
            >
              Apple 전용관
            </Button>
            <Button
              color="inherit"
              style={{
                fontSize: "1.2rem",
                fontWeight: "550",
                color: "#9B9D9E",
                textTransform: "none",
              }}
              onClick={() => handleNavigation("Dashboard")}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 검색 섹션 */}
      <Box
        id="search-section"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="calc(100vh - 64px)"
        mt={8}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "10rem",
            marginBottom: "-40px",
            fontFamily: "Coupang Sans",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>OSP</span>
        </Typography>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: "8.5rem",
            fontFamily: "Coupang Sans",
          }}
        >
          <span style={{ color: "#4B1613" }}>C</span>
          <span style={{ color: "#4B1613" }}>o</span>
          <span style={{ color: "#4B1613" }}>u</span>
          <span style={{ color: "#C64132" }}>p</span>
          <span style={{ color: "#DE9D41" }}>a</span>
          <span style={{ color: "#9AB952" }}>n</span>
          <span style={{ color: "#65A1D4" }}>g</span>
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
                  <SearchIcon style={{ color: "#FFFFFF" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: "#FFFFFF" },
          }}
          sx={{
            width: "63%",
            "& .MuiOutlinedInput-root": {
              height: "60px",
              fontSize: "1.5rem",
              padding: "0 20px",
              "& fieldset": {
                borderColor: "#FFFFFF",
                borderWidth: "2.5px",
              },
            },
          }}
        />
        {error && <p>{error}</p>}
      </Box>

      {/* How To Use? 섹션 */}
      <Typography
        id="how-to-use"
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#121212",
          mb: 3,
          fontSize: "4.5rem",
          marginTop: "70px",
        }}
      >
        How To Use?
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          marginTop: "50px",
          padding: "0 100px",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <img
            src={placeholderImage1}
            alt="Search"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: "3rem", mb: 1 }}
          >
            Search
          </Typography>
          <Typography sx={{ color: "#252525", fontSize: "2rem" }}>
            Please write the name of the product you want to find in the search
            bar!
          </Typography>
        </Box>
        <Box sx={{ width: "30%" }}>
          <img
            src={placeholderImage2}
            alt="Look at reviews"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: "3rem", mb: 1 }}
          >
            Look at reviews
          </Typography>
          <Typography sx={{ color: "#252525", fontSize: "2rem" }}>
            Check the information and reviews of the searched product!
          </Typography>
        </Box>
        <Box sx={{ width: "30%" }}>
          <img
            src={placeholderImage3}
            alt="Click for buying"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: "3rem", mb: 1 }}
          >
            Click for buying
          </Typography>
          <Typography sx={{ color: "#252525", fontSize: "2rem" }}>
            You can purchase your favorite product by clicking the link button!
          </Typography>
        </Box>
      </Box>

      {/* Dashboard 섹션 */}
      <Box
        id="dashboard-section"
        sx={{
          padding: "20px 100px",
          backgroundColor: "#222529",
          marginTop: "80px",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: "4.5rem",
            color: "#FFFFFF",
            marginBottom: "70px",
            marginTop: "30px",
          }}
        >
          Dashboard
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px",
          }}
        >
          {dashboardData.map((data, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#333",
                borderRadius: "20px",
                padding: "7px",
                color: "#FFFFFF",
              }}
              onClick={() => handleDropdownToggle(index)} // 드롭다운 기능 추가 (수정됨)
            >
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="h5" sx={{ fontSize: "2rem", mb: 1, textAlign: "center", fontWeight: "bold", }}>
                {data.title}
              </Typography>
              {dashboardDropdowns[index] &&
                data.products.map((product, i) => (
                  <Typography key={i} variant="body1" sx={{ fontSize: "1.5rem", marginTop: "5px", cursor: "pointer", }}
                    onClick={() => handleSearch(product)} // 클릭 시 검색 실행 (수정됨)
                  >
                    {product}
                  </Typography>
                ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Apple 전용관 */}
      <Box sx={{ padding: "20px", textAlign: "center", marginTop: "20px" }}>
        <img
          src={applelogo}
          alt="Apple Logo"
          style={{
            display: "block",
            margin: "0 auto 20px",
            width: "150px",
            height: "auto",
          }}
        />
        <Typography variant="h4" sx={{ fontSize: "3rem", fontWeight: "bold", mb: 2 }}>
          Apple 전용관
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            padding: "20px",
          }}
        >
          {appleProducts.map((product, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleAppleExclusiveClick(product.name)} // 클릭 이벤트 추가
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {product.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
