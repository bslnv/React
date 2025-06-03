import React from 'react';

function FishCard({ id, name, size, rarity, imageUrl, notes }) { 
  if (!name || !id) {
    console.warn('FishCard: name or id is missing, rendering null.', { id, name });
    return null;
  }

  let borderColor = 'grey';
  let rarityText = rarity;
  let specialBadge = null;

  if (rarity === 'Рідкісна') {
    borderColor = 'blue';
  } else if (rarity === 'Епічна') {
    borderColor = 'purple';
    rarityText = `${rarity} ✨`;
    specialBadge = <span style={{ color: 'purple', fontWeight: 'bold' }}>Епік!</span>;
  } else if (rarity === 'Легендарна') {
    borderColor = 'gold';
    rarityText = `${rarity} 🌟`;
    specialBadge = <span style={{ color: 'gold', fontWeight: 'bold' }}>Легенда!</span>;
  }

  return (
    <div style={{
      border: `2px solid ${borderColor}`,
      margin: '10px',
      padding: '10px',
      width: '200px',
      minHeight: '220px', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      position: 'relative' 
    }}>
      {specialBadge && <div style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '10px' }}>{specialBadge}</div>}
      <h4>{name} <small style={{color: '#777'}}>(ID: {id.substring(0,4)})</small></h4>
      <p>Розмір: {size}</p>
      <p>Рідкісність: {rarityText}</p>

      {imageUrl && <img src={imageUrl} alt={name} style={{ width: '80px', height: 'auto', marginTop: '5px', borderRadius: '4px' }} />}
      {!imageUrl && <p style={{fontSize: '10px', color: 'grey', margin: '10px 0'}}>(немає зображення)</p>}

      {notes && <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: 'auto', color: '#555' }}>Примітка: {notes}</p>}
    </div>
  );
}

export default React.memo(FishCard);