import React from 'react';
import { Container, Box } from "@mui/material";
import styles from './css/Default.module.css';


const Footer = () => {
  return (
    <Container maxWidth="false">
      <hr />
      <Box style={{ textAlign: "right", padding: "20px 30px", fontFamily: "Freesentation-9Black" }}>
        <h6 style={{ fontWeight: "700" }}>@REVEYE</h6>
        <p style={{ fontWeight: "700", marginBottom: "0px" }}>오픈소스 파이썬 활용 프로젝트</p>
        <p>이민지 신연수 장현석 태성우 하태광</p>
        <br />
        <p>github: https://github.com/OSP-PJ/RevKeyRec.git</p>
      </Box>
    </Container>
  );
};

export default Footer;
