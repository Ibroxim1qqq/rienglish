
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep + 1 < questions.length) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex justify-between items-center px-2">
        <span className="text-sm font-semibold text-gray-500">Savol {currentStep + 1} dan {questions.length} ta</span>
        <span className="text-sm font-bold text-green-600">Ball: {score}</span>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>
        
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = 'bg-gray-50 border-gray-200';
            let textColor = 'text-gray-700';
            
            if (showResult) {
              if (option === currentQuestion.correctAnswer) {
                bgColor = 'bg-green-100 border-green-500';
                textColor = 'text-green-700';
              } else if (option === selectedOption) {
                bgColor = 'bg-red-100 border-red-500';
                textColor = 'text-red-700';
              } else {
                bgColor = 'bg-gray-50 border-gray-100 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleOptionSelect(option)}
                className={`p-4 rounded-2xl border-2 text-left transition-all font-medium ${bgColor} ${textColor} ${!showResult && 'hover:border-indigo-400 active:scale-95'}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 animate-fadeIn">
            <p className="text-sm text-indigo-800 font-semibold mb-1">Izoh:</p>
            <p className="text-sm text-indigo-700">{currentQuestion.explanation}</p>
            <button
              onClick={handleNext}
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
            >
              {currentStep + 1 === questions.length ? 'Natijani ko\'rish' : 'Keyingi savol'}
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Quiz;
