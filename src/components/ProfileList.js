import React, { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileList.module.css";
import ProfileCard from "./ProfileCard";

const ProfileList = () => {
    const { profiles } = useContext(ProfileContext);
    const navigate = useNavigate();

    const handleViewMap = (profile) => {
        navigate('/map', { state: { selectedProfile: profile } });
    };

    const handleViewDetails = (profile) => {
        navigate(`/profile/${profile.id}`, { state: { profile } });
    };

    return (
        <div className={styles.profileListContainer}>
            <h2>Profile List</h2>
            <div className={styles.profileGrid}>
                {profiles.length === 0 ? (
                    <p className={styles.noProfiles}>No profiles available.</p>
                ) : (
                    profiles.map((profile) => (
                        <ProfileCard
                            key={profile.id}
                            profile={profile}
                            onViewMap={handleViewMap}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfileList;