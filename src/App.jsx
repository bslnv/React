import React, { useState, useEffect, useRef } from 'react';
import FishingSpot from './components/FishingSpot';
import { useNotification } from './components/NotificationPortal'; 
import './App.css';

function App() {
  const [spots, setSpots] = useState([]);
  const [fallbackFish, setFallbackFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState("Рибак");
  const playerNameInputRef = useRef(null);

  const { addNotification, NotificationContainer } = useNotification(); 

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
        addNotification('Конфігурація гри успішно завантажена!', 'success'); 
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

  useEffect(() => {
    playerNameInputRef.current?.focus();
  }, []);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px', fontSize: '20px'}}>Завантаження місць для риболовлі...</div>;
  }

  if (error && spots.length === 0) {
    return <div style={{textAlign: 'center', marginTop: '50px', fontSize: '20px', color: 'red'}}>Помилка: {error}. Спробуйте перезавантажити.</div>;
  }

  return (
    <div className="App">
      <NotificationContainer /> 
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        <h1>Симулятор Риболовлі для: {playerName}</h1>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="playerName" style={{ marginRight: '10px' }}>Змінити ім'я:</label>
          <input
            ref={playerNameInputRef}
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </header>
      <main>
        {spots.length > 0 ? (
          spots.map(spot => (
            <FishingSpot
              key={spot.id}
              spotName={spot.spotName}
              environmentDescription={spot.environmentDescription}
              maxLogCapacity={spot.maxLogCapacity}
              initialFishTypes={spot.customFishTypes && spot.customFishTypes.length > 0 ? spot.customFishTypes : fallbackFish}
              notify={addNotification} 
            />
          ))
        ) : (
          !loading && <p>На жаль, місця для риболовлі не завантажились або їх немає. Спробуйте пізніше.</p>
        )}
      </main>
      <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', borderTop: '1px solid #eee'}}>
        <p>&copy; {new Date().getFullYear()} Мій Симулятор Риболовлі</p>
      </footer>
    </div>
  );
}

export default App;