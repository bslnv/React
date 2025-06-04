import React, { useEffect } from 'react';
import './Notification.css';
 

const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification notification-${type}`}>
      <p>{message}</p>
      <button className="notification-close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;