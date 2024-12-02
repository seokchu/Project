import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { FaCartShopping } from "react-icons/fa6"; // Cart icon

const Navbar = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerColor, setHeaderColor] = useState("#fbfbfb"); // 초기 색상
  const [color, setColor] = useState("#010101"); // 초기 색상
  const [boxShadow, setBoxShadow] = useState("none"); // 초기 색상



  // 스크롤 위치에 따라 색상 변경
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      if (window.scrollY > 70) {
        setHeaderColor("rgba(1, 1, 1, 0.7)"); // 스크롤이 50px 이상일 때 어두운 색상
        setColor("#fbfbfb")
        setBoxShadow("0px 5px 10px rgba(0, 0, 0, 0.2)")

      } else {
        setHeaderColor("#fbfbfb"); // 기본 색상
        setColor("#010101")
        setBoxShadow("none")
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: headerColor, // 스크롤에 따라 배경색 변경
        color: color,
        boxShadow: boxShadow,
        backdropFilter: "blur(10px)",
        transition: "background-color 0.3s ease-out", // 색상 변경에 부드러운 전환 효과
        paddingLeft: "2rem",
        paddingRight: "2rem"

      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, marginTop: "0px" }} >
          <Button color="inherit" style={{ padding: "10px", margin: "0px" }} onClick={() => { navigate("/home") }} >
            <FaCartShopping size="1.2rem" />
          </Button>
        </Typography>
        <Button color="inherit" onClick={() => { navigate("/home") }}>
          <b>Home</b>
        </Button>
        <Button color="inherit" onClick={() => { }}>
          IT Device
        </Button>
        <Button color="inherit" onClick={() => { }}>
          Home Appliance
        </Button>
        <Button color="inherit" onClick={() => { }}>
          Apple
        </Button>
        <Button color="inherit" onClick={() => { }}>
          Others
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
