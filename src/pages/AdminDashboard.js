import React, { useContext, useState, useRef } from "react";
import { ProfileContext } from "../context/ProfileContext";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const { profiles, addProfile, removeProfile, searchTerm, setSearchTerm, filter, setFilter } = useContext(ProfileContext);
  const [newProfile, setNewProfile] = useState({ 
    id: Date.now(),
    name: "", 
    photo: "", 
    description: "", 
    location: { lat: 0, lng: 0 },
    email: "",
    phone: "",
    website: "",
    category: "travel"
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewProfile({...newProfile, photo: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile(newProfile);
    setNewProfile({ 
      id: Date.now(),
      name: "", 
      photo: "", 
      description: "", 
      location: { lat: 0, lng: 0 },
      email: "",
      phone: "",
      website: "",
      category: "travel"
    });
    setPreviewImage(null);
  };

  const handleLocationChange = (e) => {
    const [lat, lng] = e.target.value.split(",").map(Number);
    setNewProfile({
      ...newProfile,
      location: { lat, lng }
    });
  };

  return (
    <div className={styles.adminDashboard}>
      <h2>Manage Profiles</h2>
      
      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Categories</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="tech">Technology</option>
          <option value="environment">Environment</option>
          <option value="music">Music</option>
          <option value="fashion">Fashion</option>
          <option value="sports">Sports</option>
          <option value="literature">Literature</option>
          <option value="science">Science</option>
        </select>
      </div>
      
      <div className={styles.dashboardGrid}>
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <h3>Add New Profile</h3>
          
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input 
              type="text" 
              value={newProfile.name}
              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Profile Photo:</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className={styles.imageUploadContainer}>
              <button 
                type="button" 
                onClick={triggerFileInput}
                className={styles.uploadButton}
              >
                Choose File
              </button>
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className={styles.imagePreview}
                />
              ) : (
                <span className={styles.uploadHint}>No image selected</span>
              )}
            </div>
            <div className={styles.urlInputContainer}>
              <span className={styles.orText}>OR</span>
              <input 
                type="url" 
                placeholder="Enter image URL"
                value={newProfile.photo}
                onChange={(e) => {
                  setNewProfile({ ...newProfile, photo: e.target.value });
                  setPreviewImage(null);
                }}
                className={styles.urlInput}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea 
              value={newProfile.description}
              onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Location (lat,lng):</label>
            <input 
              type="text" 
              placeholder="e.g., 34.0522,-118.2437"
              onChange={handleLocationChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input 
              type="email" 
              value={newProfile.email}
              onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input 
              type="tel" 
              value={newProfile.phone}
              onChange={(e) => setNewProfile({ ...newProfile, phone: e.target.value })}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Website:</label>
            <input 
              type="url" 
              value={newProfile.website}
              onChange={(e) => setNewProfile({ ...newProfile, website: e.target.value })}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Category:</label>
            <select
              value={newProfile.category}
              onChange={(e) => setNewProfile({ ...newProfile, category: e.target.value })}
            >
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="tech">Technology</option>
              <option value="environment">Environment</option>
              <option value="music">Music</option>
              <option value="fashion">Fashion</option>
              <option value="sports">Sports</option>
              <option value="literature">Literature</option>
              <option value="science">Science</option>
            </select>
          </div>
          
          <button type="submit" className={styles.submitButton}>Add Profile</button>
        </form>
        
        <div className={styles.profileList}>
          <h3>Current Profiles ({profiles.length})</h3>
          {profiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            <ul className={styles.profileCards}>
              {profiles.map((profile) => (
                <li key={profile.id} className={styles.profileCard}>
                  <img 
                    src={profile.photo || 'default-profile.jpg'} 
                    alt={profile.name}
                    className={styles.profileImage}
                  />
                  <div className={styles.profileInfo}>
                    <h4>{profile.name}</h4>
                    <p className={styles.profileCategory}>{profile.category}</p>
                    <p className={styles.profileDescription}>{profile.description}</p>
                    <div className={styles.profileActions}>
                      <button 
                        onClick={() => removeProfile(profile.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;