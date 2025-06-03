import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';
import './NotificationPortal.css';

const notificationPortalRoot = document.getElementById('notification-portal');

let notificationIdCounter = 0;

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = notificationIdCounter++;
    setNotifications(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeNotification = useCallback((idToRemove) => {
    setNotifications(prev => prev.filter(n => n.id !== idToRemove));
  }, []);

  const NotificationContainer = () => (
    ReactDOM.createPortal(
      <div className="notification-container">
        {notifications.map(n => (
          <Notification
            key={n.id}
            message={n.message}
            type={n.type}
            duration={n.duration}
            onClose={() => removeNotification(n.id)}
          />
        ))}
      </div>,
      notificationPortalRoot
    )
  );
  return { addNotification, NotificationContainer };
};