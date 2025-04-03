import React, { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setProfiles([
      { 
        id: 1, 
        name: "John Doe", 
        photo: "https://randomuser.me/api/portraits/men/32.jpg", 
        description: "Travel enthusiast with a passion for adventure sports and photography.",
        location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
        email: "john.doe@example.com",
        phone: "+1 415-555-1234",
        website: "johndoe-adventures.com",
        category: "travel"
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        photo: "https://files.chandoo.org/pbix/img/women-23.jpg", 
        description: "Professional food blogger and restaurant critic with 10+ years experience.",
        location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        email: "jane.smith@example.com",
        phone: "+1 213-555-5678",
        website: "janesmithfood.com",
        category: "food"
      },
      { 
        id: 3, 
        name: "Michael Johnson", 
        photo: "https://randomuser.me/api/portraits/men/22.jpg", 
        description: "Tech entrepreneur and startup mentor focused on AI solutions.",
        location: { lat: 40.7128, lng: -74.0060 }, // New York
        email: "michael@techinnovate.com",
        phone: "+1 212-555-9012",
        website: "techinnovate.com",
        category: "tech"
      },
      { 
        id: 4, 
        name: "Sarah Williams", 
        photo: "https://randomuser.me/api/portraits/women/63.jpg", 
        description: "Environmental scientist working on sustainable urban development.",
        location: { lat: 41.8781, lng: -87.6298 }, // Chicago
        email: "sarah.w@greenfuture.org",
        phone: "+1 312-555-3456",
        website: "greenfuture.org",
        category: "environment"
      },
      { 
        id: 5, 
        name: "David Brown", 
        photo: "https://randomuser.me/api/portraits/men/75.jpg", 
        description: "Professional musician and composer for film and television.",
        location: { lat: 36.1627, lng: -86.7816 }, // Nashville
        email: "david@dbrownmusic.com",
        phone: "+1 615-555-7890",
        website: "dbrownmusic.com",
        category: "music"
      },
      { 
        id: 6, 
        name: "Emily Davis", 
        photo: "https://randomuser.me/api/portraits/women/28.jpg", 
        description: "Fashion designer specializing in sustainable clothing lines.",
        location: { lat: 25.7617, lng: -80.1918 }, // Miami
        email: "emily@ecofashion.com",
        phone: "+1 305-555-2345",
        website: "ecofashion.com",
        category: "fashion"
      },
      { 
        id: 7, 
        name: "Robert Wilson", 
        photo: "https://randomuser.me/api/portraits/men/19.jpg", 
        description: "Sports coach and fitness trainer for professional athletes.",
        location: { lat: 39.9526, lng: -75.1652 }, // Philadelphia
        email: "robert@eliteperformance.com",
        phone: "+1 215-555-6789",
        website: "eliteperformance.com",
        category: "sports"
      },
      { 
        id: 8, 
        name: "Lisa Taylor", 
        photo: "https://randomuser.me/api/portraits/women/82.jpg", 
        description: "Best-selling author of mystery novels and creative writing teacher.",
        location: { lat: 47.6062, lng: -122.3321 }, // Seattle
        email: "lisa@lisataylorbooks.com",
        phone: "+1 206-555-0123",
        website: "lisataylorbooks.com",
        category: "literature"
      },
      { 
        id: 9, 
        name: "James Anderson", 
        photo: "https://randomuser.me/api/portraits/men/41.jpg", 
        description: "Award-winning chef and owner of three Michelin-starred restaurants.",
        location: { lat: 30.2672, lng: -97.7431 }, // Austin
        email: "james@andersoncuisine.com",
        phone: "+1 512-555-4567",
        website: "andersoncuisine.com",
        category: "food"
      },
      { 
        id: 10, 
        name: "Olivia Martinez", 
        photo: "https://randomuser.me/api/portraits/women/33.jpg", 
        description: "Medical researcher specializing in neurodegenerative diseases.",
        location: { lat: 42.3601, lng: -71.0589 }, // Boston
        email: "olivia@neuroresearch.org",
        phone: "+1 617-555-8901",
        website: "neuroresearch.org",
        category: "science"
      }
    ]);
  }, []);

  const addProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]);
  };

  const removeProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || profile.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ProfileContext.Provider 
      value={{ 
        profiles: filteredProfiles, 
        selectedProfile, 
        setSelectedProfile, 
        addProfile, 
        removeProfile,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter
      }}>
      {children}
    </ProfileContext.Provider>
  );
};