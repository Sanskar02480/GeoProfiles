import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>GeoProfiles</h3>
            <p>Explore profiles around the world with interactive maps</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/profiles">Profiles</a></li>
              <li><a href="/admin">Dashboard</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Contact</h4>
            <p>email@example.com</p>
            <p>+1 234 567 890</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} GeoProfiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;