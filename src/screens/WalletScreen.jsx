import React, { useState, useRef, useEffect } from 'react';

export const WalletScreen = ({ onNavigate }) => {
  const balance = 15462.10;
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const handleBalanceClick = () => {
    clickCount.current += 1;
    
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 300);
    } else if (clickCount.current === 2) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      onNavigate('history');
    }
  };

  const handleBalancePress = () => {
    const timer = setTimeout(() => {
      setIsBalanceHidden(prev => !prev);
    }, 500);
    setPressTimer(timer);
  };

  const handleBalanceRelease = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  useEffect(() => {
    return () => {
      if (pressTimer) clearTimeout(pressTimer);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, [pressTimer]);

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="text-center mt-2">
        <span className="bg-zinc-900 text-sm px-3 py-1 rounded-full">Beta</span>
      </div>

      <button
        className="text-center py-8 select-none touch-manipulation"
        onClick={handleBalanceClick}
        onMouseDown={handleBalancePress}
        onMouseUp={handleBalanceRelease}
        onMouseLeave={handleBalanceRelease}
        onTouchStart={handleBalancePress}
        onTouchEnd={handleBalanceRelease}
      >
        <div className="text-5xl font-bold mb-2 transition-all duration-300">
          {isBalanceHidden ? 
            '••••••' : 
            `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          }
        </div>
        <p className="text-zinc-500">
          {isBalanceHidden ? 'Balance Hidden' : 'Available Balance'}
          <span className="block text-xs mt-1 text-zinc-600">
            Double-tap for history • Hold to {isBalanceHidden ? 'show' : 'hide'}
          </span>
        </p>
      </button>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => onNavigate('send')}
          className="aspect-square rounded-full bg-zinc-900 flex flex-col items-center justify-center
                   transition-all duration-200 hover:bg-zinc-800 active:scale-95"
        >
          <span className="text-2xl mb-2">↑</span>
          <span className="text-sm">Send</span>
        </button>
        <button 
          onClick={() => onNavigate('request')}
          className="aspect-square rounded-full bg-zinc-900 flex flex-col items-center justify-center
                   transition-all duration-200 hover:bg-zinc-800 active:scale-95"
        >
          <span className="text-2xl mb-2">↓</span>
          <span className="text-sm">Request</span>
        </button>
        <button 
          onClick={() => onNavigate('split')}
          className="aspect-square rounded-full bg-zinc-900 flex flex-col items-center justify-center
                   transition-all duration-200 hover:bg-zinc-800 active:scale-95"
        >
          <span className="text-2xl mb-2">÷</span>
          <span className="text-sm">Split</span>
        </button>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onNavigate('deposit')}
          className="w-full p-4 bg-zinc-900 rounded-xl
                   transition-all duration-200 hover:bg-zinc-800 
                   active:scale-98"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#FF9500] flex items-center justify-center">
                <span className="text-xl">+</span>
              </div>
              <span className="text-lg">Add Cash</span>
            </div>
            <span>→</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('cashout')}
          className="w-full p-4 bg-zinc-900 rounded-xl
                   transition-all duration-200 hover:bg-zinc-800 
                   active:scale-98"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-xl text-black">↑</span>
              </div>
              <span className="text-lg">Cash Out</span>
            </div>
            <span>→</span>
          </div>
        </button>
      </div>
    </div>
  );
};
