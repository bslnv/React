import React from 'react';
import FishingSpot from './components/FishingSpot';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Симулятор Риболовлі</h1>
      </header>
      <main>
        <FishingSpot
          spotName="Тихий Затон"
          environmentDescription="Мальовниче місце біля старої верби. Тут водяться як мирні, так і хижі риби."
          maxLogCapacity={5}
        />
        <FishingSpot
          spotName="Гірська Річка"
          environmentDescription="Швидка течія, каміння та форель. Улов тут - справжнє випробування!"
          maxLogCapacity={3}
        />
      </main>
      <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', borderTop: '1px solid #eee'}}>
        <p>&copy; 2025 Симулятор Риболовлі</p>
      </footer>
    </div>
  );
}

export default App;