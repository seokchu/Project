import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Container, Rating, Chip, Grid2 as Grid, Paper } from "@mui/material";
// Component
import NavbarComponent from './Components/Navbar';
import FooterComponent from './Components/Footer';

const ProductDetail = () => {
    const { productID } = useParams();
    const category = "ALL";
    const [results, setResults] = useState({ name: "null", rating: "2.5", pos_keyword: ["null"], neg_keyword: ["null"] });
    const [error, setError] = useState("");

    // Use effect to fetch data when the productID changes
    useEffect(() => {
        // Early return if productID is empty or undefined
        if (!productID || productID.trim() === "") return;

        const handleSearchBYID = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/all_data/${productID}`, {
                    params: { productID },
                });
                const data = response.data;

                if (Array.isArray(data) && data.length === 0) {
                    setError("검색 결과가 없습니다.");
                    console.log("No results found.");
                    return;
                }

                setResults(data);  // Store results if found
                setError("");  // Clear any previous errors
                console.log(data);  // Optionally log the results for debugging
            } catch (err) {
                setError("검색 결과를 가져오는 데 실패했습니다.");
                console.error(err);  // Log the error
            }
        };

        handleSearchBYID();  // Call the function inside the effect
    }, [productID]);

    return (
        <Container
            maxWidth={null}
            style={{
                backgroundColor: "#FBFBFB",
                padding: "0 20%",
                minHeight: "100vh",
            }}
        >
            <NavbarComponent />
            <Grid container spacing={3} maxWidth="70vw" style={{ paddingTop: "20%" }}>
                {/* Left Section */}
                <Grid item xs={4} id="left">
                    <p>카테고리 &gt; {category}</p>
                    <div
                        id="image"
                        style={{
                            backgroundImage: `url(/image/${productID || "default"}.jpg)`,
                            backgroundSize: "cover",
                            width: "300px",
                            height: "300px",
                            borderRadius: "10px",
                        }}
                    ></div>
                </Grid>

                {/* Right Section */}
                <Grid
                    item
                    xs={8}
                    id="right"
                    style={{
                        top: "0px",
                        paddingTop: "40px",
                        paddingBottom: "10%"
                    }}
                >
                    <h5 style={{ marginBottom: "10px" }}>{results.name}</h5>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Rating
                            value={results.rating}
                            precision={0.5}
                            readOnly
                        />
                        <h6 style={{ marginLeft: "8px" }}>{results.rating}</h6>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <Chip
                            label={`${results.rating >= 4 ? "긍정적인" : "부정적인"} 후기가 더 많은 제품이에요`}
                            color="success"
                            size="small"
                        />
                    </div>
                    <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
                        <Paper style={{ height: "145px", width: "260px", borderRadius: "10px", padding: "10px" }}>
                            {results.pos_keyword.map((keyword, index) => (
                                <Chip
                                    key={index}
                                    label={`#${keyword}`}
                                    color="success"
                                    variant="outlined"
                                    style={{ margin: "5px" }}
                                />
                            ))}
                        </Paper>
                        <Paper style={{ height: "145px", width: "260px", borderRadius: "10px", padding: "10px" }}>
                            {results.neg_keyword.map((keyword, index) => (
                                <Chip
                                    key={index}
                                    label={`#${keyword}`}
                                    color="secondary"
                                    variant="outlined"
                                    style={{ margin: "5px" }}
                                />
                            ))}
                        </Paper>
                    </div>
                </Grid>
            </Grid>

            {/* Error Message */}
            {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
            {/* <FooterComponent /> */}
        </Container>
    );
};

export default ProductDetail;
