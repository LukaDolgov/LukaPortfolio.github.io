import React, { useState, useEffect, useRef } from 'react';
import './type_writer.css';

const TypeWriter = ({ text, delayBefore = 1000, speed = 50, onComplete, active }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    // Reset if text changes
    setDisplayedText("");
    setIndex(0);
    hasCompleted.current = false;
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const delay = index === 0 ? delayBefore : speed;
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(index + 1);
      }, delay);
      return () => clearTimeout(timeoutId);
    } else {
      if (onComplete && !hasCompleted.current) {
        hasCompleted.current = true;
        onComplete();
      }
    }
  }, [index, text, delayBefore, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {active && <span className="cursor">|</span>}
    </span>
  );
};

export default TypeWriter;
