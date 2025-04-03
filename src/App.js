import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProfileList from './components/ProfileList';
import AdminDashboard from './pages/AdminDashboard';
import MapComponent from './components/MapComponent';
import ProfileDetail from './components/ProfileDetail';
import './App.css';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profiles" element={<ProfileList />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/map" element={<MapComponent />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;