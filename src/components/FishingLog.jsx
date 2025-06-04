import React from 'react';
import FishCard from './FishCard';
import './FishingLog.css';

function FishingLog({ title, caughtFishes, onClearFish }) {
  if (!caughtFishes || caughtFishes.length === 0) {
    return (
      <div className="fishing-log-wrapper">
        <h3>{title}</h3>
        <div className="empty-log-message">
          <p>Ще нічого не спіймано!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fishing-log-wrapper">
      <h3>{title}</h3>
      <div className="fishing-log-content">
        {caughtFishes.map((fish) => (
          <div key={fish.id} className="fish-log-item-wrapper">
            <FishCard
              id={fish.id}
              name={fish.name}
              size={fish.size}
              rarity={fish.rarity}
              imageUrl={fish.imageUrl}
              notes={fish.notes}
            />
            {onClearFish && (
              <button
                onClick={() => onClearFish(fish.id)}
                className="btn-clear-fish"
                title="Випустити рибу"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(FishingLog);