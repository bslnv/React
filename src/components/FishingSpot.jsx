import React, { useState, useCallback } from 'react';
import FishingLog from './FishingLog';

const availableFishTypes = [
  { idPrefix: 'carp', name: 'Короп', size: 'Середній', rarity: 'Звичайна', imageUrl: 'https://placehold.co/100x80/FFD700/000000?text=Carp' },
  { idPrefix: 'pike', name: 'Щука', size: 'Велика', rarity: 'Рідкісна', imageUrl: 'https://placehold.co/100x80/90EE90/000000?text=Pike', notes: "Обережно, гострі зуби!" },
  { idPrefix: 'perch', name: 'Окунь', size: 'Маленький', rarity: 'Звичайна', imageUrl: 'https://placehold.co/100x80/ADD8E6/000000?text=Perch' },
  { idPrefix: 'catfish', name: 'Сом', size: 'Дуже великий', rarity: 'Епічна', imageUrl: 'https://placehold.co/100x80/A9A9A9/FFFFFF?text=Catfish', notes: "Активний вночі." },
  { idPrefix: 'sturgeon', name: 'Осетер', size: 'Гігантський', rarity: 'Легендарна', imageUrl: 'https://placehold.co/100x80/D2B48C/FFFFFF?text=Sturgeon', notes: "Цар-риба!" },
];

let fishIdCounter = 0;

function FishingSpot({ spotName, environmentDescription, maxLogCapacity = 5 }) {
  const [caughtFishLog, setCaughtFishLog] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Готові до риболовлі!');
  const [isFull, setIsFull] = useState(false); 

  const handleCatchFish = () => {
    if (caughtFishLog.length >= maxLogCapacity) {
      setStatusMessage(`Журнал повний! Максимум ${maxLogCapacity} риб.`);
      setIsFull(true); 
      return;
    }
    setIsFull(false); 

    const randomIndex = Math.floor(Math.random() * availableFishTypes.length);
    const caughtType = availableFishTypes[randomIndex];

    if (!caughtType.name) {
        setStatusMessage("Щось дивне зірвалося з гачка...");
        return;
    }

    const newFish = {
      ...caughtType, 
      id: `<span class="math-inline">\{caughtType\.idPrefix\}\_</span>{fishIdCounter++}`,
    };

    setCaughtFishLog(prevLog => [...prevLog, newFish]);
    setStatusMessage(`Спіймано: ${newFish.name}!`);
  };

  const handleClearFishById = useCallback((fishIdToRemove) => {
    setCaughtFishLog(prevLog => {
      const newLog = prevLog.filter(fish => fish.id !== fishIdToRemove);
      if (newLog.length < maxLogCapacity) {
        setIsFull(false); 
      }
      return newLog;
    });
    setStatusMessage(`Рибу з ID ${fishIdToRemove.substring(0,4)}... випущено.`);
  }, [maxLogCapacity]); 

  const handleClearAllFish = useCallback(() => {
    setCaughtFishLog([]);
    setStatusMessage('Весь улов випущено.');
    setIsFull(false); 
  }, []);

  return (
    <div style={{ border: '2px dashed #2196F3', padding: '20px', margin: '20px auto', borderRadius: '8px', maxWidth: '700px', backgroundColor: '#e3f2fd' }}>
      <h2>Ласкаво просимо до: {spotName}</h2>
      <p><em>{environmentDescription}</em></p>
      <p style={{fontWeight: 'bold'}}>Статус: <span style={{color: isFull ? 'red' : 'green'}}>{statusMessage}</span></p>

      {isFull && (
        <p style={{ color: 'darkred', backgroundColor: 'pink', padding: '5px', borderRadius: '3px' }}>
          <strong>Увага:</strong> Журнал заповнено! Більше риби не поміститься. Очистіть місце.
        </p>
      )}

      <button
        onClick={handleCatchFish}
        disabled={isFull} 
        style={{ padding: '10px 15px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: isFull ? 0.5 : 1 }}
      >
        Закинути вудку! 🎣
      </button>
      <button
        onClick={handleClearAllFish}
        disabled={caughtFishLog.length === 0}
        style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Випустити весь улов 🗑️
      </button>

      <FishingLog
        title={`Улов з "${spotName}" (макс: ${maxLogCapacity})`}
        caughtFishes={caughtFishLog}
        onClearFish={handleClearFishById}
      />
      <p>Заповненість журналу: {caughtFishLog.length} / {maxLogCapacity}</p>
    </div>
  );
}

export default FishingSpot;