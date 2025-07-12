import React, { useEffect, useState } from "react";
import styles from "../assets/css/AllProducts.module.css";
import { fetchData } from "../utils/api";
import { FaTags } from "react-icons/fa"; // Icon added

const AllAvailableProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchData("/api/product");
        if (response?.data) {
          setProducts(response.data);
        } else {
          console.warn("No data returned from fetchData");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <FaTags className={styles.icon} /> All Available Products
      </h2>
      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className={styles.card}>
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name || "Product"}
                className={styles.image}
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>₹{product.price}</p>
            </div>
          ))
        ) : (
          <p className={styles.noProductText}>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AllAvailableProducts;
