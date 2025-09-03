import React, { useState } from 'react';
import { Heart, HeartCrack, HeartHandshake } from 'lucide-react';

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
  ];

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (noCount > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
    >
      {yesPressed ? (
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <HeartHandshake className="w-32 h-32 text-red-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Yay! Happy Valentine's Day! ❤️</h1>
          <p className="text-xl text-gray-600">I knew you'd say yes!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-red-500" />
          
          <div className="mb-8">
            {noCount > 0 ? (
              <HeartCrack className="w-32 h-32 mx-auto text-red-500 animate-pulse" />
            ) : (
              <Heart className="w-32 h-32 mx-auto text-red-500 animate-pulse" />
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Will you be my Valentine?</h1>
          
          <div className="flex flex-col items-center gap-4">
            <button
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-110 transition-all"
              style={{
                fontSize: `${yesButtonSize}px`
              }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full transition-all"
              onClick={handleNoClick}
              style={{
                transform: noCount > 0 
                  ? `translate(${Math.sin(mousePosition.x * 0.05) * 50}px, ${Math.cos(mousePosition.y * 0.05) * 50}px)`
                  : 'none'
              }}
            >
              {phrases[Math.min(noCount, phrases.length - 1)]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;