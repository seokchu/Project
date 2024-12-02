import React from "react";
import { Box, Typography } from "@mui/material";

const DashboardBox = ({ data, isDropdownOpen, onToggle, index }) => {
  return (
    <Box
      sx={{
        position: "relative",

        width: "100%",
        minHeight: "400px",
        borderRadius: "10px",
        color: "#fbfbfb",
        marginBottom: "20px",
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.3)", // hover 시 그림자 강도 증가
          transform: "scale(1.005)", // hover 시 약간 확대
          cursor: "pointer", // 마우스를 올리면 포인터로 바뀌게 함
        },

      }}
      onClick={() => onToggle(index)}
    >
      <h5
        style={{
          position: "absolute",
          bottom: "10px",
          left: "20px",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {data.title}
      </h5>
    </Box>
  );
};

export default DashboardBox;
