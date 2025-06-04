import React, { useState, useEffect, useRef } from 'react';
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
  const [playerName, setPlayerName] = useState("Рибак");
  const playerNameInputRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });
  const { addNotification, NotificationContainer } = useNotification();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    addNotification(`Тему змінено на ${newTheme === 'light' ? 'світлу' : 'темну'}`, 'info', 2000);
  };

  useEffect(() => {
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
        if (theme === 'light' && !localStorage.getItem('initialConfigLoaded')) {
             addNotification('Конфігурація гри успішно завантажена!', 'success');
             localStorage.setItem('initialConfigLoaded', 'true'); // Щоб не показувати при кожній зміні теми
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
  }, [addNotification, theme]);

  useEffect(() => {
    if (playerNameInputRef.current && document.activeElement !== playerNameInputRef.current) {
        // Фокусуємо, тільки якщо інпут не активний, щоб не перебивати ввід користувача
        // playerNameInputRef.current.focus(); // Можна тимчасово закоментувати, якщо заважає
    }
  }, []);

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
        <div style={{...loadingErrorStyle, color: 'red'}}>Помилка: {error}. Спробуйте перезавантажити.</div>
      </div>
    );
  }

  return (
    <div className="App">
      <NotificationContainer />
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              theme={theme} 
              toggleTheme={toggleTheme}
              playerName={playerName}
              setPlayerName={setPlayerName}
              playerNameInputRef={playerNameInputRef}
            />
          }
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
          {/* Тут можна буде додати інші маршрути, наприклад, для Fishdex */}
          {/* <Route path="fishdex" element={<FishdexPage />} /> */}
          {/* Можна додати маршрут для 404 Not Found */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;