import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";

// Components
import NavbarComponent from './Components/Navbar';
import FooterComponent from './Components/Footer.js';
import SearchBox from './Components/SearchBox';
import AboutSection from './Components/Home/AboutSection';
import DashboardBox from './Components/Home/DashboardBox';

// css
import styles from './Components/css/Default.module.css';

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dashboardDropdowns, setDashboardDropdowns] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const handleDropdownToggle = (index) => {
    setDashboardDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 대시보드
  const dashboardData = [
    {
      title: "IT Devices",
      image: "/image/it.jpg",
      category: "IT"
    },
    {
      title: "Home Appliances",
      image: "/image/homeAppliance.jpg",
      category: "Home"

    },
    {
      title: "Apple",
      image: "/image/appleOnly.jpg",
      category: "apple_data"
    },
    {
      title: "Others",
      image: "/image/others.jpg",
      category: "Others"
    },
  ];

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "#FBFBFB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0px 0",
      }}
    >
      <NavbarComponent />

      {/* About Section */}
      <AboutSection
        scrollPosition={scrollPosition}
        minScroll={0}
        maxScroll={70} />

      {/* Search Box */}
      <Box
        style={{
          padding: "20px",
          marginTop: "20px",
          textAlign: "center",
          marginBottom: "6%",
          transition: "opacity 0.3s ease-out",
          opacity: scrollPosition > 400 ? 1 : 0, // 스크롤 위치에 따라 투명도 조절
        }}
      >
        <h4 style={{ marginTop: "6%", marginBottom: "0px", paddingBottom: "10px" }}>
          <span className={styles.gradientText} style={{ fontSize: "3.1rem" }}>COUPANG</span>에서
        </h4>
        <h5 style={{ marginTop: "0px", marginBottom: "5%", paddingTop: "0px" }}>
          찾고싶은 상품을 검색해보세요
        </h5>
        <SearchBox />
      </Box>

      <Box sx={{
        backgroundColor: "#f5f5f5",
        marginTop: "20px",
        paddingTop: "6%",
        display: "grid",
        gap: "40px",
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "space-around",
        alignItems: "center",
        padding: "4% 10%"
      }}>
        {dashboardData.map((data, index) => (
          <DashboardBox
            key={index}
            data={data}
            isDropdownOpen={dashboardDropdowns[index]}
            onToggle={handleDropdownToggle}
            index={index}
          />
        ))}
      </Box>
      <FooterComponent />
    </Container>
  );
}

export default Home;
