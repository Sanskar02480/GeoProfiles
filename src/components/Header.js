import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>GeoProfiles</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/profiles" className={styles.navLink}>Profiles</Link>
        <Link to="/admin" className={styles.navLink}>Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;