import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the server
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Container>
      <h1>Welcome to our e-commerce store</h1>
      <ProductList>
        {products.map(product => (
          <Product key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button>Add to Cart</button>
          </Product>
        ))}
      </ProductList>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Product = styled.div`
  width: 30%;
  margin: 1%;
  padding: 1%;
  border: 1px solid #ccc;
  text-align: center;
`;

export default Home;
