import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [visibleWords, setVisibleWords] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const cursorIntervalRef = useRef(null);

  const line1Words = ['Campus', 'Bites:'];
  const line2Words = ['Fast,', 'Fresh', '&', 'Delicious'];
  const fullText = 'Skip the lines and order ahead! Get your favorite campus food delivered or ready for pickup when you arrive.';

  useEffect(() => {
    // Check if animation has already run in this session
    const hasAnimated = sessionStorage.getItem('heroAnimated');
    
    if (hasAnimated === 'true') {
      // Set all states to final values immediately (skip animation)
      const allWords = [
        ...line1Words.map((_, i) => `line1-${i}`),
        ...line2Words.map((_, i) => `line2-${i}`)
      ];
      setVisibleWords(allWords);
      setTypedText(fullText);
      setShowButton(true);
      setShowCursor(false);
      return;
    }

    // Animation hasn't run yet, proceed with animation
    const timeouts = [];
    
    // Animate first line - faster timing
    line1Words.forEach((word, index) => {
      const timeout = setTimeout(() => {
        setVisibleWords(prev => [...prev, `line1-${index}`]);
      }, index * 150);
      timeouts.push(timeout);
    });

    // Animate second line after first line completes - faster gap
    const secondLineTimeout = setTimeout(() => {
      line2Words.forEach((word, index) => {
        const timeout = setTimeout(() => {
          setVisibleWords(prev => [...prev, `line2-${index}`]);
        }, index * 150);
        timeouts.push(timeout);
      });
    }, line1Words.length * 150 + 50);
    timeouts.push(secondLineTimeout);

    // Calculate when h1 animation completes: first line (2 words * 150ms) + gap (50ms) + second line (4 words * 150ms) = 950ms
    const h1AnimationDuration = (line1Words.length * 150) + 50 + (line2Words.length * 150);
    
    // Start typing effect after h1 animation completes with a shorter delay
    const typingStartDelay = h1AnimationDuration + 150;
    
    // Start cursor blinking when typing begins
    const startCursorTimeout = setTimeout(() => {
      setShowCursor(true);
    }, typingStartDelay);
    timeouts.push(startCursorTimeout);
    
    const typingTimeout = setTimeout(() => {
      // Type each character - slightly faster typing
      fullText.split('').forEach((char, index) => {
        const timeout = setTimeout(() => {
          setTypedText(prev => prev + char);
        }, typingStartDelay + (index * 20)); // 25ms per character for typing speed
        timeouts.push(timeout);
      });

      // Hide cursor after typing completes
      const hideCursorTimeout = setTimeout(() => {
        setShowCursor(false);
      }, typingStartDelay + (fullText.length * 25) + 300);
      timeouts.push(hideCursorTimeout);

      // Show button after typing completes
      const showButtonTimeout = setTimeout(() => {
        setShowButton(true);
        // Mark animation as complete
        sessionStorage.setItem('heroAnimated', 'true');
      }, typingStartDelay + (fullText.length * 25) + 300);
      timeouts.push(showButtonTimeout);
    }, typingStartDelay);
    timeouts.push(typingTimeout);

    // Cursor blinking effect (only active while typing)
    const startCursorBlink = setTimeout(() => {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
    }, typingStartDelay);
    timeouts.push(startCursorBlink);

    // Stop cursor blinking after typing completes
    const stopCursorBlink = setTimeout(() => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
        cursorIntervalRef.current = null;
      }
    }, typingStartDelay + (fullText.length * 25) + 300);
    timeouts.push(stopCursorBlink);

    // Cleanup function
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
        cursorIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-orange-50 via-orange-100 to-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
          {/* Left copy */}
          <div>
            <h1 className="font-extrabold tracking-tight text-gray-900 leading-tight">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {line1Words.map((word, index) => (
                  <span
                    key={`line1-${index}`}
                    className={`inline-block mr-2 ${
                      visibleWords.includes(`line1-${index}`)
                        ? 'animate-fade-in-up opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-green-900">
                {line2Words.map((word, index) => (
                  <span
                    key={`line2-${index}`}
                    className={`inline-block mr-2 ${
                      visibleWords.includes(`line2-${index}`)
                        ? 'animate-fade-in-up opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-gray-600">
              {typedText}
              <span className={`inline-block w-0.5 h-4 sm:h-5 bg-gray-600 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </p>
            <div className="mt-6 sm:mt-8">
              <button 
                onClick={() => navigate('/menu')} 
                className={`bg-red-500 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full shadow-md hover:bg-red-600 transition text-sm sm:text-base ${
                  showButton ? 'animate-button-pop-up opacity-100' : 'opacity-0'
                }`}
              >
                Order Now
              </button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mt-8 sm:mt-12 lg:mt-0">
            {/* Bowl image - Full circle with centered image */}
            <div className="relative mx-auto w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden ring-4 sm:ring-6 lg:ring-8 ring-orange-200 shadow-xl">
              <img 
                src="images/Hero.png" 
                alt="Healthy Bowl" 
                className="w-full h-full object-cover object-center" 
              />
            </div>

            {/* 20% Off badge */}
            <div className="absolute top-0 sm:top-2 right-0 sm:right-2 lg:right-0 bg-lime-300 text-gray-800 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 grid place-items-center font-extrabold shadow-md">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl">20%</div>
                <div className="text-xs sm:text-sm">Off</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle wavy divider at bottom of hero (small waves) */}
      <div className="absolute inset-x-0 bottom-0 translate-y-6 pointer-events-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-16" preserveAspectRatio="none">
          {/* Slightly larger multi-crest wave */}
          <path d="M0,40 C120,15 240,65 360,40 C480,15 600,65 720,40 C840,15 960,65 1080,40 C1200,15 1320,65 1440,40 L1440,80 L0,80 Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;