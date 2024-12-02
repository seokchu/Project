import React from "react";
import { Box } from "@mui/material";

const AboutSection = ({ scrollPosition, minScroll, maxScroll }) => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundImage: 'url("/image/aboutSection.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(20px)', // 배경 블러 효과

        color: "#fbfbfb",
        marginTop: "20px",
        paddingTop: "10%",
        paddingBottom: "10%",
        textAlign: "center",
        transition: "opacity 0.3s ease-out",
        opacity: scrollPosition < maxScroll ? 1 : 0, // 스크롤 위치에 따라 투명도 조절
      }}
    >
      <div style={{ textAlign: "left", paddingLeft: "6%" }}>
        <h3 style={{ fontWeight: 700 }}>Review<br />+<br />Eye</h3>
        <br />
        <p style={{ fontWeight: 100 }}>
          인기 전자제품의<br />
          <strong style={{ fontWeight: 400 }}>장점 및 단점</strong>을 한 눈에 확인할 수 있는 웹서비스
        </p>
      </div>
      <br />
    </Box>
  );
};

export default AboutSection;
