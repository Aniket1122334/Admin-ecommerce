import React, { useEffect, useState } from "react";
import styles from "../assets/css/AllProducts.module.css";
import { fetchData } from "../utils/api";
import { useParams } from "react-router-dom";

// React icons
import {
  FaTshirt,
  FaLaptop,
  FaShoppingBag,
  FaAppleAlt,
  FaHeart,
} from "react-icons/fa";

const categoryIcons = {
  fashion: <FaTshirt />,
  electronics: <FaLaptop />,
  bags: <FaShoppingBag />,
  groceries: <FaAppleAlt />,
  beauty: <FaHeart />,
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams(); // e.g., fashion, electronics, etc.

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchData("/api/product");

        if (response?.data) {
          if (category?.toLowerCase() === "all products") {
            setProducts(response.data);
          } else {
            const filtered = response.data.filter(
              (product) =>
                product.category?.toLowerCase() === category?.toLowerCase()
            );
            setProducts(filtered);
          }
        } else {
          console.warn("No data returned from fetchData");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getProducts();
  }, [category]);

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "All Products";

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {categoryIcons[category?.toLowerCase()]}&nbsp;
        {formattedCategory}
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
          <p className={styles.noProductText}>
            No products available{category ? ` in ${formattedCategory}` : ""}.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
