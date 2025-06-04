import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  playerName: localStorage.getItem('playerName') || 'Рибак',
};

export const AppContext = createContext(initialState);

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    document.body.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('playerName', state.playerName);
  }, [state.playerName]);

  const setTheme = (themeValue) => {
    dispatch({
      type: 'SET_THEME',
      payload: themeValue,
    });
  };

  const setPlayerName = (name) => {
    dispatch({
      type: 'SET_PLAYER_NAME',
      payload: name,
    });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <AppContext.Provider value={{ 
      theme: state.theme, 
      playerName: state.playerName, 
      setTheme,
      setPlayerName, 
      toggleTheme 
    }}>
      {children}
    </AppContext.Provider>
  );
};