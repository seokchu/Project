import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Grid2 as Grid, Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";
import NavbarComponent from './Components/Navbar';
import FooterComponent from './Components/Footer';
import axios from 'axios';

import { FaStar } from "react-icons/fa";

const Dashboard = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [results, setResults] = useState([{ product_id: "null", name: "null", rating: "2.5", pos_keyword: ["null"], neg_keyword: ["null"] }]);

    // Use effect to fetch data when the productID changes
    useEffect(() => {
        // Early return if productID is empty or undefined
        if (!category || category.trim() === "") return;

        const handleSearchBYID = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/category_search/${category}`, {
                    params: { category },
                });
                const data = response.data;

                if (Array.isArray(data) && data.length === 0) {
                    console.log("No results found.");
                    return;
                }

                setResults(data);  // Store results if found
                console.log(data);  // Optionally log the results for debugging
            } catch (err) {
                console.error(err);  // Log the error
            }
        };

        handleSearchBYID();  // Call the function inside the effect
    }, [category]);

    return (
        <Container
            maxWidth={false}
            style={{
                boxSizing: "border-box",
                backgroundColor: "#FBFBFB",
                padding: "0",
                minHeight: "100vh",
            }}
        >
            <NavbarComponent />
            <Box
                maxWidth={null}
                sx={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "40vh",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backgroundImage: 'url("/image/aboutSection.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backdropFilter: 'blur(20px)', // 배경 블러 효과
                    overflow: "hidden",

                    color: "#fbfbfb",
                    marginTop: "20px",
                    paddingTop: "10%",
                    paddingBottom: "10%",
                    textAlign: "center",
                }}
            >
                <div style={{ textAlign: "left", paddingLeft: "6%" }}>
                    <h3 style={{ fontWeight: 700 }}>{category === "apple_data" ? "APPLE" : category}</h3>
                    <h6 style={{ fontSize: "1.2rem", fontWeight: 100 }}>
                        인기 전자제품의 장점과 단점을 한 눈에 확인하세요!
                    </h6>
                </div>
                <br />
            </Box>
            <Grid container spacing={3} style={{ padding: "10% 20%", margin: "auto 0", justifyContent: "center" }}>
                {results.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={product.product_id}>
                        <Card style={{ width: 300, height: 350 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`/image/${product.product_id}.jpg`}
                                    alt={product.name}
                                />
                                <CardContent
                                    height="150"
                                >
                                    <Typography
                                        gutterBottom variant="h5"
                                        component="div"
                                        style={{ fontSize: "1.2rem" }}
                                        onClick={() => { navigate(`/productDetail/${product.product_id}`) }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <div style={{ display: "flex", alignItems: "center", fontSize: '14px' }}><FaStar color="#FF5733" /><span>&nbsp;{product.rating}</span></div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <br />
            <br />
            <FooterComponent />
        </Container>
    );
};

export default Dashboard;
