"use client";

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

type ConfettiProps = {
  onComplete?: () => void;
};

export function Confetti({ onComplete }: ConfettiProps) {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={400}
      gravity={0.1}
      onConfettiComplete={(confetti) => {
        if (confetti) {
          onComplete?.();
          confetti.reset();
        }
      }}
    />
  );
}
