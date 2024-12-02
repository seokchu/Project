import React from 'react';
import './styles.css';

// Example appleProducts data (you can replace this with actual data from props or state)
const appleProducts = [
  { image: 'path/to/apple-product1.jpg', name: 'Apple Product 1' },
  { image: 'path/to/apple-product2.jpg', name: 'Apple Product 2' },
  { image: 'path/to/apple-product3.jpg', name: 'Apple Product 3' },
  { image: 'path/to/apple-product4.jpg', name: 'Apple Product 4' },
  // Add more products as needed
];

const OnlyApple = () => {
  return (
    <html>
      <head>
        <title>Apple 전용관</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:800');

            body {
              font-family: 'Nanum Gothic', sans-serif; /* 나눔 고딕 폰트 적용 */
              margin: 0;
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
          `}
        </style>
      </head>
      <body>
        <header>
          <img src="/path/to/apple-logo.png" alt="Apple Logo" />
          <h1>Apple 전용관</h1>
        </header>
        <section className="products-section">
          {appleProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <div className="product-name">{product.name}</div>
            </div>
          ))}
        </section>
      </body>
    </html>
  );
};

export default OnlyApple;
