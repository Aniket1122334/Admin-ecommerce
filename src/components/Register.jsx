import React, { useState } from "react";
import styles from "../assets/css/Register.module.css";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signup = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !formFields.name ||
      !formFields.email ||
      !formFields.phone ||
      !formFields.password
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await postData("/api/user/signup", formFields);
      // console.log("Signup Response:", res);
      if (res.success) {
        navigate("/signin"); // Redirect on success
      } else {
        alert(res.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google..."); // Placeholder - Implement OAuth here
    // Add Google OAuth logic if needed
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={signup}>
        <h2 className={styles.title}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
          required
          autoFocus
          name="name"
          value={formFields.name} // Added value for controlled input
          onChange={onChangeInput}
        />
        <input
          type="email"
          placeholder="Email Address"
          className={styles.input}
          required
          name="email"
          value={formFields.email} // Added value for controlled input
          onChange={onChangeInput}
        />
        <input
          type="number"
          placeholder="Phone Number"
          className={styles.input}
          required
          name="phone"
          value={formFields.phone} // Added value for controlled input
          onChange={onChangeInput}
        />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            required
            name="password"
            value={formFields.password} // Added value for controlled input
            onChange={onChangeInput}
          />
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>

        <div className={styles.or}>OR</div>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          <FaGoogle className={styles.icon} />
          Login with Google
        </button>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <span
            className={styles.loginLink}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
