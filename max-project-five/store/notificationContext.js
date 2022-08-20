import { createContext, useState, useEffect } from 'react';

const NotificationContex = createContext({
  notificaton: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContexProvider = (props) => {
  const [activeNotification, setActiveNotificvation] = useState();

  useEffect(() => {
    if (
      activeNotification && 
      (activeNotification.status === 'success' || activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => setActiveNotificvation(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [ activeNotification ])

  const showNotificationHandler = (notificationData) => {
    setActiveNotificvation(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotificvation(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContex.Provider value={context}>
      {props.children}
    </NotificationContex.Provider>
  );
};

export default NotificationContex;
