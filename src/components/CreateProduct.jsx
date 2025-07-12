import React, { useState } from "react";
import styles from "../assets/css/CreateProduct.module.css";
import { postData } from "../utils/api";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    previousPrice: "",
    price: "",
    category: "",
    subCategory: "",
    color: [],
    stock: "",
    rating: "",
    images: [],
    isFeatured: false,
  });

  const [imageUrls, setImageUrls] = useState([]);
  const categories = ["fashion", "electronics", "bags", "groceries", "beauty"];

  const subCategories = {
    fashion: ["men", "women"],
    electronics: ["mobiles", "laptops", "tvs", "smartwatches"],
    bags: ["men bags", "women bags"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "color") {
      setFormData({
        ...formData,
        color: value.split(",").map((c) => c.trim()),
      });
    } else if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        subCategory: "", // reset subCategory
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUrlChange = (e) => {
    const urls = e.target.value.split(",").map((url) => url.trim());

    if (urls.length > 5) {
      alert("You can only enter up to 5 image URLs.");
      return;
    }
    setImageUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      alert("Please provide at least 1 image URL.");
      return;
    }

    if (
      ["fashion", "electronics", "bags"].includes(formData.category) &&
      (!formData.subCategory || formData.subCategory === "")
    ) {
      alert("Please select a valid subcategory.");
      return;
    }

    const finalData = { ...formData, images: imageUrls };

    console.log("Submitted Final Data: ", finalData);

    try {
      const res = await postData("/api/product/create", finalData);
      // console.log("API response:", res);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name *"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description *"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className={styles.input}
          value={formData.brand}
          onChange={handleChange}
        />

        <input
          type="number"
          name="previousPrice"
          placeholder="Previous Price (Optional)"
          className={styles.input}
          value={formData.previousPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price *"
          className={styles.input}
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className={styles.select}
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {["fashion", "electronics", "bags"].includes(formData.category) && (
          <select
            name="subCategory"
            className={styles.select}
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {subCategories[formData.category]?.map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          name="color"
          placeholder="Colors (comma-separated)"
          className={styles.input}
          value={formData.color.join(", ")}
          onChange={handleChange}
        />

        <input
          type="number"
          min={0}
          name="stock"
          placeholder="Stock *"
          className={styles.input}
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          min={0}
          max={5}
          step="0.1"
          name="rating"
          placeholder="Rating (0-5)"
          className={styles.input}
          value={formData.rating}
          onChange={handleChange}
        />

        <div className={styles.uploadGroup}>
          <label className={styles.label}>
            Image URLs (comma-separated, max 5):
          </label>
          <input
            type="text"
            onChange={handleUrlChange}
            className={styles.input}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className={styles.inputFeature}
          />
          <label>Featured</label>
        </div>

        <button type="submit" className={styles.button}>
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
