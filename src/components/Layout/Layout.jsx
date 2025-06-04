import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = ({ theme, toggleTheme, playerName, setPlayerName, playerNameInputRef }) => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    padding: '10px',
  };

  const linkStyle = {
    color: 'var(--link-color)',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '4px',
  };

  return (
    <>
      <header>
        <h1>Симулятор Риболовлі для: {playerName}</h1>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="playerNameLayout" style={{ marginRight: '10px' }}>Змінити ім'я:</label>
          <input
            ref={playerNameInputRef}
            type="text"
            id="playerNameLayout"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
        >
          Змінити тему (Зараз: {theme === 'light' ? 'Світла ☀️' : 'Темна 🌙'})
        </button>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>Головна</Link>
          <Link to="/about" style={linkStyle}>Про гру</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} Симулятор Риболовлі</p>
      </footer>
    </>
  );
};

export default Layout;