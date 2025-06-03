import React from 'react';

function FishCard({ name, size, rarity, imageUrl }) {
  let borderColor = 'grey';
  if (rarity === 'Рідкісна') {
    borderColor = 'blue';
  } else if (rarity === 'Епічна') {
    borderColor = 'purple';
  } else if (rarity === 'Легендарна') {
    borderColor = 'gold';
  }

  return (
    <div style={{
      border: `2px solid ${borderColor}`,
      margin: '10px',
      padding: '10px',
      width: '200px',
      minHeight: '160px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      <h4>{name}</h4>
      <p>Розмір: {size}</p>
      <p>Рідкісність: {rarity}</p>
      {imageUrl && <img src={imageUrl} alt={name} style={{ width: '100px', height: 'auto', marginTop: '5px', borderRadius: '4px' }} />}
    </div>
  );
}

export default React.memo(FishCard);