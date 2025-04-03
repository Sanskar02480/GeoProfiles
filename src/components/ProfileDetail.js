import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProfileDetail.module.css';

const ProfileDetail = () => {
  const { state } = useLocation();
  const profile = state?.profile;
  const navigate = useNavigate();

  if (!profile) {
    return (
      <div className={styles.notFound}>
        Profile not found
      </div>
    );
  }

  return (
    <div className={styles.profileDetail}>
      <button 
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-arrow-left"></i> Back to Profiles
      </button>
      
      <div className={styles.profileHeader}>
        <img 
          src={profile.photo || 'default-profile.jpg'} 
          alt={profile.name}
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <h1>{profile.name}</h1>
          <span className={styles.category}>
            {profile.category}
          </span>
          <p className={styles.description}>{profile.description}</p>
        </div>
      </div>
      
      <div className={styles.contactSection}>
        <h2>Contact Information</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>{profile.email || 'Not provided'}</p>
            </div>
          </div>
          
          <div className={styles.contactItem}>
            <i className="fas fa-phone"></i>
            <div>
              <h3>Phone</h3>
              <p>{profile.phone || 'Not provided'}</p>
            </div>
          </div>
          
          <div className={styles.contactItem}>
            <i className="fas fa-globe"></i>
            <div>
              <h3>Website</h3>
              <p>
                {profile.website ? (
                  <a 
                    href={profile.website.startsWith('http') ? profile.website : `http://${profile.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {profile.website}
                  </a>
                ) : 'Not provided'}
              </p>
            </div>
          </div>
          
          <div className={styles.contactItem}>
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3>Location</h3>
              <p>
                Latitude: {profile.location.lat.toFixed(4)}, 
                Longitude: {profile.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;