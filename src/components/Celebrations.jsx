import React, { useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 50
};

export const Celebrations = ({ isActive }) => {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current?.({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio)
    });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FF9500', '#FFD700', '#FFA07A']
    });

    makeShot(0.2, {
      spread: 60,
      colors: ['#FF9500', '#FFD700', '#FFA07A']
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FF9500', '#FFD700', '#FFA07A']
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FF9500', '#FFD700', '#FFA07A']
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FF9500', '#FFD700', '#FFA07A']
    });
  }, [makeShot]);

  React.useEffect(() => {
    if (isActive) {
      fire();
    }
  }, [isActive, fire]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={canvasStyles}
    />
  );
};
