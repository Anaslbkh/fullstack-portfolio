"use client";
import './globals.css';
import HeroAnimation from '../../components/TextAnimation';
import Nav from '../../components/Nav';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Frontend Developer", "Problem Solver", "Creative Thinker","Vibe coder", "Lifelong Learner", "Pixel Perfectionist"];
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
      <Nav />
      <section className="hero">
        <div className="glitch-effect"></div>
        <div className="hero-content">
          <h1 data-text="Hi, I'm Anass">Hi, I'm Anass</h1>
          <h2 className="flex justify-center align-baseline">
            I'm a{" "}
            <span className="dynamic-text pl-2.5">
              <span
                className="text-wrapper transition-all duration-1000 ease-in-out"
              >
                {texts[currentTextIndex]}
              </span>
            </span>
          </h2>
          <p>Crafting clean, responsive, and performant web applications.</p>
          <a href="#contact" className="cta-button">
            Get in Touch
          </a>
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