import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import SearchResults from "./SearchResults.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Dashboard from "./Dashboard.jsx";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/searchResults/:search" element={<SearchResults />} />
      <Route path="/productDetail/:productID" element={<ProductDetail />} />
      <Route path="/dashboard/:category" element={<Dashboard />} />
      {/* <Route path="/home" element={<Home />} /> */}
      {/* 다른 페이지 경로 추가 가능 */}
    </Routes>
  );
};

export default RouterConfig;
