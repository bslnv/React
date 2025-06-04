import React from 'react';

const fishSpecies = [
  {
    name: 'Короп',
    description: 'Популярна прісноводна риба, відома своєю витривалістю. Часто зустрічається в ставках та озерах. Харчується рослинною їжею та дрібними безхребетними.',
    habitat: 'Озера, ставки, повільні річки',
    imageUrl: 'https://placehold.co/150x100/FFD700/000000?text=Короп',
    funFact: 'Коропи можуть жити до 20 років і більше в сприятливих умовах.'
  },
  {
    name: 'Щука',
    description: 'Хижа риба з видовженим тілом та характерною пащею, повною гострих зубів. Полює із засідки на іншу рибу, жаб та навіть водоплавних птахів.',
    habitat: 'Річки, озера, водосховища',
    imageUrl: 'https://placehold.co/150x100/90EE90/000000?text=Щука',
    funFact: 'Щука може ковтати здобич, яка становить до половини її власного розміру.'
  },
  {
    name: 'Окунь',
    description: 'Поширена риба, яку легко впізнати за смугастим забарвленням та колючим спинним плавцем. Є активним хижаком, харчується дрібною рибою та безхребетними.',
    habitat: 'Різноманітні прісні водойми: річки, озера, ставки',
    imageUrl: 'https://placehold.co/150x100/ADD8E6/000000?text=Окунь',
    funFact: 'Окуні часто полюють зграями, заганяючи мальків.'
  },
  {
    name: 'Сом',
    description: 'Велика донна риба без луски, з характерними "вусами". Веде переважно нічний спосіб життя, харчується рибою, раками, молюсками.',
    habitat: 'Великі річки та озера з повільною течією',
    imageUrl: 'https://placehold.co/150x100/A9A9A9/FFFFFF?text=Сом',
    funFact: 'Найбільший офіційно зареєстрований сом важив близько 300 кг.'
  },
];

function FishEncyclopedia() {
  console.log('FishEncyclopedia component has been loaded!');

  return (
    <div style={{
      border: '2px solid #FF8C00',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#FFF8DC',
      borderRadius: '8px'
    }}>
      <h2 style={{ textAlign: 'center', color: '#D2691E', marginBottom: '20px' }}>📖 Енциклопедія Риб 📖</h2>
      {fishSpecies.map(fish => (
        <div key={fish.name} style={{
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: '1px dashed #D2B48C'
        }}>
          <h3 style={{ color: '#8B4513' }}>{fish.name}</h3>
          {fish.imageUrl && <img src={fish.imageUrl} alt={fish.name} style={{ float: 'right', marginLeft: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />}
          <p><strong>Опис:</strong> {fish.description}</p>
          <p><strong>Середовище:</strong> {fish.habitat}</p>
          <p><strong>Цікавий факт:</strong> {fish.funFact}</p>
          <div style={{clear: 'both'}}></div>
        </div>
      ))}
      {fishSpecies.length === 0 && <p>Інформація про риб наразі недоступна.</p>}
    </div>
  );
}

export default FishEncyclopedia;