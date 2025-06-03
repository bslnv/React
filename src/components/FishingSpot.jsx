import React, { useState, useCallback, useEffect } from 'react';
import FishingLog from './FishingLog';
import { useLocalStorage } from '../hooks/useLocalStorage';

const availableFishTypes = [ ];
let fishIdCounter = 0;

function FishingSpot({ spotName, environmentDescription, maxLogCapacity = 5, initialFishTypes = availableFishTypes, notify }) {
  const [caughtFishLog, setCaughtFishLog] = useLocalStorage(`caughtFishLog-${spotName}`, []);
  const [statusMessage, setStatusMessage] = useState('Готові до риболовлі!');
  const [isFull, setIsFull] = useState(caughtFishLog.length >= maxLogCapacity);

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

    const fishToCatchFrom = initialFishTypes.length > 0 ? initialFishTypes : availableFishTypes;
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

  return (
    <div style={{ border: '2px dashed #2196F3', padding: '20px', margin: '20px auto', borderRadius: '8px', maxWidth: '700px', backgroundColor: '#e3f2fd' }}>
      <h2>Ласкаво просимо до: {spotName}</h2>
      <p><em>{environmentDescription}</em></p>
      <p style={{fontWeight: 'bold'}}>Статус: <span style={{color: isFull ? 'red' : 'green'}}>{statusMessage}</span></p>

      {isFull && caughtFishLog.length > 0 && ( 
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