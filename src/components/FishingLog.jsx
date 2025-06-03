import React from 'react';
import FishCard from './FishCard';

function FishingLog({ title, caughtFishes, onClearFish }) { 
  if (!caughtFishes || caughtFishes.length === 0) {
    return (
      <div style={{ border: '1px solid #4CAF50', padding: '15px', margin: '15px', borderRadius: '5px', backgroundColor: '#e8f5e9' }}>
        <h3>{title}</h3>
        <p>Ще нічого не спіймано!</p>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #4CAF50', padding: '15px', margin: '15px', borderRadius: '5px', backgroundColor: '#e8f5e9' }}>
      <h3>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {caughtFishes.map((fish) => (
          <div key={fish.id} style={{ position: 'relative' }}>
            <FishCard
              name={fish.name}
              size={fish.size}
              rarity={fish.rarity}
              imageUrl={fish.imageUrl}
            />
            {onClearFish && (
               <button
                onClick={() => onClearFish(fish.id)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  cursor: 'pointer',
                  background: 'rgba(255,0,0,0.6)',
                  color: 'white',
                  border: '1px solid darkred',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  padding: '0',
                  fontSize: '12px'
                }}
                title="Випустити рибу"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(FishingLog);