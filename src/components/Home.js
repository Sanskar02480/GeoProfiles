import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Profiles Around the World</h1>
        <p className={styles.heroSubtitle}>Discover interesting people and their locations on our interactive map</p>
        <div className={styles.heroButtons}>
          <Link to="/profiles" className={styles.primaryButton}>Get Started</Link>
          <Link to="/about" className={styles.secondaryButton}>Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;