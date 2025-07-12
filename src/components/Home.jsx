import React from "react";
import styles from "../assets/css/Home.module.css";
import { useNavigate } from "react-router-dom";
import {
  FaTshirt,
  FaLaptop,
  FaShoppingBag,
  FaAppleAlt,
  FaHeart,
  FaThLarge,
} from "react-icons/fa";

const categories = [
  { name: "All Products", icon: <FaThLarge /> },
  { name: "Fashion", icon: <FaTshirt /> },
  { name: "Electronics", icon: <FaLaptop /> },
  { name: "Bags", icon: <FaShoppingBag /> },
  { name: "Groceries", icon: <FaAppleAlt /> },
  { name: "Beauty", icon: <FaHeart /> },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    if (category.toLowerCase() === "all products") {
      navigate("/all-products");
    } else {
      navigate(`/category/${category.toLowerCase()}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛍️ Shop by Category</h2>
      <div className={styles.buttonGroup}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={styles.categoryButton}
            onClick={() => handleClick(cat.name)}
          >
            <span className={styles.icon}>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
