import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MapComponent.module.css";

const MapComponent = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapType, setMapType] = useState("roadmap");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProfile = location.state?.selectedProfile;
  
  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 60px)',
    borderRadius: '8px'
  };

  const defaultCenter = { lat: 39.8283, lng: -98.5795 };

  useEffect(() => {
    if (!mapReady || !selectedProfile?.location) return;

    const { lat, lng } = selectedProfile.location;
    setMarkerPosition({ lat: lat + 0.1, lng });
    
    const timer = setTimeout(() => {
      setMarkerPosition(selectedProfile.location);
      if (mapRef.current) {
        mapRef.current.panTo(selectedProfile.location);
        mapRef.current.setZoom(14);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedProfile, mapReady]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const handleViewDetails = (profile) => {
    navigate(`/profile/${profile.id}`, { state: { profile } });
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/profiles')}
        >
          <i className="fas fa-arrow-left"></i> Back to Profiles
        </button>
        
        <div className={styles.mapControls}>
          <button 
            className={mapType === "roadmap" ? styles.active : ""}
            onClick={() => setMapType("roadmap")}
          >
            Map
          </button>
          <button 
            className={mapType === "satellite" ? styles.active : ""}
            onClick={() => setMapType("satellite")}
          >
            Satellite
          </button>
          <button 
            className={mapType === "hybrid" ? styles.active : ""}
            onClick={() => setMapType("hybrid")}
          >
            Hybrid
          </button>
        </div>
      </div>

      <LoadScript 
        googleMapsApiKey={process.env.REACT_APP_API_KEY}


        loadingElement={<div className={styles.loadingOverlay}>Loading map...</div>}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedProfile?.location || defaultCenter}
          zoom={selectedProfile ? 14 : 4}
          mapTypeId={mapType}
          onClick={() => setActiveMarker(null)}
          options={{
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
            zoomControl: true,
            controlSize: 25
          }}
          onLoad={handleMapLoad}
        >
          {selectedProfile && markerPosition && (
            <Marker
              position={markerPosition}
              title={selectedProfile.name}
              animation={window.google?.maps?.Animation?.DROP}
              onClick={() => setActiveMarker(selectedProfile.id)}
            >
              {activeMarker === selectedProfile.id && (
                <InfoWindow 
                  position={markerPosition}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div className={styles.infoWindow}>
                    <img 
                      src={selectedProfile.photo || 'default-profile.jpg'} 
                      alt={selectedProfile.name}
                      className={styles.infoImage}
                      onClick={() => handleViewDetails(selectedProfile)}
                      style={{ cursor: 'pointer' }}
                    />
                    <h3 
                      onClick={() => handleViewDetails(selectedProfile)}
                      style={{ cursor: 'pointer', margin: '8px 0' }}
                    >
                      {selectedProfile.name}
                    </h3>
                    <p style={{ marginBottom: '10px' }}>{selectedProfile.description}</p>
                    <button 
                      className={styles.detailsButton}
                      onClick={() => handleViewDetails(selectedProfile)}
                    >
                      View Full Details
                    </button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;