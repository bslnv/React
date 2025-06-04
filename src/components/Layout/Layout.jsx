import React, { useContext, useRef, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Layout = () => {
  const { theme, toggleTheme, playerName, setPlayerName } = useContext(AppContext);
  const playerNameInputRef = useRef(null);

  useEffect(() => {
    if (playerNameInputRef.current && document.activeElement !== playerNameInputRef.current) {
    }
  }, []);

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    padding: '10px',
  };

  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--button-primary-bg)' : 'var(--link-color)',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'color 0.2s ease-in-out',
  });

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
          <NavLink to="/" style={getLinkStyle}>Головна</NavLink>
          <NavLink to="/about" style={getLinkStyle}>Про гру</NavLink>
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