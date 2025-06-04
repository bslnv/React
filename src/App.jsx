import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { useNotification } from './components/NotificationPortal';
import './App.css';

function App() {
  const [spots, setSpots] = useState([]);
  const [fallbackFish, setFallbackFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addNotification, NotificationContainer } = useNotification();

  useEffect(() => {
    let initialLoadNotified = sessionStorage.getItem('initialConfigNotified') === 'true';

    fetch('/data/gameConfig.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSpots(data.fishingSpots || []);
        setFallbackFish(data.fallbackFishTypes || []);
        setLoading(false);
        if (!initialLoadNotified) {
             addNotification('Конфігурація гри успішно завантажена!', 'success');
             sessionStorage.setItem('initialConfigNotified', 'true');
        }
      })
      .catch(err => {
        console.error("Помилка завантаження конфігурації гри:", err);
        setError(err.message);
        setLoading(false);
        setSpots([
          { id: "default_spot1", spotName: "Тихий Затон (дефолт)", environmentDescription: "Місце за замовчуванням.", maxLogCapacity: 5, customFishTypes: [] },
        ]);
        addNotification(`Помилка завантаження: ${err.message}`, 'error', 5000);
      });
  }, [addNotification]);
  
  const loadingErrorStyle = {
    textAlign: 'center', 
    marginTop: '50px', 
    fontSize: '20px', 
    color: 'var(--text-color)'
  };

  if (loading) {
    return (
      <div className="App">
        <NotificationContainer />
        <div style={loadingErrorStyle}>Завантаження місць для риболовлі...</div>
      </div>
    );
  }

  if (error && spots.length === 0) {
    return (
      <div className="App">
        <NotificationContainer />
        <div style={{...loadingErrorStyle, color: 'var(--notification-error-border)'}}>Помилка: {error}. Спробуйте перезавантажити.</div>
      </div>
    );
  }

  return (
    <div className="App">
      <NotificationContainer />
      <Routes>
        <Route 
          path="/" 
          element={<Layout />}
        >
          <Route 
            index 
            element={
              <HomePage 
                spotsData={spots} 
                fallbackFishData={fallbackFish} 
                addNotification={addNotification} 
              />
            } 
          />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;