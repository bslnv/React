import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import FishingLog from './FishingLog';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './FishingSpot.css';

const FishEncyclopedia = lazy(() => import('./FishEncyclopedia'));

let fishIdCounter = 0;

function FishingSpot({ spotName, environmentDescription, maxLogCapacity = 5, initialFishTypes = [], notify }) {
  const [caughtFishLog, setCaughtFishLog] = useLocalStorage(`caughtFishLog-${spotName}`, []);
  const [statusMessage, setStatusMessage] = useState('Готові до риболовлі!');
  const [isFull, setIsFull] = useState(caughtFishLog.length >= maxLogCapacity);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);

  useEffect(() => {
    if (caughtFishLog.length > 0) {
        const maxIdNum = caughtFishLog.reduce((max, fish) => {
            const numPart = parseInt(fish.id.split('_').pop(), 10);
            return isNaN(numPart) ? max : Math.max(max, numPart);
        }, -1);
        fishIdCounter = maxIdNum + 1;
    } else {
        fishIdCounter = 0;
    }
  }, []);

  useEffect(() => {
    const full = caughtFishLog.length >= maxLogCapacity;
    setIsFull(full);
    if (full && notify && caughtFishLog.length > 0) {
      notify(`Журнал для "${spotName}" повний!`, 'warning');
    }
  }, [caughtFishLog, maxLogCapacity, spotName, notify]);

  const handleCatchFish = () => {
    if (isFull) {
      setStatusMessage(`Журнал повний! Максимум ${maxLogCapacity} риб.`);
      return;
    }

    const fishToCatchFrom = initialFishTypes.length > 0 ? initialFishTypes : [];
    if (fishToCatchFrom.length === 0) {
        setStatusMessage("Немає доступних типів риб для цього місця.");
        if (notify) notify("Немає доступних типів риб для цього місця.", 'warning');
        return;
    }
    const randomIndex = Math.floor(Math.random() * fishToCatchFrom.length);
    const caughtType = fishToCatchFrom[randomIndex];

    if (!caughtType || !caughtType.name) {
        setStatusMessage("Щось дивне зірвалося з гачка...");
        if (notify) notify("Невдача! Риба зірвалася.", 'error');
        return;
    }

    const newFish = {
      ...caughtType,
      id: `${caughtType.idPrefix}_${fishIdCounter++}`,
    };

    setCaughtFishLog(prevLog => [...prevLog, newFish]);
    const catchMsg = `Спіймано: ${newFish.name}!`;
    setStatusMessage(catchMsg);
    if (notify) {
      let type = 'info';
      if (newFish.rarity === 'Епічна' || newFish.rarity === 'Легендарна') type = 'success';
      const notificationMessage = `${catchMsg} (${newFish.rarity})`;
      notify(notificationMessage, type);
    }
  };

  const handleClearFishById = useCallback((fishIdToRemove) => {
    const fishToRemove = caughtFishLog.find(f => f.id === fishIdToRemove);
    setCaughtFishLog(prevLog => prevLog.filter(fish => fish.id !== fishIdToRemove));
    const releaseMsg = `Рибу ${fishToRemove ? fishToRemove.name : 'ID '+fishIdToRemove.substring(0,4)+'...'} випущено.`;
    setStatusMessage(releaseMsg);
    if (notify && fishToRemove) notify(releaseMsg, 'info');
  }, [caughtFishLog, setCaughtFishLog, notify]);

  const handleClearAllFish = useCallback(() => {
    setCaughtFishLog([]);
    setStatusMessage('Весь улов випущено.');
    fishIdCounter = 0;
    if (notify) notify(`Весь улов з "${spotName}" випущено.`, 'info');
  }, [setCaughtFishLog, notify, spotName]);

  const toggleEncyclopedia = () => {
    setShowEncyclopedia(prev => !prev);
  };

  return (
    <div className="fishing-spot-wrapper">
      <h2>Ласкаво просимо до: {spotName}</h2>
      <p><em>{environmentDescription}</em></p>
      <p className="status-text">
        Статус: <span className={isFull ? 'status-value-full' : 'status-value-ready'}>{statusMessage}</span>
      </p>

      {isFull && caughtFishLog.length > 0 && (
        <p className="log-full-warning">
          <strong>Увага:</strong> Журнал заповнено! Більше риби не поміститься. Очистіть місце.
        </p>
      )}
      
      <div className="action-buttons" style={{ marginBottom: '20px' }}>
        <button
          onClick={handleCatchFish}
          disabled={isFull}
          className="btn-cast"
        >
          Закинути вудку! 🎣
        </button>
        <button
          onClick={handleClearAllFish}
          disabled={caughtFishLog.length === 0}
          className="btn-clear-all"
        >
          Випустити весь улов 🗑️
        </button>
      </div>

      <FishingLog
        title={`Улов з "${spotName}" (макс: ${maxLogCapacity})`}
        caughtFishes={caughtFishLog}
        onClearFish={handleClearFishById}
      />
      <p>Заповненість журналу: {caughtFishLog.length} / {maxLogCapacity}</p>

      <button 
        onClick={toggleEncyclopedia} 
        className="btn-toggle-encyclopedia"
      >
        {showEncyclopedia ? 'Сховати' : 'Показати'} Енциклопедію Риб
      </button>

      {showEncyclopedia && (
        <Suspense fallback={<div className="encyclopedia-fallback">Завантаження енциклопедії...</div>}>
          <FishEncyclopedia />
        </Suspense>
      )}
    </div>
  );
}

export default FishingSpot;