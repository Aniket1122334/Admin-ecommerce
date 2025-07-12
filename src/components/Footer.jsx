import React from "react";
import styles from "../assets/css/Footer.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Admin Dashboard | All Rights Reserved
      </p>
      <div className={styles.icons}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className={styles.iconLink}
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className={styles.iconLink}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://x.com/yourprofile"
          target="_blank"
          rel="noreferrer"
          className={styles.iconLink}
        >
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
