import React from "react";
import styles from "./ProfileCard.module.css";

const ProfileCard = ({ profile, onViewMap, onRemoveProfile, onViewDetails }) => {
    return (
        <div className={styles.profileCard}>
            <img 
                src={profile.photo || 'default-profile.jpg'} 
                alt={profile.name} 
                className={styles.profileImage}
                onClick={() => onViewDetails(profile)}
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'default-profile.jpg'
                }}
            />
            <div className={styles.profileContent}>
                <h3 onClick={() => onViewDetails(profile)} className={styles.profileName}>
                    {profile.name}
                </h3>
                <span className={styles.profileCategory}>{profile.category}</span>
                <p className={styles.profileDescription}>{profile.description}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button 
                    className={styles.mapButton} 
                    onClick={() => onViewMap(profile)}
                >
                    <i className="fas fa-map-marker-alt"></i> View on Map
                </button>
                <button 
                    className={styles.removeButton} 
                    onClick={() => onRemoveProfile(profile.id)}
                >
                    <i className="fas fa-trash-alt"></i> Remove
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;