import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NotificationComponent } from "../components/Notification/NotificationComponent"
type Notification = {
  message: string;
  type?: 'success' | 'error' | 'info';
};

type NotificationContextType = {
  showNotification: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <NotificationComponent notification={notification} />}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
