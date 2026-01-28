
import React, { useState } from 'react';
import { VocabularyItem } from '../types';

interface FlashcardsProps {
  items: VocabularyItem[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentItem = items[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="w-full max-w-sm aspect-[3/4] perspective-1000 group">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 border-4 border-indigo-100 text-center">
            <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">So'z</span>
            <h3 className="text-4xl font-extrabold text-indigo-900 mb-2 break-all">{currentItem.word}</h3>
            <p className="text-gray-400 mt-8 animate-pulse text-sm">Tarjimani ko'rish uchun bosing</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 border-4 border-white text-white text-center">
            <span className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-4">Tarjimasi</span>
            <h3 className="text-3xl font-bold mb-4">{currentItem.translation}</h3>
            <div className="w-full h-px bg-indigo-400 my-4"></div>
            <p className="text-sm italic mb-2 opacity-90">"{currentItem.definition}"</p>
            <p className="text-xs bg-indigo-500 p-3 rounded-xl">Example: {currentItem.example}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 active:scale-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <span className="font-bold text-gray-500 text-lg">
          {currentIndex + 1} / {items.length}
        </span>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 active:scale-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcards;
