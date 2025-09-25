
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CanvasContextType {
  isOpen: boolean;
  canvasContent: ReactNode | null;
  canvasTitle: string | null;
  canvasDescription: string | null;
  openCanvas: (content: ReactNode, title?: string, description?: string) => void;
  closeCanvas: () => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canvasContent, setCanvasContent] = useState<ReactNode | null>(null);
  const [canvasTitle, setCanvasTitle] = useState<string | null>(null);
  const [canvasDescription, setCanvasDescription] = useState<string | null>(null);

  const openCanvas = (content: ReactNode, title?: string, description?: string) => {
    setCanvasContent(content);
    setCanvasTitle(title || "Creative Canvas");
    setCanvasDescription(description || null);
    setIsOpen(true);
  };

  const closeCanvas = () => {
    setIsOpen(false);
    // Delay clearing content to allow for exit animation
    setTimeout(() => {
        setCanvasContent(null);
        setCanvasTitle(null);
        setCanvasDescription(null);
    }, 300);
  };

  const value = { isOpen, canvasContent, openCanvas, closeCanvas, canvasTitle, canvasDescription };

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};
