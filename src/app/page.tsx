"use client";
import './globals.css';
import HeroAnimation from '../../components/TextAnimation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Frontend Developer", "Problem Solver", "Creative Thinker"];
  const phrases = [
    'Hi,',
    "I'm Anass",
    'Front-end developer',
    'Vue.js - React.js',
    'Worked on great things',
    'and Working on cooler things',
    'Make code great again'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <section className="hero">
      <div className="glitch-effect"></div>
      <div className="hero-content">
        <h1 data-text="Hi, I'm Anass">Hi, I'm Anass</h1>
        <h2>I'm a <span className="dynamic-text"><span className="text-wrapper">{texts[currentTextIndex]}</span></span></h2>
        <p>Crafting clean, responsive, and performant web applications.</p>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </div>
      
    </section>
    <div className="hero-animation">
        <HeroAnimation phrases={phrases} />
      </div>
      <div className="hero-background"></div>
      <div className="hero-background-2"></div>
      <div className="hero-background-3"></div>
    </div>
  );
}