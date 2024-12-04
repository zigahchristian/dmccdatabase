import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; // Utility for ShadCN styling
import { Notification } from '../../contexts/NotificationContext';

type NotificationComponentProps = {
  notification: Notification;
};

export const NotificationComponent: React.FC<NotificationComponentProps> = ({ notification }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 30); // Slight delay for smooth animation
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg',
        'transition-transform duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        notification.type === 'success' && 'bg-green-500 text-white',
        notification.type === 'error' && 'bg-red-500 text-white',
        notification.type === 'info' && 'bg-blue-500 text-white'
      )}
    >
      {notification.message}
    </div>
  );
};
