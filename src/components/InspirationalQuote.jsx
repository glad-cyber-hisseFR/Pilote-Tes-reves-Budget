import React, { useState, useEffect } from 'react';
import { getRandomQuote } from '../data/quotes';
import { Sparkles } from 'lucide-react';

const InspirationalQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getRandomQuote());
    
    // Changer la citation toutes les 30 secondes
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-accent to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
        <div>
          <p className="text-lg italic font-light leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default InspirationalQuote;
