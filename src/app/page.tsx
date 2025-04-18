"use client";
import './globals.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Frontend Developer", "Problem Solver", "Creative Thinker"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="glitch-effect"></div>
      <div className="hero-content">
        <h1 data-text="Hi, I'm Anass">Hi, I'm Anass</h1>
        <h2>I'm a <span className="dynamic-text"><span className="text-wrapper">{texts[currentTextIndex]}</span></span></h2>
        <p>Crafting clean, responsive, and performant web applications.</p>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </div>
    </section>
  );
}