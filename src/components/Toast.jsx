import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-success',
      icon: <CheckCircle className="w-6 h-6" />
    },
    error: {
      bg: 'bg-red-500',
      icon: <X className="w-6 h-6" />
    }
  };

  const style = styles[type] || styles.success;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${style.bg} text-white rounded-lg shadow-xl p-4 flex items-center gap-3 min-w-[300px]`}>
        {style.icon}
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="hover:opacity-80 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
