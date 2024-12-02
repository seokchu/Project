import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";

// Component template
import { Container, Box } from "@mui/material";

// Component
import NavbarComponent from './Components/Navbar';
import FooterComponent from './Components/Footer';
import SearchBox from './Components/SearchBox';

// css
import styles from './Components/css/Default.module.css';

//
import { FaStar } from "react-icons/fa";


const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { search } = useParams();
    const { results } = location.state || { results: [] };
    // results가 JSON 형식으로 전달되었다고 가정하고 파싱, 혹은 결과가 없다면 빈 배열을 반환
    const parsedResults = results ? results : [];
    console.log(results)

    // hover
    const [hoverd, setHoverd] = useState(null);
    // 스크롤 애니메이션
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Container
            maxWidth={false}
            sx={{ backgroundColor: "#FBFBFB", padding: "0 20%" }}>
            <Container>
                <NavbarComponent />
                <Box style={{
                    paddingTop: '10%',
                    paddingLeft: '10px',
                    textAlign: 'left',

                }}>
                    <h4>{search}의 검색결과</h4>
                    <h6>&nbsp;{results.length}개의 검색결과</h6>
                    <br />
                    <br />
                    <SearchBox />
                </Box>
                {/* Search Box */}
                <div style={{ padding: '20px', backgroundColor: '#f3f3f3', color: '#010101' }}>
                    <p>정확도순</p>
                    <hr />
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        {Array.isArray(parsedResults) && parsedResults.length > 0 ? (
                            parsedResults.map((product) => (
                                <li
                                    key={product.name}
                                    style={{
                                        background: '#fff',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '20px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <h2 style={{
                                        fontSize: '18px',
                                        margin: '0 0 10px',
                                        fontWeight: hoverd === product.product_id ? '700' : '400', // Apply scaling based on hover state
                                        cursor: hoverd === product.product_id ? 'pointer' : 'default', // Change cursor on hover
                                        transition: 'transform 0.2s ease', // Smooth transition for scaling
                                    }}
                                        onMouseEnter={() => setHoverd(product.product_id)}
                                        onMouseLeave={() => setHoverd(null)}
                                        onClick={() => { navigate(`/productDetail/${product.product_id}`) }}>{product.name}</h2>
                                    <div style={{ display: "flex", alignItems: "center", fontSize: '14px', margin: '5px 0' }}><FaStar color="#FF5733" /><span>&nbsp;{product.rating}</span></div>
                                    <p style={{ fontSize: '14px', margin: '5px 0' }}>Positive Keywords: {product.pos_keyword.join(', ')}</p>
                                    <p style={{ fontSize: '14px', margin: '5px 0' }}>Negative Keywords: {product.neg_keyword.join(', ')}</p>
                                </li>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </ul>
                </div>
            </Container>
            <FooterComponent />
        </Container>
    );
};

export default SearchResults;
