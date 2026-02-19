import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const MotivationalMessage = ({ type, message, onClose, autoClose = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-success',
      border: 'border-green-600',
      icon: '🎉'
    },
    warning: {
      bg: 'bg-alert',
      border: 'border-orange-600',
      icon: '⚠️'
    },
    encouragement: {
      bg: 'bg-primary',
      border: 'border-blue-600',
      icon: '💪'
    }
  };

  const style = styles[type] || styles.encouragement;

  return (
    <div className={`${style.bg} text-white rounded-lg shadow-lg p-4 border-2 ${style.border} animate-bounce-once mb-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{style.icon}</span>
          <p className="text-lg font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="ml-4 hover:opacity-80 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MotivationalMessage;
