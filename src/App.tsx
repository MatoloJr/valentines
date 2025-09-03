import React, { useState, useEffect } from 'react';
import { Heart, HeartCrack, HeartHandshake, Share2, Edit3, ArrowLeft, Copy, Check } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState('setup'); // 'setup', 'valentine', 'success'
  const [valentineName, setValentineName] = useState('');
  const [customMessage, setCustomMessage] = useState('Will you be my Valentine?');
  const [senderName, setSenderName] = useState('');
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

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
    `You're breaking ${senderName ? senderName + "'s" : "my"} heart ;(`
  ];

  const yesButtonSize = Math.min(noCount * 5 + 16, 32);

  useEffect(() => {
    // Check if there's shared data in URL params (simulated)
    const params = new URLSearchParams(window.location.search);
    const sharedValentine = params.get('to');
    const sharedMessage = params.get('message');
    const sharedSender = params.get('from');
    
    if (sharedValentine && sharedMessage && sharedSender) {
      setValentineName(sharedValentine);
      setCustomMessage(decodeURIComponent(sharedMessage));
      setSenderName(sharedSender);
      setCurrentStep('valentine');
    }
  }, []);

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

  const handleCreateValentine = () => {
    if (valentineName.trim() && customMessage.trim()) {
      setCurrentStep('valentine');
    }
  };

  const handleShare = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      to: valentineName,
      message: encodeURIComponent(customMessage),
      from: senderName || 'Someone special'
    });
    const link = `${baseUrl}?${params.toString()}`;
    setShareLink(link);
    setCurrentStep('share');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetApp = () => {
    setCurrentStep('setup');
    setNoCount(0);
    setYesPressed(false);
    setValentineName('');
    setCustomMessage('Will you be my Valentine?');
    setSenderName('');
    setShareLink('');
  };

  // Setup Step
  if (currentStep === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-t-xl" />
          
          <div className="text-center mb-8">
            <Heart className="w-20 h-20 mx-auto text-red-500 animate-pulse mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Valentine</h1>
            <p className="text-gray-600">Personalize your Valentine's message</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valentine's Name *
              </label>
              <input
                type="text"
                value={valentineName}
                onChange={(e) => setValentineName(e.target.value)}
                placeholder="Enter their name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Message *
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write your Valentine's message..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                required
              />
            </div>

            <button
              onClick={handleCreateValentine}
              disabled={!valentineName.trim() || !customMessage.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 px-8 rounded-lg transform hover:scale-105 disabled:hover:scale-100 transition-all"
            >
              Create Valentine 💕
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Share Step
  if (currentStep === 'share') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-t-xl" />
          
          <div className="text-center mb-8">
            <Share2 className="w-20 h-20 mx-auto text-green-500 animate-bounce mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Share Your Valentine!</h1>
            <p className="text-gray-600">Send this link to {valentineName}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Preview:</h3>
              <p className="text-gray-600 text-sm">
                <strong>To:</strong> {valentineName}<br/>
                <strong>Message:</strong> {customMessage}<br/>
                <strong>From:</strong> {senderName || 'Someone special'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetApp}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Create Another
              </button>
              <button
                onClick={() => setCurrentStep('valentine')}
                className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Valentine Step
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Yay! {valentineName} said YES! ❤️
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {senderName ? `${senderName} will be so happy!` : "They'll be so happy!"}
          </p>
          <button
            onClick={resetApp}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-110 transition-all"
          >
            Create Another Valentine
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-red-500" />
          
          <div className="mb-6">
            {noCount > 0 ? (
              <HeartCrack className="w-24 h-24 mx-auto text-red-500 animate-pulse" />
            ) : (
              <Heart className="w-24 h-24 mx-auto text-red-500 animate-pulse" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hey {valentineName}! 💕
          </h2>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{customMessage}</h1>
          {senderName && (
            <p className="text-lg text-gray-600 mb-8">- {senderName}</p>
          )}
          
          <div className="flex flex-col items-center gap-4">
            <button
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-110 transition-all"
              style={{
                fontSize: `${yesButtonSize}px`
              }}
              onClick={() => setYesPressed(true)}
            >
              Yes! 💖
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

          {!window.location.search && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleShare}
                className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1 mx-auto transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share this Valentine
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;