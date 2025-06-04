import React, { useState, useEffect, useCallback } from 'react';
import Notification from './Notification'; 
import './NotificationPortal.css';


let notificationIdCounter = 0;

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = notificationIdCounter++;
    setNotifications(prevNotifications => [...prevNotifications, { id, message, type, duration }]);
  }, []);

  const removeNotification = useCallback((idToRemove) => {
    setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== idToRemove));
  }, []);

  const NotificationContainer = () => {
    if (notifications.length === 0) {
      return null;
    }
    return (
      <div className="notification-container-inline">
        {notifications.map(n => (
          <Notification 
            key={n.id}
            message={n.message}
            type={n.type}
            duration={n.duration}
            onClose={() => removeNotification(n.id)}
          />
        ))}
      </div>
    );
  };
  return { addNotification, NotificationContainer };
};