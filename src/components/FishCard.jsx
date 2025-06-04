import React from 'react';
import './FishCard.css';

function FishCard({ id, name, size, rarity, imageUrl, notes }) {
  if (!name || !id) {
    return null;
  }

  let borderColorVar = 'var(--rarity-common-border)';
  let specialBadgeStyle = {};
  let rarityText = rarity;

  if (rarity === 'Рідкісна') {
    borderColorVar = 'var(--rarity-rare-border)';
  } else if (rarity === 'Епічна') {
    borderColorVar = 'var(--rarity-epic-border)';
    specialBadgeStyle = { color: 'var(--rarity-epic-border)', fontWeight: 'bold' };
    rarityText = `${rarity} ✨`;
  } else if (rarity === 'Легендарна') {
    borderColorVar = 'var(--rarity-legendary-border)';
    specialBadgeStyle = { color: 'var(--rarity-legendary-border)', fontWeight: 'bold' };
    rarityText = `${rarity} 🌟`;
  }

  return (
    <div className="fish-card-wrapper" style={{ borderColor: borderColorVar }}>
      { (rarity === 'Епічна' || rarity === 'Легендарна') && (
        <div className="special-badge" style={specialBadgeStyle}>
          {rarity === 'Епічна' ? 'Епік!' : 'Легенда!'}
        </div>
      )}
      <h4>{name} <small>(ID: {typeof id === 'string' ? id.substring(0,4) : 'N/A'})</small></h4>
      <p>Розмір: {size}</p>
      <p>Рідкісність: {rarityText}</p>
      {imageUrl ? (
        <img className="fish-image" src={imageUrl} alt={name} />
      ) : (
        <p className="no-image-text">(немає зображення)</p>
      )}
      {notes && <p className="fish-notes">Примітка: {notes}</p>}
    </div>
  );
}

export default React.memo(FishCard);